import React from "react";
import { string } from "yup";

export interface IRoute {
  path: string;
  element: () => React.JSX.Element;
  layout?: ({ children }: { children: any }) => React.JSX.Element;
  children?: Array<IRoute>;
}

export interface IGender {
  label: String;
  value: Number;
}
