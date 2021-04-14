import Article from "./components/Article.js";
import App from "./components/App";
import Home from "./components/Home";
import Host from "./components/Host";

export const defaultRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/user",
    component: App,
    exact: true,
  },
  {
    path: "/host",
    component: Host,
    exact: true,
  },
  {
    path: "/article/:id",
    component: Article,
  },
];
/* for nested routes */
const routes = [
  {
    path: "/",
    component: App,
    routes: defaultRoutes,
  },
];

export default defaultRoutes;
