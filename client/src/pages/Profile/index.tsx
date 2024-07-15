import React from "react";
import { Avatar, Dropdown, MenuProps, Divider } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

import "./Profile.scss";

const items: MenuProps["items"] = [
  {
    label: <p>Xem ảnh đại diện</p>,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    key: "3",
    label: <div>Chọn ảnh đại diện</div>,
  },
];

function Profile() {
  return (
    <div className="wrapper-profile">
      <div className="profile-header">
        <Dropdown
          menu={{ items }}
          placement="bottom"
          trigger={["click"]}
          overlayStyle={{ width: 300 }}
          arrow={{ pointAtCenter: true }}
        >
          <Avatar
            size={150}
            icon={<AntDesignOutlined />}
            style={{ cursor: "pointer" }}
            src="https://i.pinimg.com/564x/ab/69/4f/ab694f8e0555c4aa475469e6b141dd17.jpg"
          />
        </Dropdown>
        <div className="profile-author">
          <p className="profile-name">Đỗ Hoài Phong</p>
          <span className="profile-friend">364 Bạn bè</span>
        </div>
      </div>
      <Divider style={{ backgroundColor: "#eaeaea" }} />
    </div>
  );
}

export default Profile;
