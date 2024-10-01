import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/auth/signup", UserControllers.createSingleUser);
router.get("/auth/users", UserControllers.getUsers);

export const UserRouters = router;
