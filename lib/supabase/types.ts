import { Database } from "./__generated__/types";

type Tables = Database["public"]["Tables"];

export type EntityType<T extends keyof Tables> = Tables[T]["Row"];
