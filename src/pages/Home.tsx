import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Space, Tag } from "antd";
import { useRef, useState } from "react";
import { Link } from "react-router";
import UpdatedForm from "../components/UpdatedForm";
import CreatedForm from "../components/CreatedForm";
import { BiUser } from "../openapi";
import { biUserControllerApi } from "../services/request";
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const Home = () => {
  const actionRef = useRef<ActionType>(null);
  const [isCreatedModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdatedModalOpen, setIsUpdatedModalOpen] = useState(false);
  const [record, setRecord] = useState<BiUser>({} as BiUser);
  const [rows, setRows] = useState<BiUser[]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const PageSize = 5;

  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalOk = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalOpen(false);
  };

  const showUpdatedModal = (record: BiUser) => {
    setIsUpdatedModalOpen(true);
    setRecord(record);
  };

  const handleUpdateModalOk = () => {
    setIsUpdatedModalOpen(false);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdatedModalOpen(false);
  };

  const columns: ProColumns<BiUser>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "用户账号",
      dataIndex: "userAccount",
      copyable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "用户名",
      dataIndex: "userName",
      copyable: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      valueType: "date",
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record, index, action) => {
        return [
          <a onClick={() => showUpdatedModal(record)}>编辑</a>,
          <Link to={`/detail/${record.id}`}>查看</Link>,
          <a>删除</a>,
        ];
      },
    },
  ];

  return (
    <ProTable<BiUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        //console.log(sort, filter);
        let res = await biUserControllerApi.all1();
        const { statusCodeValue, data }: any = res.data;
        if (statusCodeValue === 200) {
          //console.log("data", data.content);
          setRows([...data.content]);
          return Promise.resolve({
            data: [...data.content],
            success: true,
          });
        }
        //console.log(statusCodeValue, data);
        //console.log("[]", data.content);
        return Promise.resolve({
          data: [],
          success: true,
        });
      }}
      editable={{
        type: "multiple",
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage",
        defaultValue: {
          option: { fixed: "right", disable: true },
        },
        onChange(value) {
          console.log("value: ", value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              createdAt: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => {
          console.log(page);
          setPageNum(page);
        },
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button type="primary" onClick={showCreateModal}>
          <PlusOutlined />
        </Button>,
        <CreatedForm
          columns={columns}
          isModalOpen={isCreatedModalOpen}
          handleOk={handleCreateModalOk}
          handleCancel={handleCreateModalCancel}
        />,
        <UpdatedForm
          isModalOpen={isUpdatedModalOpen}
          columns={columns}
          record={record}
          handleOk={handleUpdateModalOk}
          handleCancel={handleUpdateModalCancel}
        />,
      ]}
    />
  );
};

export default Home;
