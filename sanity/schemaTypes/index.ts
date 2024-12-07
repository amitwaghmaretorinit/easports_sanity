import { type SchemaTypeDefinition } from 'sanity'
import sport from './sport'
import team from './team'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sport,team],
}
