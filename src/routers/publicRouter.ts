import { createRouter } from "./index";
import authRouter from "./authRouter/index";

const router = createRouter().route("/auth", authRouter);

export default router;
