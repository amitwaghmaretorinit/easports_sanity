import { defineType } from "sanity";

export default defineType({
  name: "sport",
  title: "Sport",
  type: "document",
  fields: [
    {
      name: "sportName",
      type: "string",
      title: "Sport Name",
    },
    {
      name: "sportHeader",
      type: "string",
      title: "Sport Title",
    },
    {
      name: "sportIcon",
      type: "image",
    },
  ],
});
