import { makeMigration } from "flugzeug";
import { db } from "@/db";

(async function() {
  await makeMigration(db);
})();
