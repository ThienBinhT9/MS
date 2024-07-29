import React, { memo } from "react";

import "../AddInfo.scss";

import Input from "../../../components/Input/index.tsx";
import Select from "../../../components/Select/index.tsx";
import Button from "../../../components/Button/index.tsx";

function Hobbies({ setCurrentInfo }) {
  return (
    <div className="hobbies-info">
      <h3 className="section-title">Sở thích & Hoạt động</h3>
      <div className="section-content">
        <Input label="Sở thích" />
        <Input label="Hoạt động" />
      </div>
      <div className="section-btns">
        <Button text onClick={() => setCurrentInfo("contact")}>
          Quay lại
        </Button>
        <div style={{ display: "flex", gap: 12 }}>
          <Button text>Bỏ qua</Button>
          <Button primary>Lưu</Button>
        </div>
      </div>
    </div>
  );
}

export default memo(Hobbies);
