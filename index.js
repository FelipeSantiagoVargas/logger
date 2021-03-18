const express = require("express");
const app = express();
const port = 3050;

const log4js = require("log4js");
log4js.configure({
  appenders: { servers: { type: "file", filename: "servers.log" } },
  categories: { default: { appenders: ["servers"], level: "all" } },
});

const logger = log4js.getLogger("servers");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/log", (req, res) => {
    console.log(req.body)
  switch (req.body.option) {
    case "info":
      logger.info(req.body.message);
      break;

    case "error":
      logger.error(req.body.message);
      break;

    case "warn":
      logger.warn(req.body.message);
      break;

    case "trace":
      logger.trace(req.body.message);
      break;

    default:
      break;
  }
  res.send("Log modificado correctamente");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
