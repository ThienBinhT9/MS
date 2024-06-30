import React from "react";

export interface IRoute {
  path: string;
  element: () => React.JSX.Element;
  layout?: ({ children }: { children: any }) => React.JSX.Element;
  children?: Array<IRoute>;
}
