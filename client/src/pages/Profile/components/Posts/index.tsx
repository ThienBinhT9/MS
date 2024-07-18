import React, { useState } from "react";
import { Collapse, CollapseProps, Image, Input } from "antd";
import StickyBox from "react-sticky-box";
import {
  ReadFilled,
  HomeFilled,
  HeartFilled,
  EditTwoTone,
  InstagramOutlined,
} from "@ant-design/icons";

import "./Posts.scss";

import Post from "../../../../components/Post/index.tsx";
import Think from "../../../../components/Think/index.tsx";
import Modal from "../../../../components/Modal/index.tsx";
import Button from "../../../../components/Button/index.tsx";
import BarUser from "../../../../components/BarUser/index.tsx";
import SectionWrapper from "../../../../components/SectionWrapper/index.tsx";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <p style={{ color: "white", fontWeight: 500, fontSize: 15 }}>
        Thêm tiểu sử
      </p>
    ),
    children: (
      <div>
        <Input.TextArea
          rows={3}
          placeholder="Mô tả về bạn"
          style={{
            border: "none",
            borderRadius: 0,
            marginBottom: 12,
            borderBottom: "1px solid rgb(119, 136, 153)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button>Hủy</Button>
          <Button>Lưu</Button>
        </div>
      </div>
    ),
  },
];

function Posts() {
  const [detailEdit, setDetailEdit] = useState(false);

  return (
    <div className="wrapper-posts">
      <div className="posts-left">
        <StickyBox offsetTop={74} offsetBottom={20}>
          <div className="posts-content-left">
            <SectionWrapper title="Giới thiệu">
              <div className="posts-introduce">
                <Collapse
                  items={items}
                  expandIcon={() => <EditTwoTone twoToneColor="#ffffff" />}
                  style={{
                    backgroundColor: "rgb(119, 136, 153)",
                  }}
                />
                <div className="posts-introduce-item">
                  <HomeFilled />
                  <p>Đến từ Từ Sơn</p>
                </div>
                <div className="posts-introduce-item">
                  <InstagramOutlined />
                  <p>pongcoat_3</p>
                </div>
                <div className="posts-introduce-item">
                  <HeartFilled />
                  <p>Hẹn hò</p>
                </div>
                <div className="posts-introduce-item">
                  <ReadFilled />
                  <p>Đại học Công nghiệp Hà Nội</p>
                </div>
                <Button
                  primary
                  className="add-biography"
                  onClick={() => setDetailEdit(true)}
                >
                  Chỉnh sửa chi tiết
                </Button>
              </div>
            </SectionWrapper>
            <SectionWrapper
              title="Ảnh"
              textMore="Xem tất cả ảnh"
              toTextMore="/profile/images"
            >
              <div className="posts-images">
                <Image
                  className="posts-images-item"
                  src="https://i.pinimg.com/564x/f6/8a/71/f68a716ef59b749a148c7e620b9ab775.jpg"
                />
                <Image
                  className="posts-images-item"
                  src="https://i.pinimg.com/736x/16/05/1d/16051def6eed3b5171a2da7de127612f.jpg"
                />
                <Image
                  className="posts-images-item"
                  src="https://i.pinimg.com/564x/65/cc/ae/65ccae65b7d97c6910972602e72b91ca.jpg"
                />
                <Image
                  className="posts-images-item"
                  src="https://i.pinimg.com/564x/44/6a/e0/446ae001e228988f6abf6e908d0f7a9f.jpg"
                />
                <Image
                  className="posts-images-item"
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </div>
            </SectionWrapper>
            <SectionWrapper
              title="Bạn bè"
              textMore="Xem tất cả bạn bè"
              toTextMore="/profile/friends"
            >
              <div className="posts-friends">
                <p>596 người bạn</p>
                <div className="post-friends-content">
                  <BarUser />
                  <BarUser />
                  <BarUser />
                  <BarUser />
                </div>
              </div>
            </SectionWrapper>
          </div>
        </StickyBox>
      </div>
      <div className="posts-right">
        <Think />
        <div className="post-right-list">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      {detailEdit && (
        <Modal
          open={detailEdit}
          title="Chỉnh sửa chi tiết"
          onCancel={() => setDetailEdit(false)}
        ></Modal>
      )}
    </div>
  );
}

export default Posts;
