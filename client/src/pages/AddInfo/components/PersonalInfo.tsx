import React, { memo } from "react";

import "../AddInfo.scss";

import Input from "../../../components/Input/index.tsx";
import Select from "../../../components/Select/index.tsx";
import Button from "../../../components/Button/index.tsx";

function PersonalInfo({ setCurrentInfo }) {
  return (
    <div className="personal-info">
      <h3 className="section-title">Thông tin cá nhân</h3>
      <div className="section-content">
        <div className="section-item-two">
          <Input label="Họ" require />
          <Input label="Tên" require />
        </div>
        <div className="section-item-two">
          <Input label="Ngày sinh" require />
          <Input label="Giới tính" require />
        </div>
        <Input label="Biệt danh" />
        <Input label="Quê quán" />
      </div>
      <div className="section-btns">
        <p></p>
        <Button primary onClick={() => setCurrentInfo("contact")}>
          Lưu
        </Button>
      </div>
    </div>
  );
}

export default memo(PersonalInfo);
