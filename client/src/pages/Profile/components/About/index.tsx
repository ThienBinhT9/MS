import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";

import "./About.scss";
import { RootState } from "../../../../redux/store.ts";
import { getLocation } from "../../../../services/common-service.ts";
import { RELATIONSHIP } from "../../../../constants/common-constants.ts";

import Collapse from "../../../../components/Collapse/index.tsx";
import CollapseInput from "../../../../components/CollapseInput/index.tsx";
import CollapseSelect from "../../../../components/CollapseSelect/index.tsx";

function Overview() {
  const { client } = useSelector((state: RootState) => state.user);
  console.log({ client });

  return (
    <div className="wrapper-about-overview">
      <div className="about-section">
        {true && (
          <CollapseSelect
            title={client?.currentResidence}
            subTitle="Tỉnh/Thành đang sống hiện tại"
            name="currentResidence"
            state={client?.privacy?.currentResidence}
            search
            fetchData={getLocation}
          />
        )}
        {client?.homeTown && (
          <CollapseSelect
            title={client?.homeTown}
            subTitle="Quê quán"
            name="homeTown"
            state={client?.privacy?.homeTown}
            search
            fetchData={getLocation}
          />
        )}
        {client?.phone && (
          <CollapseInput
            title={client?.phone}
            subTitle="Số điện thoại"
            placeholder="Số điện thoại của bạn"
            name="phone"
            state={client?.privacy?.phone}
          />
        )}
        {client?.relationship && (
          <CollapseSelect
            title={client?.relationship}
            subTitle="Mối quan hệ"
            name="relationship"
            state={client?.privacy?.relationship}
            options={RELATIONSHIP}
          />
        )}
      </div>
    </div>
  );
}

function Job() {
  const { client } = useSelector((state: RootState) => state.user);

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
