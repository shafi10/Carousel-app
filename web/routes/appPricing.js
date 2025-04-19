import express from "express";
import {
  createAppSubscription,
  cancelAppSubscription,
  getActiveSubscription,
} from "../controllers/appSubscription.js";

const router = express.Router();

router.get("/active-subscriptions", getActiveSubscription);
router.post("/app-billing-create", createAppSubscription);
router.post("/app-billing-cancel", cancelAppSubscription);

export default router;
