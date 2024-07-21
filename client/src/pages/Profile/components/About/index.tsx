import React from "react";
import { Tabs } from "antd";

import "./About.scss";

import Collapse from "../../../../components/Collapse/index.tsx";

function Overview() {
  return (
    <div className="wrapper-about-overview">
      <div className="about-section">
        <Collapse
          title="Hà Nội"
          subTitle="Tỉnh/Thành phố hiện tại"
          placeholder="Nơi ở hiện tại"
          select
        />
        <Collapse
          title="Từ Sơn"
          subTitle="Quê quán"
          placeholder="Quê quán của bạn"
          select
        />
        <Collapse
          title="Độc Thân"
          subTitle="Mối quan hệ"
          placeholder="Nơi ở hiện tại"
          select
        />
        <Collapse
          title="0969975192"
          subTitle="Số di động"
          placeholder="Số di động của bạn"
        />
      </div>
    </div>
  );
}

function Job() {
  return (
    <div className="wrapper-about-job">
      <div className="about-section">
        <p className="profile-about-title">Công việc</p>
        <Collapse
          title="Hà Nội"
          subTitle="Tỉnh/Thành phố hiện tại"
          placeholder="Nơi ở hiện tại"
          select
        />
      </div>
      <div className="about-section">
        <p className="profile-about-title">Học vấn</p>
        <Collapse
          title="Đại học Công nghiệp Hà Nội"
          subTitle="Đại Học"
          placeholder="Trường đại học bạn theo học"
        />
        <Collapse title="Trường THPT Từ Sơn" subTitle="Trường THPT" />
      </div>
    </div>
  );
}

function Born() {
  return (
    <div className="wrapper-about-born">
      <div className="about-section">
        <p className="profile-about-title">Nơi sống</p>
        <Collapse
          title="Hà Nội"
          subTitle="Tỉnh/Thành phố hiện tại"
          placeholder="Nơi ở hiện tại"
          select
        />
        <Collapse
          title="Từ Sơn"
          subTitle="Quê quán"
          placeholder="Quê quán hiện tại"
        />
      </div>
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
        <p style={{ fontSize: 16, fontWeight: 500 }}>Công việc & học vấn</p>
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
      <Tabs tabPosition={"left"} items={itemTab} />
    </div>
  );
}

export default About;
