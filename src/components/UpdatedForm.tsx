import { PlusOutlined } from "@ant-design/icons";
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProForm,
  ProFormDateRangePicker,
  ProFormGroup,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Form, message, Modal } from "antd";
import { use, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { BiUser } from "../openapi";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const UpdatedForm = (props: any) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [column, setColumn] = useState<ProColumns<BiUser>[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const formRef = useRef<ProFormInstance>({} as ProFormInstance);
  const { user } = useContext(AuthContext);

  //console.log('props', props);

  useEffect(() => {
    
    if (Object.keys(formRef.current).length > 0) {
        formRef.current?.setFieldsValue(props.record);
    }
    //setColumn({...props.columns})
  }, [props.record]);

  const handleSubmit = (record: BiUser) => {
    console.log('record', record, 'user', user);
    props.handleOk();
  }

  return (
    <>
      {contextHolder}
      <Modal title="添加接口" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
        <ProTable rowKey="key" formRef={formRef} type="form" columns={[...props.columns]} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default UpdatedForm;
