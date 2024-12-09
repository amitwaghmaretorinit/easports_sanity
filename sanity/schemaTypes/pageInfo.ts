import { defineType } from "sanity";

export default defineType({
  name: "pageInfo",
  type: "document",
  fields: [
    {
      type: "string",
      name: "pageTitle",
    },
  ],
});
