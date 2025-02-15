import { Button, Descriptions } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { usersControllerApi } from "../services/request";
import { useParams } from "react-router";
import { Users } from "../openapi";
import { AuthContext } from "../components/AuthProvider";

export default function Detail() {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<Users>({} as Users);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await usersControllerApi.one(Number(id));
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
        const res = await usersControllerApi.userLogout();
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
      <Descriptions.Item label="UserName">
        {userDetail.username}
      </Descriptions.Item>
      <Descriptions.Item label="email">{userDetail.email}</Descriptions.Item>
      <Descriptions.Item label="avatar">{userDetail.avatar}</Descriptions.Item>
      <Descriptions.Item label="createdAt">
        {userDetail.createdAt}
      </Descriptions.Item>
      <Descriptions.Item label="updatedAt">
        {userDetail.updatedAt}
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
