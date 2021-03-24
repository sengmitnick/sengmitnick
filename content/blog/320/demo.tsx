/**
 * title: useMemo 的错误使用示例
 * desc: 在 Container 容器针对渲染 Header 用了 useMemo 来优化性能，只有在 visible 发生改变才会重新渲染，而在 renderHeader 中有依赖外部变量时就会产生Bug。具体操作： 点击 `打开 drawer` 按钮，在抽屉的输入框输入值，会发现容器外值发生变化而 renderHeader 内的不变，点击里面的按钮触发事件得到的value也是不变的。
 */

import React from 'react';
import { useState, useMemo } from 'react';
import { Input, Drawer, Button, PageHeader, message } from 'antd';

import './demo.less';

const Container: React.FC<{
  extra?: React.ReactNode;
  onClick?: () => void;
}> = ({ extra, children, onClick }) => {
  const [visible, setVisible] = useState(false);

  const renderHeader = useMemo(() => {
    return (
      <PageHeader
        ghost={false}
        title="示例"
        extra={<Button onClick={onClick}>按钮</Button>}
      >
        {children}
      </PageHeader>
    );
  }, [visible]);

  return (
    <div className="site-drawer-render-in-current-wrapper">
      Render in this
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={() => setVisible(true)}>
          打开 drawer
        </Button>
      </div>
      {extra}
      <Drawer
        title="示例"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        {renderHeader}
      </Drawer>
    </div>
  );
};

export default () => {
  const [value, setValue] = useState<string>();
  const onClick = () => {
    message.info(`点击 Operation 时的输入值: ${value}`);
  };
  return (
    <Container onClick={onClick} extra={<>当前输入值: {value}</>}>
      <Input value={value} onChange={e => setValue(e.target.value)}></Input>
      <br />
      当前输入值: {value}
    </Container>
  );
};
