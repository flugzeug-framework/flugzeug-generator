import { migrate } from "flugzeug";
import { db } from "@/db";

(async function() {
  await migrate(db);
})();
