import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Collapse, CollapseProps, Input, Select } from "antd";
import { EditTwoTone } from "@ant-design/icons";

import "./CollapseInput.scss";
import { STATES } from "../../constants/common-constants.ts";

import Modal from "../Modal/index.tsx";
import Button from "../Button/index.tsx";

interface Props extends CollapseProps {
  name: string;
  title: string;
  subTitle: string;
  placeholder: string;
  state?: "public" | "friend" | "private";
}

function CollapseInput(props: Props) {
  const { title, subTitle, name, state, placeholder, ...passProps } = props;

  const { control, handleSubmit } = useForm({
    defaultValues: { [name]: "" },
  });

  const [status, setStatus] = useState(state);
  const [showMore, setShowMore] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleUpdate = (value) => {
    if (!value[name] && status === state) return;
    const data = {
      ...value,
      privacy: { [name]: status },
    };

    console.log({ data });
  };

  return (
    <>
      <Collapse
        activeKey={showMore ? "1" : 9999}
        items={[
          {
            key: "1",
            label: (
              <div className="wrapper-collapse-title">
                <div>
                  <p className="collapse-title">{title}</p>
                  <p className="collapse-subtitle">{subTitle}</p>
                </div>
                <EditTwoTone
                  twoToneColor="#111"
                  onClick={() => setShowMore(!showMore)}
                />
              </div>
            ),
            children: (
              <div className="wrapper-collapse-content">
                <Controller
                  name={name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input.TextArea
                      rows={2}
                      value={value}
                      onChange={onChange}
                      className="collapse-content-input"
                      placeholder={placeholder}
                    />
                  )}
                />

                <div className="collapse-content-actions">
                  {state && (
                    <div className="collapse-content-action-left">
                      <Button onClick={() => setShowRemoveModal(true)} danger>
                        Xóa
                      </Button>
                      <Select
                        style={{ width: 130, height: 36 }}
                        options={STATES}
                        value={status}
                        onChange={setStatus}
                      />
                    </div>
                  )}
                  <div className="collapse-content-action-right">
                    <Button onClick={() => setShowMore(false)}>Hủy</Button>
                    <Button primary onClick={handleSubmit(handleUpdate)}>
                      Lưu
                    </Button>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        expandIcon={() => <></>}
        style={{
          backgroundColor: "#eaeaea",
        }}
        {...passProps}
      />
      {showRemoveModal && (
        <Modal
          open={showRemoveModal}
          title="Bạn chắc chứ"
          onCancel={() => setShowRemoveModal(false)}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          Bạn có chắc chắn muốn gỡ{" "}
          <span style={{ fontWeight: 500 }}>"{subTitle}"</span> khỏi trang cá
          nhân của mình không?
        </Modal>
      )}
    </>
  );
}

export default CollapseInput;
