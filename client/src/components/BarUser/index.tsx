import React from "react";
import { Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./BarUser.scss";

function BarUser() {
  return (
    <Popover
      content={
        <div>
          <p>Ahihih</p>
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
