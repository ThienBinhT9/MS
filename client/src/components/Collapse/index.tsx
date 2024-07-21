import React, { useState } from "react";
import {
  Collapse,
  CollapseProps,
  Dropdown,
  Input,
  MenuProps,
  Select,
} from "antd";
import { GlobalOutlined, EditTwoTone, LockOutlined } from "@ant-design/icons";

import "./Collapse.scss";

import Modal from "../Modal/index.tsx";
import Button from "../Button/index.tsx";

interface Props extends CollapseProps {
  title: string;
  subTitle: string;
  placeholder?: string;
  select?: boolean;
}

function CollapseCustom(props: Props) {
  const { title, subTitle, placeholder, select, ...passProps } = props;

  const [showMore, setShowMore] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Công khai",
      icon: <GlobalOutlined />,
    },
    {
      key: "2",
      label: "Riêng tư",
      icon: <LockOutlined />,
    },
  ];

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
                {select ? (
                  <Select
                    className="collapse-content-input"
                    mode="multiple"
                    labelInValue
                    filterOption={false}
                    {...props}
                    suffixIcon={false}
                    options={[]}
                  />
                ) : (
                  <Input.TextArea
                    rows={2}
                    placeholder={placeholder}
                    className="collapse-content-input"
                  />
                )}
                <div className="collapse-content-actions">
                  <div className="collapse-content-action-left">
                    <Button
                      onClick={() => setShowRemoveModal(true)}
                      type="primary"
                      danger
                    >
                      Xóa
                    </Button>
                    <Dropdown menu={{ items }} placement="bottomLeft">
                      <Button icon={<GlobalOutlined />} text>
                        Công khai
                      </Button>
                    </Dropdown>
                  </div>
                  <div className="collapse-content-action-right">
                    <Button onClick={() => setShowMore(false)}>Hủy</Button>
                    <Button>Lưu</Button>
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

export default CollapseCustom;
