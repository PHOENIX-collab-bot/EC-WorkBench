import { useEffect, useMemo, useState } from 'react';
import { Avatar, Button, Card, Col, Empty, FloatButton, Input, Modal, Row, Space, Spin, Statistic, Table, Tag, Tooltip, Typography } from 'antd';
import {
  ArrowUpOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  AppstoreOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
  RobotOutlined,
  SendOutlined,
  UserOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { getDashboardMetricsApi } from '@/api/dashboard';
import { askAiAssistantApi } from '@/api/assistant';
import type { DashboardMetrics } from '@/types/dashboard';

const { Text } = Typography;

const defaultMetrics: DashboardMetrics = {
  orderToday: 0,
  salesToday: 0,
  productOnSale: 0,
  stockWarnCount: 0
};

// 模拟库存预警详情数据
interface StockWarnItem {
  id: number;
  productName: string;
  stock: number;
  minStock: number;
}
const mockStockWarnList: StockWarnItem[] = [
  { id: 1, productName: 'iPhone 15 Pro', stock: 5, minStock: 10 },
  { id: 2, productName: 'MacBook Air M3', stock: 3, minStock: 8 },
  { id: 3, productName: 'AirPods Pro 2', stock: 8, minStock: 15 },
];

interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function DashboardPage(): JSX.Element {
  const [metrics, setMetrics] = useState<DashboardMetrics>(defaultMetrics);
  const [showStockDetail, setShowStockDetail] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantQuestion, setAssistantQuestion] = useState('');
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([]);

  const metricCardStyle = {
    height: 120,
    border: '1px solid #dadce0',
    borderRadius: 12,
    boxShadow: '0 1px 2px rgba(60,64,67,.15)'
  } as const;

  const metricBodyStyle = {
    padding: '16px 20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  } as const;

  const trendTagColStyle = {
    alignSelf: 'flex-start',
    paddingTop: 2
  } as const;

  const trendTagStyle = {
    marginInlineEnd: 0,
    whiteSpace: 'nowrap'
  } as const;

  useEffect(() => {
    getDashboardMetricsApi().then(setMetrics).catch(() => setMetrics(defaultMetrics));
  }, []);

  useEffect(() => {
    const contentEl = document.querySelector('.ant-layout-content') as HTMLElement | null;
    if (!contentEl) return;

    const previousOverflow = contentEl.style.overflow;
    const previousTouchAction = contentEl.style.touchAction;

    if (assistantOpen) {
      contentEl.style.overflow = 'hidden';
      contentEl.style.touchAction = 'none';
    }

    return () => {
      contentEl.style.overflow = previousOverflow;
      contentEl.style.touchAction = previousTouchAction;
    };
  }, [assistantOpen]);

  // 柱状图：核心指标对比
  const barOption = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any[]) => {
        const item = params[0];
        return `${item.name}<br/>${item.marker} ${item.seriesName}: ${item.value.toLocaleString()}`;
      }
    },
    legend: { data: ['今日数据'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['订单数', '销售额(万)', '在售商品', '库存预警'],
      axisLabel: { color: '#595959' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#595959' },
      splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [{
      name: '今日数据',
      type: 'bar',
      data: [metrics.orderToday, metrics.salesToday / 10000, metrics.productOnSale, metrics.stockWarnCount],
      itemStyle: {
        color: (params: any) => {
          const colors = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335'];
          return colors[params.dataIndex];
        },
        borderRadius: [4, 4, 0, 0]
      },
      barWidth: '50%',
      animationDuration: 1000,
      animationEasing: 'cubicOut'
    }]
  }), [metrics]);

  // 饼图：商品状态占比
  const pieOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: { orient: 'vertical', right: '10%', top: 'center', itemWidth: 14, itemHeight: 14 },
      series: [{
        name: '商品状态',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' }
        },
        data: [
          { value: metrics.productOnSale, name: '在售商品', itemStyle: { color: '#52c41a' } },
          { value: metrics.stockWarnCount, name: '库存预警', itemStyle: { color: '#ff4d4f' } }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut'
      }]
    };
  }, [metrics]);

  // 仪表盘：销售目标进度
  const gaugeOption = useMemo(() => ({
    series: [{
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      splitNumber: 5,
      radius: '80%',
      center: ['50%', '55%'],
      progress: {
        show: true,
        width: 12,
        itemStyle: { color: '#1890ff' }
      },
      axisLine: { lineStyle: { width: 12, color: [[1, '#f0f0f0']] } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { show: false },
      anchor: { show: false },
      title: { show: false },
      detail: {
        valueAnimation: true,
        fontSize: 20,
        offsetCenter: [0, '0%'],
        formatter: '{value}%',
        color: '#1890ff'
      },
      data: [{ value: Math.min((metrics.salesToday / 100000) * 100, 100) }]
    }]
  }), [metrics]);

  // 库存预警列表的列定义
  const stockColumns = [
    { title: '商品名称', dataIndex: 'productName', key: 'productName' },
    {
      title: '当前库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => <Tag color="red">{stock}</Tag>
    },
    {
      title: '最低库存',
      dataIndex: 'minStock',
      key: 'minStock',
      render: (minStock: number) => <Text type="secondary">{minStock}</Text>
    },
    {
      title: '缺口',
      key: 'gap',
      render: (_: any, record: StockWarnItem) => (
        <Text type="danger">-{record.minStock - record.stock}</Text>
      )
    }
  ];

  const isEmpty = Object.values(metrics).every((v) => v === 0);

  const askAssistant = async (questionParam?: string): Promise<void> => {
    const question = (questionParam ?? assistantQuestion).trim();
    if (!question || assistantLoading) return;

    setAssistantMessages((prev) => [...prev, { role: 'user', content: question }]);
    setAssistantQuestion('');
    setAssistantLoading(true);
    try {
      const answer = await askAiAssistantApi({
        question,
        dashboard: metrics
      });
      setAssistantMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    } catch {
      setAssistantMessages((prev) => [...prev, { role: 'assistant', content: 'AI助手暂时不可用，请稍后重试。' }]);
    } finally {
      setAssistantLoading(false);
    }
  };

  const openAssistant = (): void => {
    setAssistantOpen(true);
    if (assistantMessages.length === 0) {
      void askAssistant('请基于当前仪表盘数据，给出问题诊断、改进方向、风险提醒和可执行建议。');
    }
  };

  if (isEmpty) {
    return (
      <div className="page-card">
        <Card><Empty description="暂无数据" /></Card>
      </div>
    );
  }

  return (
    <div className="page-card">
      {/* 顶部核心指标卡片 - 固定高度确保一致 */}
      <Row gutter={16} style={{ marginBottom: 16 }} align="stretch">
        {/* 今日订单 */}
        <Col span={6}>
          <Card
            hoverable
            style={metricCardStyle}
            styles={{ body: metricBodyStyle }}
          >
            <Row align="middle" gutter={16}>
              <Col>
                <ShoppingCartOutlined style={{ fontSize: 24, color: '#1a73e8' }} />
              </Col>
              <Col flex="auto">
                <Text type="secondary" style={{ fontSize: 13 }}>今日订单</Text>
                <Statistic
                  value={metrics.orderToday}
                  valueStyle={{ color: '#202124', fontSize: 28, fontWeight: 600, lineHeight: 1.2 }}
                  suffix="单"
                />
              </Col>
              <Col style={trendTagColStyle}>
                <Tooltip title="较昨日上涨">
                  <Tag icon={<ArrowUpOutlined />} color="success" style={trendTagStyle}>+12%</Tag>
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 今日销售额 */}
        <Col span={6}>
          <Card
            hoverable
            style={metricCardStyle}
            styles={{ body: metricBodyStyle }}
          >
            <Row align="middle" gutter={16}>
              <Col>
                <DollarOutlined style={{ fontSize: 24, color: '#1a73e8' }} />
              </Col>
              <Col flex="auto">
                <Text type="secondary" style={{ fontSize: 13 }}>今日销售额</Text>
                <Statistic
                  value={metrics.salesToday}
                  precision={2}
                  valueStyle={{ color: '#202124', fontSize: 28, fontWeight: 600, lineHeight: 1.2 }}
                  prefix="¥"
                />
              </Col>
              <Col style={trendTagColStyle}>
                <Tooltip title="较昨日上涨">
                  <Tag icon={<ArrowUpOutlined />} color="success" style={trendTagStyle}>+8%</Tag>
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 在售商品 */}
        <Col span={6}>
          <Card
            hoverable
            style={metricCardStyle}
            styles={{ body: metricBodyStyle }}
          >
            <Row align="middle" gutter={16}>
              <Col>
                <AppstoreOutlined style={{ fontSize: 24, color: '#1a73e8' }} />
              </Col>
              <Col flex="auto">
                <Text type="secondary" style={{ fontSize: 13 }}>在售商品</Text>
                <Statistic
                  value={metrics.productOnSale}
                  valueStyle={{ color: '#202124', fontSize: 28, fontWeight: 600, lineHeight: 1.2 }}
                  suffix="件"
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 库存预警 */}
        <Col span={6}>
          <Card
            hoverable
            style={{
              ...metricCardStyle,
              borderColor: metrics.stockWarnCount > 0 ? '#f28b82' : '#dadce0',
              cursor: metrics.stockWarnCount > 0 ? 'pointer' : 'default'
            }}
            styles={{ body: metricBodyStyle }}
            onClick={() => metrics.stockWarnCount > 0 && setShowStockDetail(!showStockDetail)}
          >
            <Row align="middle" gutter={16}>
              <Col>
                {metrics.stockWarnCount > 0
                  ? <WarningOutlined style={{ fontSize: 24, color: '#d93025' }} />
                  : <ExclamationCircleOutlined style={{ fontSize: 24, color: '#1a73e8' }} />}
              </Col>
              <Col flex="auto">
                <Text type="secondary" style={{ fontSize: 13 }}>库存预警</Text>
                <Statistic
                  value={metrics.stockWarnCount}
                  valueStyle={{ color: '#202124', fontSize: 28, fontWeight: 600, lineHeight: 1.2 }}
                  suffix="件"
                />
              </Col>
              {metrics.stockWarnCount > 0 && (
                <Col>
                  <Tag color="error">{showStockDetail ? '收起' : '详情'}</Tag>
                </Col>
              )}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 第二行：库存预警详情（可展开） */}
      {showStockDetail && metrics.stockWarnCount > 0 && (
        <Card
          title={<><WarningOutlined style={{ color: '#ff4d4f' }} /> 库存预警详情</>}
          style={{ marginBottom: 16 }}
          extra={<a onClick={() => setShowStockDetail(false)}>收起</a>}
        >
          <Table
            columns={stockColumns}
            dataSource={mockStockWarnList}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </Card>
      )}

      {/* 第三行：图表区域 */}
      <Row gutter={16}>
        {/* 左侧：柱状图 - 核心指标对比 */}
        <Col span={14}>
          <Card
            title="运营概览"
            extra={<Text type="secondary">数据更新时间: {new Date().toLocaleTimeString()}</Text>}
            hoverable
          >
            <ReactECharts option={barOption} style={{ height: 320 }} />
          </Card>
        </Col>

        {/* 右侧：饼图 + 仪表盘 */}
        <Col span={10}>
          <Row gutter={[16, 16]}>
            {/* 商品状态饼图 */}
            <Col span={24}>
              <Card title="商品状态分布" hoverable>
                <ReactECharts option={pieOption} style={{ height: 180 }} />
              </Card>
            </Col>

            {/* 销售目标进度仪表盘 */}
            <Col span={24}>
              <Card title="销售目标进度" hoverable>
                <ReactECharts option={gaugeOption} style={{ height: 180 }} />
                <div style={{ textAlign: 'center', marginTop: -30 }}>
                  <Text type="secondary">日目标: ¥100,000</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <FloatButton
        icon={<RobotOutlined />}
        type="primary"
        shape="circle"
        tooltip={<div>AI数据报表解读</div>}
        style={{ right: 28, bottom: 28 }}
        onClick={openAssistant}
      />

      <Modal
        title="AI数据报表解读"
        open={assistantOpen}
        onCancel={() => setAssistantOpen(false)}
        destroyOnClose
        footer={null}
        width={720}
        className="ai-assistant-modal"
        styles={{ body: { maxHeight: 'calc(100vh - 220px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12 } }}
        maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(15, 23, 42, 0.24)' }}
      >
        <Space wrap style={{ marginBottom: 12 }}>
          <Button size="small" onClick={() => void askAssistant('请分析当前仪表盘有哪些问题，并按优先级排序给出改进建议。')}>分析问题</Button>
          <Button size="small" onClick={() => void askAssistant('请给出库存风险提醒和具体处理动作。')}>库存提醒</Button>
          <Button size="small" onClick={() => void askAssistant('请给商家一份今日运营待办清单（3-5条）。')}>运营待办</Button>
        </Space>

        <div className="ai-assistant-scroll" style={{ maxHeight: 420, overflow: 'auto', padding: '4px 2px 8px' }}>
          {assistantMessages.length === 0 && !assistantLoading ? (
            <Empty description="可提问：报表解读、运营优化、库存预警、转化提升等" />
          ) : (
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              {assistantMessages.map((msg, idx) => (
                <div key={`${msg.role}-${idx}`} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '88%', display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                    <Avatar size={28} icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />} />
                    <div style={{ background: msg.role === 'user' ? '#e8f0fe' : '#f6f8fa', border: '1px solid #dfe3e8', borderRadius: 10, padding: '8px 10px', whiteSpace: 'pre-wrap', lineHeight: 1.6, overflowWrap: 'anywhere' }}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {assistantLoading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280' }}>
                  <Spin size="small" /> AI正在分析中...
                </div>
              )}
            </Space>
          )}
        </div>

        <Input.TextArea
          value={assistantQuestion}
          onChange={(e) => setAssistantQuestion(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 4 }}
          maxLength={280}
          placeholder="输入电商相关问题，例如：为何库存预警偏高？如何提升今日转化？"
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              void askAssistant();
            }
          }}
        />
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text type="secondary">仅电商问题会获得详细回答，非电商问题将简短回复。</Text>
          <Button type="primary" icon={<SendOutlined />} loading={assistantLoading} onClick={() => void askAssistant()}>
            发送
          </Button>
        </div>
      </Modal>
    </div>
  );
}
