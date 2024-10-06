import { Spin } from 'antd';

export default function Spinner() {
  return (
    <Spin
      size='large'
      style={{
        margin: 'auto',
        alignContent: 'center',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
