import React from "react";
import { Divider } from "antd";
import {
  SmileTwoTone,
  PictureTwoTone,
  VideoCameraTwoTone,
} from "@ant-design/icons";

import "./Think.scss";

import Input from "../Input/index.tsx";
import Button from "../Button/index.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { Link } from "react-router-dom";

function Think() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="home-your-thought">
      <div className="your-thought-top">
        <Link
          to={`/profile?id=${currentUser?._id}`}
          className="your-thought-avatar"
        >
          <img src={currentUser?.avatar} alt="avatar" />
        </Link>
        <Input placeholder="Bạn đang nghĩ gì?" />
      </div>
      <Divider style={{ margin: "12px 0", backgroundColor: "#e2e2e2" }} />
      <div className="your-thought-bottom">
        <Button
          text
          className="your-thought-item"
          icon={<VideoCameraTwoTone twoToneColor="#FF0000" />}
        >
          Trực tiếp
        </Button>
        <Button
          text
          className="your-thought-item"
          icon={<PictureTwoTone twoToneColor="#66CC33" />}
        >
          Ảnh/Video
        </Button>
        <Button
          text
          className="your-thought-item"
          icon={<SmileTwoTone twoToneColor="#FFA500" />}
        >
          Cảm xúc
        </Button>
      </div>
    </div>
  );
}

export default Think;
