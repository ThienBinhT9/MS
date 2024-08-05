import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdown, MenuProps, Drawer, Badge } from "antd";
import OutsideClickHandler from "react-outside-click-handler";
import {
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  MessageOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import "./Header.scss";
import { RootState } from "../../../redux/store";
import logo from "../../../assets/images/logo.png";
import { signOut } from "../../../services/auth-service.ts";
import { createAxios } from "../../../configs/token.config.ts";

import Input from "../../../components/Input/index.tsx";
import Button from "../../../components/Button/index.tsx";
import ThreeDotLoader from "../../../components/Loading/ThreeDot.tsx";

function Header() {
  const { token, loading } = useSelector((state: RootState) => state.auth);
  const { currentUser } = useSelector((state: RootState) => state.user);
  console.log({ currentUser });

  const isMobileScreen = useMediaQuery({ maxWidth: 768 });
  const isTabletScreen = useMediaQuery({ maxWidth: 1024 });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drawerRef = useRef<HTMLDivElement>(null);
  const axiosInstance = createAxios(token, dispatch);

  const [openDrawerMenu, setOpenDrawerMenu] = useState(false);
  const [openDrawerSearch, setOpenDrawerSearch] = useState(false);

  const onClose = () => {
    setOpenDrawerMenu(false);
    setOpenDrawerSearch(false);
  };

  const handleSignOut = async () => {
    await signOut(axiosInstance, token, navigate, dispatch);
    onClose();
  };

  const items: MenuProps["items"] = [
    {
      label: <NavLink to="/profile">Trang cá nhân</NavLink>,
      key: "0",
      icon: <UserOutlined />,
    },
    {
      label: <NavLink to="/settings">Cài đặt</NavLink>,
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      label: <div>Đăng xuất</div>,
      key: "3",
      icon: <LogoutOutlined />,
      onClick: handleSignOut,
    },
  ];

  useEffect(() => {
    isMobileScreen ? setOpenDrawerSearch(false) : setOpenDrawerMenu(false);
  }, [isMobileScreen]);

  return (
    <div className="wrapper-header">
      {loading && <ThreeDotLoader />}
      <div className="header-inner">
        <NavLink to="/" className="header-logo">
          <img src={logo} alt="logo" />
        </NavLink>
        {token.access_token ? (
          <>
            <div className="header-nav">
              <OutsideClickHandler onOutsideClick={onClose}>
                <SearchOutlined
                  className="header-nav-item"
                  onClick={() => setOpenDrawerSearch(true)}
                />
                <div ref={drawerRef}>
                  <Drawer
                    mask={false}
                    width={isTabletScreen ? "42%" : "35%"}
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    open={openDrawerSearch}
                    getContainer={() =>
                      drawerRef.current?.parentElement || document.body
                    }
                    title={
                      <div>
                        <h4 className="drawer-title-text">Tìm kiếm</h4>
                        <Input
                          placeholder="Tìm kiếm"
                          prefix={<SearchOutlined />}
                          suffix={<CloseCircleOutlined />}
                          style={{ backgroundColor: "#efefef", border: "none" }}
                        />
                      </div>
                    }
                  >
                    <p style={{ fontSize: 15, fontWeight: 500 }}>Gần đây</p>
                  </Drawer>
                </div>
              </OutsideClickHandler>

              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
              >
                <Badge dot size="small">
                  <MessageOutlined className="header-nav-item" />
                </Badge>
              </Dropdown>
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                arrow={{ pointAtCenter: true }}
                placement="bottomRight"
              >
                <Badge dot size="small">
                  <BellOutlined className="header-nav-item" />
                </Badge>
              </Dropdown>
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
              >
                <div className="header-nav-item--more">
                  <img src={currentUser?.avatar} alt="avatar" />
                </div>
              </Dropdown>
            </div>
            <div className="header-nav-mobile">
              <SearchOutlined />
              <MenuOutlined onClick={() => setOpenDrawerMenu(true)} />
              <Drawer
                width="65%"
                onClose={onClose}
                open={openDrawerMenu}
                closable={false}
                title="Menu"
                footer={
                  <Button
                    text
                    to="/auth/sign-in"
                    icon={<LogoutOutlined />}
                    onClick={handleSignOut}
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
