import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { server } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`⚙️ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("🔴 MONGO DB connection failed !!!", err);
  });
