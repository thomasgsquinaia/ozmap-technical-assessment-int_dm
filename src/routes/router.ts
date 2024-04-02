import { Router } from "express";
import users from './users';
import regions from './regions';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../docs/swagger.json';
const router = Router();

router.use("/users", users);
router.use("/regions", regions);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;