import { useMediaQuery } from "react-responsive";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown, MenuProps, Divider, Menu } from "antd";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CaretDownOutlined, PlusOutlined, EditFilled } from "@ant-design/icons";

import "./Profile.scss";
import { RootState } from "../../redux/store.ts";
import { getQueryParams } from "../../utils/index.ts";
import { getInfo } from "../../services/user-service.ts";
import { getNumberOfFriends } from "../../services/friend-service.ts";

import Button from "../../components/Button/index.tsx";
import { createAxios } from "../../configs/token.config.ts";
import { usePermission } from "../../hooks/usePermission.tsx";

type MenuItem = Required<MenuProps>["items"][number];

const optionAvatar: MenuProps["items"] = [
  {
    label: <p>Xem ảnh đại diện</p>,
    key: "0",
  },
  { type: "divider" },
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
  const { currentUser, client, loading } = useSelector(
    (state: RootState) => state.user
  );
  const { token } = useSelector((state: RootState) => state.auth);

  const { pathname, search } = useLocation();
  const { id } = getQueryParams(search);
  const [host, params] = pathname.split("/").filter((item) => !!item && item);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isView: EditProfile } = usePermission("EditProfile");
  const { isView: CreateArticles } = usePermission("CreateArticles");

  const axiosInstance = createAxios(token, dispatch);

  let optionNav: MenuItem[] = [
    {
      label: <NavLink to={`/profile?id=${id}`}>Bài viết</NavLink>,
      key: "",
      className: "profile-header-nav-item",
    },
    {
      label: <NavLink to={`/profile/about?id=${id}`}>Giới thiệu</NavLink>,
      key: "about",
      className: "profile-header-nav-item",
    },
    {
      label: <NavLink to={`/profile/friends?id=${id}`}>Bạn bè</NavLink>,
      key: "friends",
      className: "profile-header-nav-item",
    },
    {
      key: "picture",
      label: <NavLink to={`/profile/picture?id=${id}`}>Ảnh</NavLink>,
      className: "profile-header-nav-item",
    },
    {
      key: "more",
      label: (
        <span>
          Xem thêm <CaretDownOutlined className="custom-icon" />
        </span>
      ),
      className: "profile-header-nav-item profile-header-nav-item--more",
      children: optionsNavMobile,
    },
  ];

  if (useMediaQuery({ maxWidth: 520 })) {
    optionNav.pop();
    optionNav = [...optionNav, ...optionsNavMobile];
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [params, host]);

  useEffect(() => {
    if (!id) navigate(`/profile?id=${currentUser?._id}`);
  }, [currentUser, navigate, id]);

  useEffect(() => {
    id && getInfo(axiosInstance, id, token, dispatch);
  }, [id]);

  return (
    <div className="wrapper-profile">
      <div className="profile-header">
        <div className="profile-header-inner">
          <div className="profile-header-info">
            <div className="header-info-left">
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
                  src={client?.avatar}
                />
              </Dropdown>
              <div className="profile-author">
                <p className="profile-name">
                  {client?.firstName} {client?.lastName}
                </p>

                <span className="profile-friend">0 Bạn bè</span>
              </div>
            </div>
            <div className="header-info-right">
              {CreateArticles && (
                <Button
                  primary
                  icon={<PlusOutlined />}
                  className="info-right-item"
                >
                  Tạo bài viết
                </Button>
              )}
              {EditProfile && (
                <Button className="info-right-item" icon={<EditFilled />}>
                  Chỉnh sửa trang cá nhân
                </Button>
              )}
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
