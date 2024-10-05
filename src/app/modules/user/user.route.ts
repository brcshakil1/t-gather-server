import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/auth/signup", UserControllers.createSingleUser);
router.get("/auth/users", UserControllers.getUsers);
router.put("/:targetedUserId", UserControllers.addFollower);

export const UserRouters = router;
