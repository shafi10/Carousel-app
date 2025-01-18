import express from "express";
import {
  getCollectionsController,
  getSelectedCollectionsController,
} from "../controllers/collectionsController.js";

const router = express.Router();

router.get("/list", getCollectionsController);
router.get("/selectedList", getSelectedCollectionsController);

export default router;
