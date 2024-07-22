const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const friendShipRouter = require("./friendship.router");

const routers = (app) => {
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/friendship", friendShipRouter);
};

module.exports = routers;
