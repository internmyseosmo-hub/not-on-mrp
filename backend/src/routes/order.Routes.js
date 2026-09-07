import express from "express";
import {
  createOrder,
  getOrders,
  deleteOrder,
} from "../controllers/order.Controller.js";

const router = express.Router();

router.route("/").post(createOrder).get(getOrders);
router.route("/:id").delete(deleteOrder);

export default router;
