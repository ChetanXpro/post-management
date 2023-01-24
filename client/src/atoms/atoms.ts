import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isLoggedInAtom = atom<boolean>(false);
export const user = atom<any>({});
