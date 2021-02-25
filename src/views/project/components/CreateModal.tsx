/*
 * @Author: xulijing
 * @Date: 2021-02-24 19:24:21
 * @LastEditTime: 2021-02-24 19:38:55
 * @FilePath: /pherusa/src/views/project/components/CreateModal.tsx
 */
import React, { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';

type Props = {
  visible: boolean;
  close: (isRefresh?: boolean) => void;
};

const CreateModal = (props: Props) => {
  const { visible, close } = props;
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) {
      setName('');
    }
  }, [visible]);

  const cancel = () => {
    close();
    setName('');
    setLoading(false);
  };

  const submit = async () => {
    if (!name) {
      message.error('请输入项目名称');
      return;
    }

    if (name.length > 50) {
      message.error('项目名称最多50个字符');
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
      title="新建项目"
      onCancel={cancel}
      onOk={submit}
      confirmLoading={loading}
    >
      <div className="c-label is-required t-first">项目名称</div>
      <Input
        placeholder="请输入版本名称"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </Modal>
  );
};

export default CreateModal;
