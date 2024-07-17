import React, { memo } from "react";

import "./Post.scss";
import { Modal } from "antd";

import Button from "../Button/index.tsx";

function Options({ show, onClose }) {
  return (
    <Modal
      centered
      width={400}
      footer={<></>}
      closable={false}
      open={show}
      onCancel={onClose}
    >
      <div className="post-options">
        <Button text className="post-options_item post-options_item--danger">
          Báo cáo
        </Button>
        <Button text className="post-options_item post-options_item--danger">
          Bỏ theo dõi
        </Button>
        <Button text className="post-options_item post-options_item--danger">
          Thêm vào thùng giác
        </Button>
        <Button text className="post-options_item">
          Thêm vào mục yêu thích
        </Button>
        <Button text className="post-options_item">
          Giới thiệu về tài khoản này
        </Button>
        <Button text className="post-options_item" onClick={onClose}>
          Hủy
        </Button>
      </div>
    </Modal>
  );
}

export default memo(Options);
