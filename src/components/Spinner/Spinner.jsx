import { Spin } from 'antd';

export default function Spinner({ size, spinning }) {
  return (
    <Spin
      size={size}
      spinning={spinning}
      style={{
        margin: 'auto',
        alignContent: 'center',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
