import React from "react";
import { Divider } from "antd";
import {
  SmileTwoTone,
  FileImageTwoTone,
  VideoCameraTwoTone,
} from "@ant-design/icons";

import "./Home.scss";

import Post from "../../components/Post/index.tsx";
import Input from "../../components/Input/index.tsx";
import Button from "../../components/Button/index.tsx";

function Home() {
  return (
    <div className="wrapper-home">
      <div className="home-your-thought">
        <div className="your-thought-top">
          <div className="your-thought-avatar">
            <img
              src="https://i.pinimg.com/564x/ab/69/4f/ab694f8e0555c4aa475469e6b141dd17.jpg"
              alt="avatar"
            />
          </div>
          <Input placeholder="What in your mind?" />
        </div>
        <Divider style={{ margin: "12px 0", backgroundColor: "#e2e2e2" }} />
        <div className="your-thought-bottom">
          <Button
            text
            className="your-thought-item"
            icon={<VideoCameraTwoTone twoToneColor="#FF0000" />}
          >
            Live
          </Button>
          <Button
            text
            className="your-thought-item"
            icon={<FileImageTwoTone twoToneColor="#66CC33" />}
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
      <div className="home-posts">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Home;
