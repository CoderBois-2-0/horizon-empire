import { createRouter } from "./util";
import publicRouter from "./publicRouter";
import protectedRouter from "./protectedRouter";

const app = createRouter().route("/", publicRouter).route("/", protectedRouter);

export default app;
