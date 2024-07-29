import React, { memo } from "react";

import "../AddInfo.scss";

import Input from "../../../components/Input/index.tsx";
import Select from "../../../components/Select/index.tsx";
import Button from "../../../components/Button/index.tsx";

function ContactInfo({ setCurrentInfo }) {
  return (
    <div className="contact-info">
      <h3 className="section-title">Thông tin liên hệ</h3>
      <div className="section-content">
        <Input label="Số điện thoại" />
        <Input label="Link Instagram" />
      </div>
      <div className="section-btns">
        <Button text onClick={() => setCurrentInfo("personal")}>
          Quay lại
        </Button>
        <div style={{ display: "flex", gap: 12 }}>
          <Button text onClick={() => setCurrentInfo("hobbies")}>
            Bỏ qua
          </Button>
          <Button primary onClick={() => setCurrentInfo("hobbies")}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(ContactInfo);
