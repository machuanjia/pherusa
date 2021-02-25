import React, { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import { ChromePicker } from 'react-color'


type Props = {
  visible: boolean;
  close: (isRefresh?: boolean) => void;
};

const CreateModal = (props: Props) => {
  const { visible, close } = props;
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) {
      setName('');
      setColor('#000000');
    }
  }, [visible]);

  const changeColor = (color) => {
    console.log(color)
    setColor(color.hex)
  }

  const cancel = () => {
    close();
    setName('');
    setLoading(false);
  };

  const submit = async () => {
    if (!name) {
      message.error('请输入标签名称');
      return;
    }

    if (name.length > 20) {
      message.error('标签名称最多20个字符');
      return;
    }

    setLoading(true);
    // try {
    //   await req(appHash, name, hash)
    //   message.success(`${isCopy ? '复制' : '创建'}成功`)
    //   close(true)
    //   setName('')
    // } catch (error) {
    //   console.error('createVersion', error)
    // }
    setLoading(false);
  };

  return (
    <Modal
      width={560}
      visible={visible}
      title="新建标签"
      onCancel={cancel}
      onOk={submit}
      confirmLoading={loading}
    >
      <div className="c-label is-required t-first">标签名称</div>
      <Input
        placeholder="请输入标签名称"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div className="c-label is-required">标签颜色</div>
      <ChromePicker onChange={changeColor} color={color}  />
    </Modal>
  );
};

export default CreateModal;
