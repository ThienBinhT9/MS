import React from "react";
import { NavLink } from "react-router-dom";

import "./SectionWrapper.scss";

interface Props {
  title: string;
  textMore?: string;
  toTextMore?: string;
  children: any;
  headerRight?: any;
}

function SectionWrapper(props: Props) {
  const { title, textMore, toTextMore, children, headerRight } = props;
  return (
    <div className="wrapper-section-wrapper">
      <div className="section-wrapper-header">
        <p className="section-wrapper-title">{title}</p>
        {headerRight
          ? headerRight
          : textMore &&
            toTextMore && (
              <NavLink to={toTextMore} className="section-wrapper-more">
                {textMore}
              </NavLink>
            )}
      </div>
      {children}
    </div>
  );
}

export default SectionWrapper;
