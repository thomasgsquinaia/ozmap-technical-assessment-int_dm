import { Router } from "express";
import * as controllerRegions from '../controllers/regions';
const router = Router();

router.get("/", controllerRegions.getRegions);
router.get("/distance", controllerRegions.getRegionsDistance);
router.get("/:lat/:lng/specific", controllerRegions.getRegionsSpecificPoint);
router.get("/:id", controllerRegions.getRegionById);
router.post("/", controllerRegions.createRegion);
router.put("/:id", controllerRegions.updateRegion);
router.delete("/:id", controllerRegions.deleteRegion);

export default router;