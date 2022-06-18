import { ServerResponse } from "http";
import { writeOutput } from "../utils/utils";
import { INTERNAL_ERROR } from "./errors";

export const ErrorHandler = (err: Error, res: ServerResponse) => {
  console.error(err);
  writeOutput(500, res, INTERNAL_ERROR);
};
