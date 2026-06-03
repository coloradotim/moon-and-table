import {
  createContentReachabilityReport,
  formatContentReachabilityReport,
} from "../src/lib/content-reachability";

const report = createContentReachabilityReport();

console.log(formatContentReachabilityReport(report));
