import { atomWithStorage } from "jotai/utils";

export const AccountAtom = atomWithStorage<string | null>("account", null);
