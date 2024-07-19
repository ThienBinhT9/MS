import React from "react";
import { Tabs } from "antd";
import { GlobalOutlined, EllipsisOutlined } from "@ant-design/icons";

import "./About.scss";

function Overview() {
  return (
    <div>
      <p>Over view</p>
    </div>
  );
}

function Job() {
  return (
    <div className="wrapper-about-job">
      <p className="profile-about-title">Công việc</p>
    </div>
  );
}

function Born() {
  return (
    <div className="wrapper-about-born">
      <p className="profile-about-title">Nơi sống</p>
      <div className="about-born-current-life">
        <div>
          <p style={{ fontSize: 18, fontWeight: 600 }}>Hà Nội</p>
          <p>Tỉnh/Thành phố hiện tại</p>
        </div>
        <div>
          <GlobalOutlined />
          <EllipsisOutlined />
        </div>
      </div>
      <div></div>
    </div>
  );
}

function About() {
  const itemTab = [
    {
      label: <p style={{ fontSize: 16, fontWeight: 500 }}>Tổng quan</p>,
      key: "1",
      children: <Overview />,
    },
    {
      label: (
        <p style={{ fontSize: 16, fontWeight: 500 }}>Công việc và học vấn</p>
      ),
      key: "2",
      children: <Job />,
    },
    {
      label: <p style={{ fontSize: 16, fontWeight: 500 }}>Nơi sống</p>,
      key: "3",
      children: <Born />,
    },
  ];
  return (
    <div className="wrapper-about">
      <Tabs defaultActiveKey="1" tabPosition={"left"} items={itemTab} />
    </div>
  );
}

export default About;
