import { Router } from "express";
import PostControllers from "./post.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth(), PostControllers.createPost);

export const PostRouters = router;
