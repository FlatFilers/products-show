import { Action } from "@prisma/client";
import { DateTime } from "luxon";

export const serializeFilefeedEvents = (actions: Action[]) => {
  return actions.map((a) => {
    return {
      topic: (a.metadata as { topic: string }).topic,
      when: DateTime.fromJSDate(a.createdAt).toFormat("MM/dd/yyyy hh:mm:ssa"),
    };
  });
};
