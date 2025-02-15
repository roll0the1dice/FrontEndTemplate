import { Button, Descriptions } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../components/AuthProvider";
import { BiUser } from "../openapi";
import { biUserControllerApi } from "../services/request";

export default function Detail() {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<BiUser>({} as BiUser);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await biUserControllerApi.one1(Number(id));
        const { statusCodeValue, data }: any = res.data;
        console.log(statusCodeValue, data);
        if (statusCodeValue == 200) {
          setUserDetail(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleClick = () => {
    (async () => {
      try {
        const res = await biUserControllerApi.userLogout();
        const { statusCodeValue, data }: any = res.data;
        console.log(statusCodeValue, data);
        if (statusCodeValue == 200) {
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="UserAccount">
        {userDetail.userAccount}
      </Descriptions.Item>
      <Descriptions.Item label="userName">{userDetail.userName}</Descriptions.Item>
      <Descriptions.Item label="userRole">{userDetail.userRole}</Descriptions.Item>
      <Descriptions.Item label="createdAt">
        {userDetail.createTime}
      </Descriptions.Item>
      <Descriptions.Item label="updatedAt">
        {userDetail.updateTime}
      </Descriptions.Item>
      {Number(id) === Number(user.id) && (
        <Descriptions.Item label="logout">
          <Button type="primary" onClick={handleClick}>
            logout
          </Button>
        </Descriptions.Item>
      )}
    </Descriptions>
  );
}
