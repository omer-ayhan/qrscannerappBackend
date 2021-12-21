import express from "express";
import cors from "cors";
import {
  getOrders,
  createPacked,
  getPackedOrders,
} from "../controllers/shopifyFunctions.js";

const router = express.Router();

router.get("/orders", cors(), getOrders);

router.get("/getpacked", getPackedOrders);

router.get("/packed", createPacked);

router.use("/", (_, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

export default router;
