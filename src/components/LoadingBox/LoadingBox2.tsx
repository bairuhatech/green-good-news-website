import React from 'react'
import { Skeleton } from "antd";

function LoadingBox() {
  return (
    <div className="loading-box">
    <Skeleton paragraph={{ rows: 14 }} />
  </div>
  )
}

export default LoadingBox