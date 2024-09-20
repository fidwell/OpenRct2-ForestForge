/// <reference path="../lib/openrct2.d.ts" />

import { startup } from "./startup";

registerPlugin({
  name: "ForestForge",
  version: "1.0",
  authors: ["fidwell"],
  type: "remote",
  licence: "MIT",
  targetApiVersion: 99,
  main: startup,
});
