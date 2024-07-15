import React from "react";
import { Avatar, Dropdown, MenuProps, Divider, Menu } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { NavLink, Outlet, useLocation } from "react-router-dom";

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

type MenuItem = Required<MenuProps>["items"][number];

const items2: MenuItem[] = [
  {
    label: <NavLink to="">Bài viết</NavLink>,
    key: "",
    className: "profile-header-nav-item",
  },
  {
    label: <NavLink to="about">Giới thiệu</NavLink>,
    key: "about",
    className: "profile-header-nav-item",
  },
  {
    label: <NavLink to="friends">Bạn bè</NavLink>,
    key: "friends",
    className: "profile-header-nav-item",
  },
  { key: "image", label: "Ảnh", className: "profile-header-nav-item" },
];

function Profile() {
  const { pathname } = useLocation();
  const [host, params] = pathname.split("/").filter((item) => !!item && item);

  return (
    <div className="wrapper-profile">
      <div className="profile-header">
        <div className="profile-header-inner">
          <div className="profile-header-info">
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
          <Divider style={{ backgroundColor: "#eaeaea", marginBottom: 0 }} />
          <Menu
            selectedKeys={[`${params || ""}`]}
            mode="horizontal"
            items={items2}
          />
        </div>
      </div>
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
