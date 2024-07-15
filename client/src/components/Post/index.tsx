import { Divider } from "antd";
import React, { useCallback, useState } from "react";
import {
  HeartTwoTone,
  HeartOutlined,
  CommentOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import ReadMoreReadLess from "react-read-more-read-less";

import "./Post.scss";

import Options from "./Options.tsx";
import PostDetail from "../PostDetail/index.tsx";

function Post() {
  const [like, setLike] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const handleLike = useCallback(() => {
    setLike(!like);
  }, [like]);

  const handleCloseOption = useCallback(() => {
    setShowOption(!showOption);
  }, [showOption]);

  return (
    <>
      <div className="wrapper-post">
        <div className="post-images">
          <img
            src="https://i.pinimg.com/564x/19/c9/d1/19c9d188282c8cea71153f47e48dbf40.jpg"
            alt="avatar"
          />
        </div>
        <div className="post-info">
          <div className="post-author">
            <div className="post-author-avatar">
              <img
                src="https://i.pinimg.com/564x/ab/69/4f/ab694f8e0555c4aa475469e6b141dd17.jpg"
                alt="avatar"
              />
            </div>
            <div className="post-author-info">
              <p className="post-author-name">Đỗ Hoài Phong</p>
              <span className="post-createdAt">2 giờ trước</span>
            </div>
          </div>
          <ReadMoreReadLess
            charLimit={130}
            readMoreText={
              <span style={{ fontWeight: 600, fontSize: 14 }}>Xem thêm</span>
            }
            readLessText={
              <span style={{ fontWeight: 600, fontSize: 14 }}>Ẩn bớt</span>
            }
          >
            Create a blog post subtitle that summarizes your post
          </ReadMoreReadLess>
          <Divider style={{ backgroundColor: "#e2e2e2" }} />
          <div className="post-actions">
            <div className="post-actions-left">
              {like ? (
                <HeartTwoTone
                  className="like-active"
                  twoToneColor="#FF0000"
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={handleLike}
                />
              ) : (
                <HeartOutlined
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={handleLike}
                />
              )}
              <CommentOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => setShowComment(true)}
              />
            </div>

            <EllipsisOutlined
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => setShowOption(true)}
            />
          </div>
          <div className="post-interact">
            <p className="post-quantity-like">200 Lượt thích</p>
            <p className="post-quantity-comment">35 Bình luận</p>
          </div>
        </div>
      </div>
      {showOption && <Options show={showOption} onClose={handleCloseOption} />}
      {showComment && (
        <PostDetail
          like={like}
          show={showComment}
          setLike={handleLike}
          onClose={() => setShowComment(false)}
        />
      )}
    </>
  );
}

export default Post;
