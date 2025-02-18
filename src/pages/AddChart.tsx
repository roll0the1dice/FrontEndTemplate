import { Button, Card, Col, Divider, Form, Input, message, Row, Select, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { chartControllerApi } from "../services/request";
import ReactECharts from "echarts-for-react";

function splitText(text: string) {
  // 找到第一个 "{" 的位置和最后一个 "}" 的位置
  const startIndex = text.indexOf("{");
  const endIndex = text.lastIndexOf("}");

  if (startIndex === -1 || endIndex === -1) {
    return { jsObject: null, analysis: text }; // 没有找到JS对象，返回null和整个文本作为分析
  }

  // 提取JS对象字符串
  const jsObjectString = text.substring(startIndex, endIndex + 1);

  //console.log('jsObjectString', JSON.parse(jsObjectString));

  const str = jsObjectString
    .replace(/\s/g, "")
    .replace(/([a-zA-Z]+):/g, '"$1":')
    .replace(/'/g, '"');

  console.log('str', str);

  // 尝试将字符串解析为JS对象
  let jsObject = null;
  try {
    jsObject = JSON.parse(str);
    
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return { jsObject: null, analysis: text }; // 解析失败，返回null和整个文本作为分析
  }

  // 提取分析文本
  const analysis = text.substring(text.lastIndexOf("【") + 1).trim(); // 去除空格

  return { options: jsObject, analysis: analysis };
}

export default function AddChart() {
  const [type, setType] = useState<string>("account");
  const [analysisData, setAnalysisData] = useState<string>();
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {});

  const onFinish = (values: any) => {
    (async () => {
      try {
        console.log('chartType', values.selchartTypeect);
        const res = await chartControllerApi.genChartByAiWithAsyncMq(
          values.name,
          values.goal,
          values.multipartFile,
          values.selchartTypeect
        );
        const { statusCodeValue, data }: any = res.data;
        console.log(statusCodeValue, data);
        if (statusCodeValue == 200) {
          // console.log(data);
          const {genChart, genResult} = data;
          //const htmlText = data.replace(/\n/g, '<br />');
          // const { options, analysis }: any = splitText(
          //   JSON.parse(data).choices[0].message.content
          // );
          // setOptions(genChart);
          // setAnalysisData(genResult);
          // console.log(JSON.parse(genChart));
          setOptions(JSON.parse(genChart));
          setAnalysisData(genResult);
          setLoading(false);
          messageApi.info("图表正在为您生成中，请到个人图表页面查看");
          //console.log(genResult);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleReset = () => {
    setOptions(null);
    setAnalysisData("");
  };

  return (
    <>
    {contextHolder}
    <div id="AddChart">
      <Row gutter={24}>
        <Col span={12}>
          <Form
            // 表单名称改为addChart
            name="addChart"
            onFinish={onFinish}
            // 初始化数据啥都不填，为空
            initialValues={{}}
          >
            {/* 前端表单的name，对应后端接口请求参数里的字段，
  此处name对应后端分析目标goal,label是左侧的提示文本，
  rules=....是必填项提示*/}
            <Form.Item
              name="goal"
              label="分析目标"
              rules={[{ required: true, message: "请输入分析目标!" }]}
            >
              {/* placeholder文本框内的提示语 */}
              <TextArea placeholder="请输入你的分析需求，比如：分析网站用户的增长情况" />
            </Form.Item>

            {/* 还要输入图表名称 */}
            <Form.Item name="name" label="图表名称">
              <Input placeholder="请输入图表名称" />
            </Form.Item>

            {/* 图表类型是非必填，所以不做校验 */}
            <Form.Item name="selchartTypeect" label="图表类型">
              <Select
                options={[
                  { value: "折线图", label: "折线图" },
                  { value: "柱状图", label: "柱状图" },
                  { value: "堆叠图", label: "堆叠图" },
                  { value: "饼图", label: "饼图" },
                  //{ value: "雷达图", label: "雷达图" },
                ]}
              />
            </Form.Item>

            {/* 文件上传 */}
            <Form.Item name="file" label="原始数据">
              {/* action:当你把文件上传之后，他会把文件上传至哪个接口。
      这里肯定是调用自己的后端，先不用这个 */}
              <Upload name="file">
                <Button icon={<UploadOutlined />}>上传 CSV 文件</Button>
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  智能分析
                </Button>
                <Button htmlType="reset" onClick={handleReset}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Card title="分析结论">
            <div style={{ whiteSpace: "pre-line" }}>
               {analysisData}
            </div>
          </Card>
          <Divider />
          <Card title="可视化图表">
            <div>{options && <ReactECharts option={options} />}</div>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
}
