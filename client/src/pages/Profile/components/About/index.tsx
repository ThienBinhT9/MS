import React from "react";
import { Tabs } from "antd";

import "./About.scss";

function Overview() {
  console.log("Tab overview");

  return (
    <div>
      <p>Over view</p>
    </div>
  );
}

function Job() {
  console.log("Tab Job");

  return (
    <div>
      <p>Job</p>
    </div>
  );
}

function Born() {
  console.log("Tab Born");

  return (
    <div>
      <p>Born</p>
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
      label: <p style={{ fontSize: 16, fontWeight: 500 }}>Nơi từng sống</p>,
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
