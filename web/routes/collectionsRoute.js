import express from "express";
import {
  getCollectionsController,
  creteCollections,
} from "../controllers/collectionsController.js";

const router = express.Router();

router.get("/list", getCollectionsController);
router.post("/create-collection", creteCollections);

export default router;
