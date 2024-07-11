import React from "react";
import { Menu, MenuProps } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  SunOutlined,
  HomeOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  PlusSquareOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  BellOutlined,
  VideoCameraOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";

import "./Navigation.scss";
import { useMediaQuery } from "react-responsive";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "",
    icon: <HomeOutlined />,
    label: <NavLink to="/">Trang chủ</NavLink>,
    className: "nav-item",
  },
  {
    key: "friends",
    icon: <UsergroupDeleteOutlined />,
    label: <NavLink to="/friend">Bạn bè</NavLink>,
    className: "nav-item",
  },
  {
    key: "create-post",
    icon: <PlusSquareOutlined />,
    label: <NavLink to="/create-post">Tạo</NavLink>,
    className: "nav-item",
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: <NavLink to="/profile">Trang cá nhân</NavLink>,
    className: "nav-item",
  },
  { type: "divider" },
  //   {
  //     key: "menu",
  //     label: "Menu",
  //     className: "nav-item",
  //     style: { padding: 0 },
  //     icon: <MenuOutlined />,
  //     children: [
  //       { key: "9", label: "Cài đặt", icon: <SettingOutlined /> },
  //       { key: "10", label: "Chuyển chế độ", icon: <SunOutlined /> },
  //       { key: "11", label: "Báo cáo sự cố", icon: <InfoCircleOutlined /> },
  //       { type: "divider" },
  //       { key: "12", label: "Đăng xuất", icon: <LogoutOutlined /> },
  //     ],
  //   },
];

function Navigation() {
  const { pathname } = useLocation();

  const isTabletScreen = useMediaQuery({ maxWidth: 1024 });
  console.log(isTabletScreen);

  const [dash, name] = pathname.split("/");

  return (
    <div className="wrapper-nav" style={{ width: !isTabletScreen ? 300 : 70 }}>
      <div className="nav-inner">
        <Menu
          mode="inline"
          items={items}
          selectedKeys={[name]}
          inlineCollapsed={isTabletScreen}
          defaultSelectedKeys={[`${name}`]}
          style={{ width: !isTabletScreen ? 300 : 70, height: "100%" }}
        />
      </div>
      <div className="nav-inner-mobile">
        <NavLink className="nav-item-mobile" to="/">
          <HomeOutlined />
        </NavLink>
        <NavLink className="nav-item-mobile" to="/message">
          <MessageOutlined />
        </NavLink>
        <NavLink className="nav-item-mobile" to="/">
          <PlusSquareOutlined />
        </NavLink>
        <NavLink className="nav-item-mobile" to="/profile">
          <VideoCameraOutlined />
        </NavLink>
        <NavLink className="nav-item-mobile" to="/notifications">
          <BellOutlined />
        </NavLink>
        <NavLink className="nav-item-mobile" to="/profile">
          <UserOutlined />
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;
