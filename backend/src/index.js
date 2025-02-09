// Dependencies
import dotenv from "dotenv";
import app from "./app.js";

// configure environment variables
dotenv.config({ path: "./.env" });

// configuration
const { PORT } = process.env;

// check if app is ready to run
app.on("error", (error) => {
  console.log("Application isn't ready to run");
  throw error;
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
