import { Divider, Drawer, Carousel } from "antd";
import { useMediaQuery } from "react-responsive";
import ReadMoreReadLess from "react-read-more-read-less";
import React, { memo, useCallback, useState } from "react";
import {
  HeartTwoTone,
  HeartOutlined,
  ArrowUpOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import "./PostDetail.scss";

import Modal from "../Modal/index.tsx";
import Input from "../Input/index.tsx";
import Button from "../Button/index.tsx";
import Options from "../Post/Options.tsx";

function PostDetail({ show, like, setLike, onClose }) {
  const isTabletScreen = useMediaQuery({ maxWidth: 1300 });
  const isTabletMobile = useMediaQuery({ maxWidth: 768 });

  const [showOption, setShowOption] = useState(false);

  const handleCloseOption = useCallback(() => {
    setShowOption(false);
  }, []);

  const handleSend = () => {
    console.log(123);
  };
  return (
    <>
      {showOption && <Options show={showOption} onClose={handleCloseOption} />}
      {isTabletMobile ? (
        <Drawer
          height="85%"
          open={show}
          closable={false}
          onClose={onClose}
          placement="bottom"
          style={{ borderRadius: "12px 12px 0 0" }}
          title={<span style={{ fontSize: 18 }}>Bình luận</span>}
          footer={
            <div className="post-comment-input">
              <img
                src="https://i.pinimg.com/236x/fd/8a/5e/fd8a5efd453d979902eac08f012bf113.jpg"
                alt=""
                className="post-detail-avatar"
              />
              <Input
                placeholder="Viết bình luận..."
                suffix={
                  <ArrowUpOutlined
                    style={{ cursor: "pointer" }}
                    onClick={handleSend}
                  />
                }
              />
            </div>
          }
          extra={
            <Button text onClick={onClose}>
              Đóng
            </Button>
          }
        ></Drawer>
      ) : (
        <Modal
          centered
          open={show}
          width={isTabletScreen ? "70%" : "50%"}
          footer={false}
          closable={false}
          onCancel={onClose}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div className="post-comment-input">
            <img
              src="https://i.pinimg.com/236x/fd/8a/5e/fd8a5efd453d979902eac08f012bf113.jpg"
              alt=""
              className="post-detail-avatar"
            />
            <Input
              placeholder="Viết bình luận..."
              suffix={
                <ArrowUpOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleSend}
                />
              }
            />
          </div>
          <div className="wrapper-post-detail">
            <div className="post-detail-header">
              <div className="post-detail-header-left">
                <img
                  className="post-detail-avatar"
                  src="https://i.pinimg.com/236x/fd/8a/5e/fd8a5efd453d979902eac08f012bf113.jpg"
                  alt="avatar"
                />
                <div className="post-detail-author">
                  <p className="post-detail-name">Đỗ Hoài Phong</p>
                  <span className="post-detail-createdAt">2 giờ trước</span>
                </div>
              </div>
              <EllipsisOutlined
                style={{ cursor: "pointer" }}
                onClick={() => setShowOption(true)}
              />
            </div>
            <div className="post-detail-title">
              <ReadMoreReadLess
                charLimit={110}
                readMoreText={
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    Xem thêm
                  </span>
                }
                readLessText={
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Ẩn bớt</span>
                }
              >
                Hi Summer
              </ReadMoreReadLess>
            </div>
            <div className="post-detail-images">
              <Carousel
                arrows
                draggable
                infinite={false}
                className="carousel-content"
              >
                <img
                  src="https://i.pinimg.com/564x/19/c9/d1/19c9d188282c8cea71153f47e48dbf40.jpg"
                  alt="avatar"
                />
                <img
                  src="https://i.pinimg.com/736x/d2/06/fd/d206fd9cc697671f168b2d1e999ede7c.jpg"
                  alt="avatar"
                />
                <img
                  src="https://i.pinimg.com/736x/62/26/88/62268860dc4260e1e9a60164f509d0f5.jpg"
                  alt="avatar"
                />
                <img
                  src="https://i.pinimg.com/236x/fd/8a/5e/fd8a5efd453d979902eac08f012bf113.jpg"
                  alt="avatar"
                />
              </Carousel>
            </div>
            <div className="post-detail-actions">
              {like ? (
                <HeartTwoTone
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={() => setLike(false)}
                  className="like-active"
                  twoToneColor="#FF0000"
                />
              ) : (
                <HeartOutlined
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={() => setLike(true)}
                />
              )}
              <p style={{ fontWeight: 600, fontSize: 16 }}>674 Lượt thích</p>
            </div>
            <Divider style={{ backgroundColor: "#eaeaea", margin: "12px 0" }} />
            <div className="post-detail-comment">
              <p>Bình luận</p>
              <div className="post-detail-list"></div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default memo(PostDetail);
