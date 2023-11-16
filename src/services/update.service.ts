import { UpdateQuery } from "mongoose";

// Return update object
export function mutateUpdate<T>(changes: T): UpdateQuery<T> {
    const update: UpdateQuery<T> = {};

  for (const [key, value] of Object.entries(changes as unknown as object)) {
    if (value !== undefined) {
      update[key] = value;
    }
  }

  return update
}