import { Router } from "express";
import { UserRouters } from "../modules/user/user.route";
import { PostRouters } from "../modules/post/post.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: UserRouters,
  },
  {
    path: "/post",
    route: PostRouters,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
