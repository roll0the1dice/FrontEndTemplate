import { Avatar, Card, List, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { chartControllerApi } from "../services/request";
import {
  ApiResponseCustomPageImplChart,
  ApiResponseCustomPageImplQueryChartVO,
  Chart,
  QueryChartVO,
} from "../openapi";
import Search from "antd/es/input/Search";
import { AuthContext } from "../components/AuthProvider";


type searchParamsType = {
  current: number;
  pageSize: number;
}

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    pageSize: 4,
    current: 0,
  };
  const [loading, setLoading] = useState(true);
  const [chartList, setChartList] = useState<Array<QueryChartVO>>();
  const [total, setTotal] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<searchParamsType>(initSearchParams);
  const { user } = useContext(AuthContext);

  const loadData = async () => {
    try {
      const res = await chartControllerApi.listChart();
      const { statusCodeValue, data }: ApiResponseCustomPageImplQueryChartVO =
        res.data;
      console.log(statusCodeValue, data);
      if (statusCodeValue == 200) {
        console.log(data);
        setChartList(data?.content);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="my-chart-page">
      {/* 引入搜索框 */}
      <div>
        {/* 
          当用户点击搜索按钮触发 一定要把新设置的搜索条件初始化，要把页面切回到第一页;
          如果用户在第二页,输入了一个新的搜索关键词,应该重新展示第一页,而不是还在搜第二页的内容
        */}
        <Search
          placeholder="请输入图表名称"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            console.log(value);
          }}
        />
      </div>
      <List
        /*
          栅格间隔16像素;xs屏幕<576px,栅格数1;
          sm屏幕≥576px，栅格数1;md屏幕≥768px,栅格数1;
          lg屏幕≥992px,栅格数2;xl屏幕≥1200px,栅格数2;
          xxl屏幕≥1600px,栅格数2
        */
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          /*
            page第几页，pageSize每页显示多少条;
            当用户点击这个分页组件,切换分页时,这个组件就会去触发onChange方法,会改变咱们现在这个页面的搜索条件
          */
          onChange: (page, pageSize) => {
            // 当切换分页，在当前搜索条件的基础上，把页数调整为当前的页数
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          // 显示当前页数
          current: searchParams?.current,
          // 页面参数改成自己的
          pageSize: searchParams?.pageSize,
          // 总数设置成自己的
          total: chartList?.length,
        }}
        // 设置成我们的加载状态
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            {/* 用卡片包裹 */}
            <Card style={{ width: "100%" }}>
              <List.Item.Meta
                // 把当前登录用户信息的头像展示出来
                avatar={<Avatar src={user && user.userAvatar} />}
                title={item.name}
                description={
                  item.chartType ? "图表类型：" + item.chartType : undefined
                }
              />
              {/* 在元素的下方增加16像素的外边距 */}
              <div style={{ marginBottom: 16 }} />
              <p>{"分析目标：" + item.goal}</p>
              {/* 在元素的下方增加16像素的外边距 */}
              <div style={{ marginBottom: 16 }} />
              <ReactECharts
                option={item.genChart && JSON.parse(item.genChart)}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default MyChartPage;
