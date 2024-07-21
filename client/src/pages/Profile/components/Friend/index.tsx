import React from "react";
import { Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./Friend.scss";

import Input from "../../../../components/Input/index.tsx";
import BarUser from "../../../../components/BarUser/index.tsx";
import SectionWrapper from "../../../../components/SectionWrapper/index.tsx";

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
    <SectionWrapper
      title="Bạn bè"
      headerRight={
        <div>
          <Input
            onlyBottom
            placeholder="Tìm kiếm"
            suffix={<SearchOutlined />}
          />
        </div>
      }
    >
      <div className="friend-content">
        <Tabs defaultActiveKey="1" items={itemTab} />
      </div>
    </SectionWrapper>
  );
}

function AllFriend() {
  return (
    <div className="tab-all-friend">
      <div className="tab-friend-section">
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
      </div>
    </div>
  );
}

function SameCountry() {
  return (
    <div className="tab-same-country-friend">
      <div className="tab-friend-section">
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
      </div>
    </div>
  );
}

function SameCurrentLife() {
  return (
    <div className="tab-current-life-friend">
      <div className="tab-friend-section">
        <BarUser className="tab-friend-item" options />
        <BarUser className="tab-friend-item" options />
      </div>
    </div>
  );
}

export default Friend;
