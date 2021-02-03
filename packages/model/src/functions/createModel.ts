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

export const createModel = <T>(
  table: string,
  fields: (keyof T & string)[],
  getPrimaryKey: (props: T) => Partial<T>,
  ignoreKeys: ModelIgnoreKeys<T> | null = null
): Model<T> => {
  const find = createFind<T>(table, ignoreKeys);
  const findOne = createFindOne<T>(table, ignoreKeys);
  const count = createCount<T>(table);
  const exists = createExists<T>(count);
  const insertOne = createInsertOne<T>(table, ignoreKeys);
  const updateOne = createUpdateOne<T>(table, getPrimaryKey, ignoreKeys);
  const deleteOne = createDeleteOne<T>(table, getPrimaryKey);
  const model: Model<T> = {
    table,
    fields,
    find,
    findOne,
    count,
    exists,
    insertOne,
    updateOne,
    deleteOne,
  };
  model.searchQuery = createSearchQuery<T>(model);
  return model;
};
