import { Button, Descriptions } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../components/AuthProvider";
import { Users } from "../openapi";
import { usersControllerApi } from "../services/request";
import WithAuth from "../components/WithAuth";

const Detail = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<Users>({} as Users);
  const { saTokenInfo } = useContext(AuthContext);


  useEffect(() => {
    (async () => {
      try {
        const _id = parseInt(id as string);
        if (Number.isInteger(_id) && Number(id) === 0) {
          const res = await usersControllerApi.getMyselfInfo();
          const { statusCodeValue, data }: any = res.data;
          console.log(statusCodeValue, data);
          if (statusCodeValue == 200) {
            setUserDetail(data);
            console.log(data);
          }
        } else if (Number.isInteger(_id)) {
          const res = await usersControllerApi.one(Number(_id));
          const { statusCodeValue, data }: any = res.data;
          console.log(statusCodeValue, data);
          if (statusCodeValue == 200) {
            setUserDetail(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="UserAccount">
        {userDetail.username}
      </Descriptions.Item>
      <Descriptions.Item label="avatar">{userDetail.avatar}</Descriptions.Item>
      <Descriptions.Item label="email">{userDetail.email}</Descriptions.Item>
      <Descriptions.Item label="userRole">{userDetail.role}</Descriptions.Item>
      <Descriptions.Item label="createdAt">
        {userDetail.createdAt}
      </Descriptions.Item>
      <Descriptions.Item label="updatedAt">
        {userDetail.updatedAt}
      </Descriptions.Item>
      {/* {Number(id) === Number(user.id) && (
        <Descriptions.Item label="logout">
          <Button type="primary" onClick={handleClick}>
            logout
          </Button>
        </Descriptions.Item>
      )} */}
    </Descriptions>
  );
}


const DetailWithAuth = WithAuth(Detail);

export default DetailWithAuth;