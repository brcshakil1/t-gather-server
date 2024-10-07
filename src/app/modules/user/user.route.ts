import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "./../../middlewares/auth";

const router = Router();

router.post("/auth/signup", UserControllers.createSingleUser);
router.get("/auth/users", auth(), UserControllers.getUsers);
router.put("/:targetedUserId", auth(), UserControllers.addFollower);
router.patch(
  "/:userId/password/change",
  auth(),
  UserControllers.changingPassword
);
router.patch("/:userId", auth(), UserControllers.updateUserInformation);

export const UserRouters = router;
