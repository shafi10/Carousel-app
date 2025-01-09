import express from "express";
import { getMetafield } from "../controllers/getMetafield.js";
import { creteMetafield } from "../controllers/createMetafield.js";

const router = express.Router();

router.get("/", getMetafield);
router.post("/", creteMetafield);

export default router;
