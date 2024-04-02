import { Router } from "express";
import * as controllerUsers from '../controllers/users';
const router = Router();

router.get("/", controllerUsers.getUsers);
router.get("/:id", controllerUsers.getUserById);
router.post("/", controllerUsers.createUser);
router.put("/:id", controllerUsers.updateUser);
router.delete("/:id", controllerUsers.deleteUser);

export default router;