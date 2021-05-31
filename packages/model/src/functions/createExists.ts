import { ModelCount } from "../common/ModelCount";
import { ModelExists } from "../common/ModelExists";

export const createExists =
  <T>(count: ModelCount<T>): ModelExists<T> =>
  async (database, filter = null, modify = null): Promise<boolean> => {
    const rowNumber = await count(database, filter, modify);
    return rowNumber > 0;
  };
