import { ModelCount } from "./ModelCount";
import { ModelDeleteOne } from "./ModelDeleteOne";
import { ModelExists } from "./ModelExists";
import { ModelFind } from "./ModelFind";
import { ModelFindOne } from "./ModelFindOne";
import { ModelInsertOne } from "./ModelInsertOne";
import { ModelSearchQuery } from "./ModelSearchQuery";
import { ModelSetPopulateMany } from "./ModelSetPopulateMany";
import { ModelSetPopulateOne } from "./ModelSetPopulateOne";
import { ModelUpdateOne } from "./ModelUpdateOne";

export type Model<T> = {
  table: string;
  fields: (keyof T)[];
  find: ModelFind<T>;
  findOne: ModelFindOne<T>;
  count: ModelCount<T>;
  exists: ModelExists<T>;
  insertOne: ModelInsertOne<T>;
  updateOne: ModelUpdateOne<T>;
  deleteOne: ModelDeleteOne<T>;
  searchQuery: ModelSearchQuery<T>;
  setPopulateMany: ModelSetPopulateMany<T>;
  setPopulateOne: ModelSetPopulateOne<T>;
};
