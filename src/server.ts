import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Travelers gather server in running so fast on ${5000}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
