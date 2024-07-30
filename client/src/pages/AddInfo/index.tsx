import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";

import "./AddInfo.scss";
import { TEXT_REQUIRED_INPUT } from "../../constants/validate-constants.ts";
import { GENDER } from "../../constants/common-constants.ts";

import Input from "../../components/Input/index.tsx";
import Select from "../../components/Select/index.tsx";
import Button from "../../components/Button/index.tsx";
import DatePicker from "../../components/DatePicker/index.tsx";

function AddInfo() {
  const schemaForm = Yup.object().shape({
    dateOfBirth: Yup.date().required(TEXT_REQUIRED_INPUT("Date of birth")),
    firstName: Yup.string().required(TEXT_REQUIRED_INPUT("First name")),
    lastName: Yup.string().required(TEXT_REQUIRED_INPUT("Last name")),
    gender: Yup.number().required(TEXT_REQUIRED_INPUT("gender")),
    bio: Yup.string(),
    homeTown: Yup.string(),
    phone: Yup.string(),
    link: Yup.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: "",
      link: "",
      phone: "",
      lastName: "",
      homeTown: "",
      firstName: "",
      gender: undefined,
      dateOfBirth: undefined,
    },
    resolver: yupResolver(schemaForm),
  });

  const handleAddInfo = (data) => {
    console.log({ data });
  };

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
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      require
                      label="Họ"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      require
                      label="Tên"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <Controller
                name="bio"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input label="Biệt danh" value={value} onChange={onChange} />
                )}
              />
              <Controller
                name="homeTown"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input label="Quê quán" value={value} onChange={onChange} />
                )}
              />
              <div className="section-item-two">
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      require
                      value={value ? dayjs(value) : null}
                      label="Ngày sinh"
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      require
                      value={value}
                      options={GENDER}
                      label="Giới tính"
                      onChange={onChange}
                      placeholder="-- Choose an options --"
                    />
                  )}
                />
              </div>
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Số điện thoại"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="link"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Link Instagram"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div className="section-btns">
              <p></p>
              <Button primary onClick={handleSubmit(handleAddInfo)}>
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
