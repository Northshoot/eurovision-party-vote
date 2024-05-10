// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Party, User, Vote, Winner } = initSchema(schema);

export {
  Party,
  User,
  Vote,
  Winner
};