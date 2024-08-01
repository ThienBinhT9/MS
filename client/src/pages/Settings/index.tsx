import React from "react";

import "./Setting.scss";

import Select from "../../components/Select/index.tsx";
import Button from "../../components/Button/index.tsx";
// import Collapse from "../../components/Collapse/index.tsx";
import SectionWrapper from "../../components/SectionWrapper/index.tsx";

const options = [
  { label: "English", value: 0 },
  { label: "Vietnamese", value: 1 },
];

const options2 = [
  { label: "Riêng tư", value: 0 },
  { label: "Công khai", value: 1 },
];

const options3 = [
  { label: "Sáng", value: 0 },
  { label: "Tối", value: 1 },
];

function Setting() {
  return (
    <div className="wrapper-setting">
      <div className="setting-inner">
        <SectionWrapper
          title="Setting"
          headerRight={<Button primary>Lưu</Button>}
        >
          <div className="setting-form">
            <Select label="Ngôn ngữ" options={options} />
            <div className="setting-section">
              <Select label="Chế độ bạn bè" options={options2} />
            </div>
            <div className="setting-section">
              <Select label="Chế độ" options={options3} />
            </div>
            <div className="setting-section">
              <p className="setting-title">Mật khẩu</p>
              <Button className="form-item">Đổi mật khẩu</Button>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}

export default Setting;
