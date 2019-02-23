import Koa from "koa";
import { registerMiddlewares } from "./middlewares";
import { registerRoutes } from "./routes";

const app = new Koa();

registerMiddlewares(app);
registerRoutes(app);

app.on("error", (err, ctx) => {
  console.warn(err, ctx);
});

export default app.listen(3000);

console.log("Server running on port 3000");
