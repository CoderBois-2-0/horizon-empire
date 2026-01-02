import { createRouter } from "./util";
import authRouter from "./authRouter/index";

const router = createRouter().route(authRouter.path, authRouter.publicRouter);

export default router;
