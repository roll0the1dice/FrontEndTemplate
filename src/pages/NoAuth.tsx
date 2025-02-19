import { Empty, message } from "antd";

export default function NoAuth() {
  const [messageApi, contextHolder] = message.useMessage();
  return <>
  {contextHolder}
    <Empty description={"无权限"} />;
  </>;
}