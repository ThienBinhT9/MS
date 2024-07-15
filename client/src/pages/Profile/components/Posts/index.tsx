import React from "react";
import StickyBox from "react-sticky-box";

import "./Posts.scss";

import Post from "../../../../components/Post/index.tsx";
import SectionWrapper from "../../../../components/SectionWrapper/index.tsx";

function Posts() {
  return (
    <div className="wrapper-posts">
      <div className="posts-left">
        <StickyBox offsetTop={74} offsetBottom={20}>
          <div className="posts-content-left">
            <SectionWrapper title="Giới thiệu">
              <div></div>
            </SectionWrapper>
            <SectionWrapper
              title="Ảnh"
              textMore="Xem tất cả ảnh"
              toTextMore="/profile/images"
            >
              <div></div>
            </SectionWrapper>
            <SectionWrapper
              title="Bạn bè"
              textMore="Xem tất cả bạn bè"
              toTextMore="/profile/friends"
            >
              <div></div>
            </SectionWrapper>
          </div>
        </StickyBox>
      </div>
      <div className="posts-right">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Posts;
