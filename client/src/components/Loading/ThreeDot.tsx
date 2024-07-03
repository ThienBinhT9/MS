import React from "react";
import { ThreeDots } from "react-loader-spinner";

import "./Loading.scss";

interface Props {
  limit?: "over" | "term";
}

function ThreeDotLoader(props: Props) {
  const { limit = "over" } = props;
  return (
    <div className={`wrapper-loading ${limit}`}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        radius="9"
        color="#ffdab9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}

export default ThreeDotLoader;
