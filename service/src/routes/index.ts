import { Router, NextFunction } from "express";
import UserRoute from "./UserRoute";
import ProtectedRoute from "./ProtectedRoute";

const router = Router();

router.use("/user", UserRoute);

router.use("/protected", ProtectedRoute);

export default router;