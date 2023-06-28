import { createContext } from "react";
import {BrowseJobEntryData} from "../types/types/BrowseJobEntryData";

const JobEntryContext = createContext<BrowseJobEntryData | null>(null);
export default JobEntryContext;
