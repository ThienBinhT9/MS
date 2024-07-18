import React from "react";
import { Avatar, Popover } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import "./BarUser.scss";
import Button from "../Button/index.tsx";

function BarUser() {
  return (
    <Popover
      style={{ width: 200 }}
      content={
        <div style={{ width: 400 }}>
          <div className="popover-bar-user">
            <Avatar
              size={102}
              style={{ flexShrink: 0 }}
              src="https://i.pinimg.com/564x/44/6a/e0/446ae001e228988f6abf6e908d0f7a9f.jpg"
            />
            <div>
              <p className="popover-bar-user-name">Đỗ Hoài Phong</p>
              <p className="popover-bar-user-friends">
                Đã trở thành bạn bè với Đỗ Hoài Phong và 25 người khác
              </p>
              <p className="popover-bar-user-mutual-friends">
                59 Bạn chung bao gồm Đỗ Hoài Phong
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Button style={{ flex: 1 }} icon={<UserAddOutlined />}>
              Thêm bạn bè
            </Button>
            <Button style={{ flex: 1 }} primary>
              Nhắn tin
            </Button>
            <Popover
              trigger="click"
              placement="bottom"
              content={
                <div>
                  <p>Chặn</p>
                  <p>Gọi</p>
                </div>
              }
            >
              <Button icon={<EllipsisOutlined />} />
            </Popover>
          </div>
        </div>
      }
    >
      <div className="wrapper-bar-user">
        <Avatar
          size={44}
          icon={<UserOutlined />}
          src="https://i.pinimg.com/564x/44/6a/e0/446ae001e228988f6abf6e908d0f7a9f.jpg"
        />
        <div>
          <p className="bar-user-name">Đỗ Hoài Phong</p>
          <p className="bar-user-mutual-friends">12 Bạn chung</p>
        </div>
      </div>
    </Popover>
  );
}

export default BarUser;
