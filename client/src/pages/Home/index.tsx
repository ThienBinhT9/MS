import React from "react";

import "./Home.scss";

import Post from "../../components/Post/index.tsx";
import Think from "../../components/Think/index.tsx";

function Home() {
  return (
    <div className="wrapper-home">
      <Think />
      <div className="home-posts">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Home;
