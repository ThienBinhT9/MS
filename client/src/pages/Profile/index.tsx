import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { DownOutlined } from "@ant-design/icons";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Avatar, Dropdown, MenuProps, Divider, Menu } from "antd";

import "./Profile.scss";
type MenuItem = Required<MenuProps>["items"][number];

const optionAvatar: MenuProps["items"] = [
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

const optionsNavMobile: MenuItem[] = [
  { key: "music", label: "Âm nhạc", className: "profile-header-nav-item" },
  { key: "movie", label: "Phim", className: "profile-header-nav-item" },
  {
    key: "tv",
    label: "Chương trình TV",
    className: "profile-header-nav-item",
  },
  { key: "book", label: "Sách", className: "profile-header-nav-item" },
  { key: "favorite", label: "Thích", className: "profile-header-nav-item" },
  { key: "event", label: "Sự kiện", className: "profile-header-nav-item" },
];

function Profile() {
  let optionNav: MenuItem[] = [
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
    {
      key: "more",
      label: (
        <span>
          Xem thêm <DownOutlined className="custom-icon" />
        </span>
      ),
      className: "profile-header-nav-item profile-header-nav-item--more",
      children: optionsNavMobile,
    },
  ];
  const { pathname } = useLocation();
  const width520 = useMediaQuery({ maxWidth: 520 });
  const [host, params] = pathname.split("/").filter((item) => !!item && item);

  if (width520) {
    optionNav.pop();
    optionNav = [...optionNav, ...optionsNavMobile];
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [params]);

  return (
    <div className="wrapper-profile">
      <div className="profile-header">
        <div className="profile-header-inner">
          <div className="profile-header-info">
            <Dropdown
              menu={{ items: optionAvatar }}
              placement="bottom"
              trigger={["click"]}
              overlayStyle={{ width: 300 }}
              arrow={{ pointAtCenter: true }}
            >
              <Avatar
                size={150}
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
            triggerSubMenuAction="click"
            mode="horizontal"
            items={optionNav}
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
