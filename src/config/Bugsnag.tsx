import React from "react";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

Bugsnag.start({
  apiKey: process.env.NEXT_PUBLIC_BUGSNAG_KEY!,
  plugins: [new BugsnagPluginReact()],
});

export const ErrorBoundary =
  Bugsnag.getPlugin("react")!.createErrorBoundary(React);
