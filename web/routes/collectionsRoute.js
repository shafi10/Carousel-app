import express from "express";
import { getCollectionsController } from "../controllers/collectionsController.js";

const router = express.Router();

router.get("/list", getCollectionsController);

export default router;
