//pages
import Home from "../pages/Home/index.tsx";
import Verify from "../pages/Verify/index.tsx";
import SignUp from "../pages/Authen/SignUp.tsx";
import SignIn from "../pages/Authen/SignIn.tsx";
import Profile from "../pages/Profile/index.tsx";
import Setting from "../pages/Settings/index.tsx";
import Identify from "../pages/Authen/Identify.tsx";
import ResetPassword from "../pages/Authen/ResetPassword.tsx";

//sub pages
import Posts from "../pages/Profile/components/Posts/index.tsx";
import About from "../pages/Profile/components/About/index.tsx";
import Friend from "../pages/Profile/components/Friend/index.tsx";
import Picture from "../pages/Profile/components/Picture/index.tsx";

//layouts
import MainLayout from "../layouts/MainLayout/index.tsx";
import OnlyContentLayout from "../layouts/OnlyContent/index.tsx";

//interfaces
import { IRoute } from "../interfaces/common-interface.ts";

export const publicRoute: IRoute[] = [
  { path: "/auth/sign-in", element: SignIn, layout: OnlyContentLayout },
  { path: "/auth/sign-up", element: SignUp, layout: OnlyContentLayout },
  {
    path: "/auth/identify",
    element: Identify,
    layout: MainLayout,
  },
  {
    path: "/auth/reset-password",
    element: ResetPassword,
    layout: OnlyContentLayout,
  },
];

export const privateRoute: IRoute[] = [
  { path: "/", element: Home, layout: MainLayout },
  { path: "/settings", element: Setting, layout: MainLayout },
  { path: "/verify", element: Verify, layout: OnlyContentLayout },
  {
    path: "/profile",
    element: Profile,
    layout: MainLayout,
    children: [
      { path: "", element: Posts },
      { path: "about", element: About },
      { path: "friends", element: Friend },
      { path: "picture", element: Picture },
    ],
  },
];
