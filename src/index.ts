import * as core from "@actions/core";
import { globSync } from "glob";
import { createTestCppSolutionTasks } from "leettest";
import { Listr, ListrTask } from "listr2";

try {
  const solutionFiles = globSync("**/solution.cpp").sort();
  const task = new Listr(
    solutionFiles.map(
      (solutionFile): ListrTask => ({
        title: `Testing ${solutionFile}...`,
        task: (_, task) =>
          task.newListr(createTestCppSolutionTasks(solutionFile), {
            ctx: {},
            concurrent: false,
            exitOnError: true,
          }),
      }),
    ),
    {
      concurrent: true,
      exitOnError: false,
      collectErrors: "minimal",
      rendererOptions: {
        collapseErrors: false,
        removeEmptyLines: false,
      },
    },
  );
  await task.run();
  if (task.errors.length > 0) {
    core.setFailed(`failed to test ${task.errors.length} solutions`);
  }
} catch (err) {
  core.setFailed(err);
}
