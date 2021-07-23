import { useContext } from "react";
import { InfoContext } from "./InfoProvider";

export default function useInfo() {
  return useContext(InfoContext);
}
