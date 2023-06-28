import {createContext} from "react";
import {BrowseJobEntryData} from "../types/types/BrowseJobEntryData";

const JobEntriesContext = createContext<BrowseJobEntryData[] | null>(null);
export default JobEntriesContext;
