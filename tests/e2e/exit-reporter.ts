import type {
  FullResult,
  Reporter,
} from "@playwright/test/reporter";

class ExitReporter implements Reporter {
  onEnd(result: FullResult) {
    setTimeout(() => {
      process.exit(result.status === "passed" ? 0 : 1);
    }, 0);
  }
}

export default ExitReporter;
