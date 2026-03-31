import { Alert } from 'antd';

export default function OperationLogPage(): JSX.Element {
  return (
    <div className="page-card">
      <Alert
        type="info"
        showIcon
        message="操作日志"
        description="页面已接入路由。后续可继续对接后端日志查询接口。"
      />
    </div>
  );
}
