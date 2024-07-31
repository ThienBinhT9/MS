import React from "react";

import "./Setting.scss";

import Select from "../../components/Select/index.tsx";
import Button from "../../components/Button/index.tsx";
import Collapse from "../../components/Collapse/index.tsx";

const options = [
  { label: "English", value: 0 },
  { label: "Việt Nam", value: 1 },
];

const options2 = [
  { label: "Công khai", value: 0 },
  { label: "Riêng tư", value: 1 },
];

function Setting() {
  return (
    <div className="wrapper-setting">
      <div className="setting-inner">
        <div className="setting-content">
          <div className="setting-form">
            <Collapse
              title="Bạn bè"
              subTitle="Chỉnh sửa chế độ hiển thị"
              select
            />
            <Button className="form-item">Đổi mật khẩu</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
