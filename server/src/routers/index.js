const authRouter = require("./auth.router");
const userRouter = require("./user.router");

const routers = (app) => {
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
};

module.exports = routers;
