const authRouter = require("./auth.router");

const routers = (app) => {
  app.use("/auth", authRouter);
};

module.exports = routers;
