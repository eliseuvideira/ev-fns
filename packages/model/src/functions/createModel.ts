import { createSearchQuery } from "./createSearchQuery";
import { createCount } from "./createCount";
import { createDeleteOne } from "./createDeleteOne";
import { createExists } from "./createExists";
import { createFind } from "./createFind";
import { createFindOne } from "./createFindOne";
import { createInsertOne } from "./createInsertOne";
import { createUpdateOne } from "./createUpdateOne";
import { ModelIgnoreKeys } from "../common/ModelIgnoreKeys";
import { Model } from "../common/Model";
import { PopulateOneCallback } from "../common/PopulateOneCallback";
import { PopulateManyCallback } from "../common/PopulateManyCallback";
import { createSetPopulateMany } from "./createSetPopulateMany";
import { createSetPopulateOne } from "./createSetPopulateOne";

export const createModel = <T>(
  table: string,
  fields: (keyof T & string)[],
  getPrimaryKey: (props: T) => Partial<T>,
  ignoreKeys: ModelIgnoreKeys<T> | null = null
): Model<T> => {
  const populatesOne = new Map<string, PopulateOneCallback<T>>();
  const populatesMany = new Map<string, PopulateManyCallback<T>>();

  const find = createFind<T>(table, ignoreKeys, populatesMany);
  const findOne = createFindOne<T>(table, ignoreKeys, populatesOne);
  const count = createCount<T>(table);
  const exists = createExists<T>(count);
  const insertOne = createInsertOne<T>(table, ignoreKeys);
  const updateOne = createUpdateOne<T>(table, getPrimaryKey, ignoreKeys);
  const deleteOne = createDeleteOne<T>(table, getPrimaryKey);
  const searchQuery = createSearchQuery<T>(find, count);
  const setPopulateOne = createSetPopulateOne(populatesOne);
  const setPopulateMany = createSetPopulateMany(populatesMany);

  return {
    table,
    fields,
    find,
    findOne,
    count,
    exists,
    insertOne,
    updateOne,
    deleteOne,
    searchQuery,
    setPopulateOne,
    setPopulateMany,
  };
};
