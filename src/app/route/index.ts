import { Router } from "express";
import { UserRouters } from "../modules/user/user.route";
import { PostRouters } from "../modules/post/post.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
