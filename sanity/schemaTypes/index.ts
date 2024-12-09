import { type SchemaTypeDefinition } from "sanity";
import sport from "./sport";
import team from "./team";
import pageInfo from "./pageInfo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sport, team, pageInfo],
};
