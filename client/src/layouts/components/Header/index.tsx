import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown, MenuProps, Drawer } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import "./Header.scss";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../redux/store";
import logo from "../../../assets/images/logo.png";

import Button from "../../../components/Button/index.tsx";

const items: MenuProps["items"] = [
  {
    label: <NavLink to="/profile">Trang cá nhân</NavLink>,
    key: "0",
    icon: <UserOutlined />,
  },
  {
    type: "divider",
  },
  {
    label: <NavLink to="/auth/sign-in">Đăng xuất</NavLink>,
    key: "3",
    icon: <LogoutOutlined />,
  },
];

function Header() {
  const { token } = useSelector((state: RootState) => state.auth);

  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className="wrapper-header">
      <div className="header-inner">
        <NavLink to="/" className="header-logo">
          <img src={logo} alt="logo" />
        </NavLink>
        {token ? (
          <>
            <div className="header-nav">
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                className="header-dropdown"
              >
                <div className="header-nav-item--more">
                  <img src="https://i.pinimg.com/564x/8f/5a/90/8f5a90b9dbf868baf53fc990cde10e6e.jpg" />
                </div>
              </Dropdown>
            </div>
            <div className="header-nav-mobile">
              <SearchOutlined />
              <MenuOutlined onClick={showDrawer} />
              <Drawer
                width="65%"
                onClose={onClose}
                open={openDrawer}
                closable={false}
                title="Menu"
                footer={
                  <Button
                    text
                    to="/auth/sign-in"
                    icon={<LogoutOutlined />}
                    onClick={onClose}
                  >
                    Đăng xuất
                  </Button>
                }
                extra={
                  <Button primary onClick={onClose}>
                    Đóng
                  </Button>
                }
              >
                <Button
                  text
                  to="/profile"
                  icon={<UserOutlined />}
                  onClick={onClose}
                  style={{ width: "100%", justifyContent: "flex-start" }}
                >
                  Trang cá nhân
                </Button>
              </Drawer>
            </div>
          </>
        ) : (
          <div className="header-nav-unLogin">
            <Button primary to="/auth/sign-in">
              Sign In
            </Button>
            <Button to="/auth/sign-up">Sign Up</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
