import React from "react";
import { Modal, ModalProps } from "antd";

interface Props extends ModalProps {}

function ModalCustom(props: Props) {
  const { ...pass } = props;
  return <Modal {...pass}></Modal>;
}

export default ModalCustom;
