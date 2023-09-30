import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/lib/upload/interface';
import { Button, message, Upload } from 'antd';
import { uploadImageToS3 } from '../Config/S3Con/index';

const onS3Upload = async (file: RcFile) => {
  try {
    const result = await uploadImageToS3(file, file.name);
    message.success(`${file.name} file uploaded successfully`);
  } catch (e) {
    message.error(`${file.name} file upload failed.`);
    console.error(e);
  }
  return false;
};

const props: UploadProps = {
  name: 'file',
  beforeUpload: onS3Upload,
  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const App: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);

export default App;
