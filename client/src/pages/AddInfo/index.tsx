import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import "./AddInfo.scss";
import {
  TEXT_MAX,
  TEXT_REQUIRED_INPUT,
} from "../../constants/validate-constants.ts";
import { GENDER } from "../../constants/common-constants.ts";

import Input from "../../components/Input/index.tsx";
import Select from "../../components/Select/index.tsx";
import Button from "../../components/Button/index.tsx";

function AddInfo() {
  const schemaForm = Yup.object().shape({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: null,
      bio: "",
      homeTown: "",
      phone: "",
      link: "",
    },
    resolver: yupResolver(schemaForm),
  });

  return (
    <div className="wrapper-add-info">
      <div className="add-info-inner">
        <div className="add-info-content">
          <div className="personal-info">
            <h3 className="section-title">
              Hãy cho chúng tôi thêm thông tin của bạn
            </h3>
            <div className="section-content">
              <div className="section-item-two">
                <Input label="Họ" require />
                <Input label="Tên" require />
              </div>
              <div className="section-item-two">
                <Input label="Ngày sinh" require />
                <Select
                  require
                  label="Giới tính"
                  options={[
                    { label: "Nam", value: 0 },
                    { label: "Nữ", value: 1 },
                  ]}
                />
              </div>
              <Input label="Biệt danh" />
              <Input label="Quê quán" />
              <Input label="Số điện thoại" />
              <Input label="Link Instagram" />
            </div>
            <div className="section-btns">
              <p></p>
              <Button primary onClick={() => {}}>
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddInfo;
