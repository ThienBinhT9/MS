import React from "react";
import { Image, Dropdown, MenuProps } from "antd";
import { CameraOutlined, EditFilled } from "@ant-design/icons";

import "./Picture.scss";

import Button from "../../../../components/Button/index.tsx";
import SectionWrapper from "../../../../components/SectionWrapper/index.tsx";
const items: MenuProps["items"] = [
  { key: "1", label: "Xóa ảnh" },
  { type: "divider" },
  { key: "2", label: "Đặt làm ảnh đại diện" },
];

function Picture() {
  return (
    <SectionWrapper
      title="Ảnh"
      headerRight={
        <Button icon={<CameraOutlined />} primary>
          Thêm ảnh
        </Button>
      }
    >
      <div className="wrapper-picture">
        {[1, 2, 3, 4, 5, 6, 7, 8, 8].map((item, index) => {
          return (
            <div className="picture-item" key={index}>
              <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                <EditFilled className="picture-item-edit" />
              </Dropdown>
              <Image src="https://i.pinimg.com/564x/ab/69/4f/ab694f8e0555c4aa475469e6b141dd17.jpg" />
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

export default Picture;
