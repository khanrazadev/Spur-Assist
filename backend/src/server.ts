import "dotenv/config";
import { runMigrations } from "./db/migrations.js";
import { app } from "./app.js";
import { env } from "node:process";


//  MUSTRUN BEFOREE
runMigrations();

app.listen(env.PORT, () => {
  console.log(`Spur Assist backend running on port ${env.PORT}`);
});
