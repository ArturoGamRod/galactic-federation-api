import { Router } from "express";
import * as topSecretController from "./controllers/topSecret/topSecret.controller";
import * as topSecretSplitController from "./controllers/topSecretSplit/topSecretSplit.controller"

const router = Router();

// router.get("/",appController.)
router.post("/topsecret",topSecretController.getResult)
router.post("/topsecret_split/:satellite_name",topSecretSplitController.saveSatellite)
router.get("/topsecret_split",topSecretSplitController.getResult)
router.delete("/topsecret_split",topSecretSplitController.deleteAll)


export default router;