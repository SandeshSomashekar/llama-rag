import { Router } from "express";
import queryController from "../controllers/queryController.mjs";

const basicRouter = Router();
basicRouter.post('/rag', queryController);

export default basicRouter;