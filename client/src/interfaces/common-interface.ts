import React from "react";

export interface IRoute {
  path: string;
  element: () => React.JSX.Element;
  layout?: ({ children }: { children: any }) => React.JSX.Element;
  children?: Array<IRoute>;
}

export interface IGender {
  label: String;
  value: any;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
  userId: string;
}
