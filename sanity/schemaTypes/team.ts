import { defineType } from "sanity";

export default defineType({
  name: "team",
  title: "Team",
  type: "document",
  fields: [
    {
      name: "teamName",
      type: "string",
      title: "Team Name",
    },
    {
      name: "teamSport",
      type: "reference",
      to: [
        {
          type: "sport",
        },
      ],
      title: "Sport",
    },
    {
      name: "teamLogo",
      type: "image",
    },
  ],
});
