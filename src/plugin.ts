/// <reference path="../lib/openrct2.d.ts" />

import { startup } from "./startup";

registerPlugin({
  name: "ForestForger",
  version: "1.0",
  authors: ["fidwell"],
  type: "remote",
  licence: "MIT",
  targetApiVersion: 98,
  main: startup,
});
