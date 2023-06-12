import { logger } from "react-native-logs";

var config = {
  severity: "debug",
  transport: function (opts) {
    // Print to console
    console.log(opts.msg);
    console.log("Stack trace:", opts.stack);
  },
  transportOptions: {
    color: "white",
  },
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  async: true,
  dateFormat: "TIME",
  printLevel: true,
  printDate: true,
  enabled: true,
};

var log = logger.createLogger(config);

export default log;
