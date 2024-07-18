import React from "react";
import { Tabs } from "antd";
import { SearchOutlined, EllipsisOutlined } from "@ant-design/icons";

import "./Friend.scss";

import Input from "../../../../components/Input/index.tsx";

function Friend() {
  const itemTab = [
    {
      label: <p style={{ fontSize: 16, fontWeight: 500 }}>Tất cả bạn bè</p>,
      key: "1",
      children: <AllFriend />,
    },
    {
      label: <p style={{ fontSize: 16, fontWeight: 500 }}>Quên quán</p>,
      key: "2",
      children: <SameCountry />,
    },
    {
      label: (
        <p style={{ fontSize: 16, fontWeight: 500 }}>Tỉnh/Thành phố hiện tại</p>
      ),
      key: "3",
      children: <SameCurrentLife />,
    },
  ];
  return (
    <div className="wrapper-friends">
      <div className="friend-header">
        <h5 className="friend-title">Bạn bè</h5>
        <div>
          <Input
            onlyBottom
            placeholder="Tìm kiếm"
            suffix={<SearchOutlined />}
          />
        </div>
      </div>
      <div className="friend-content">
        <Tabs defaultActiveKey="1" items={itemTab} />
      </div>
    </div>
  );
}

function AllFriend() {
  return (
    <div className="tab-all-friend">
      <div className="tab-all-friend-item">
        <div></div>
        <EllipsisOutlined />
      </div>
    </div>
  );
}

function SameCountry() {
  return (
    <div>
      <p>Quê quán</p>
    </div>
  );
}

function SameCurrentLife() {
  return (
    <div>
      <p>Nơi sống hiện tại</p>
    </div>
  );
}

export default Friend;
