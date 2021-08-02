import { Knex } from "knex";
import { FilterProps } from "../common/FilterProps";
import { applyGe } from "./applyGe";
import { applyGt } from "./applyGt";
import { applyIn } from "./applyIn";
import { applyLe } from "./applyLe";
import { applyLike } from "./applyLike";
import { applyLt } from "./applyLt";
import { orderByToSnake } from "./orderByToSnake";

export const applyFilter = <T>(
  builder: Knex.QueryBuilder,
  filter: FilterProps<T>,
): void => {
  if (filter.$ge) {
    applyGe(builder, filter.$ge);
  }
  if (filter.$gt) {
    applyGt(builder, filter.$gt);
  }
  if (filter.$le) {
    applyLe(builder, filter.$le);
  }
  if (filter.$lt) {
    applyLt(builder, filter.$lt);
  }
  if (filter.$like) {
    applyLike(builder, filter.$like);
  }
  if (filter.$in) {
    applyIn(builder, filter.$in);
  }
  if (filter.$limit) {
    builder.limit(filter.$limit);
  }
  if (filter.$offset) {
    builder.offset(filter.$offset);
  }
  if (filter.$sort) {
    builder.orderBy(orderByToSnake(filter.$sort));
  }
};
