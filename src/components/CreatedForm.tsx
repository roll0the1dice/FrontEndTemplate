import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProColumns,
  ProForm,
  ProFormDateRangePicker,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Form, message, Modal } from "antd";
import { use, useContext, useEffect, useState } from "react";
import { Users } from "../openapi";
import { AuthContext } from "./AuthProvider";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreatedForm = (props: any) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [column, setColumn] = useState<ProColumns<Users>[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useContext(AuthContext);


  const handleSubmit = (record: Users) => {
    console.log('record', record, 'user', user);
    props.handleOk();
  }
  

  return (
    <>
      {contextHolder}
      <Modal title="添加接口" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
        <ProTable type="form" columns={[...props.columns]} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default CreatedForm;
