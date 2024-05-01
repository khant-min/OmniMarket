import { app, logger } from "./app.ts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const server = app.listen(8000, () => {
  console.log(process.env.TEST);
  logger.info(`DEV Server  running on port http://localhost:8000`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(async () => {
    logger.info("server closed");
    await prisma.$disconnect();
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
