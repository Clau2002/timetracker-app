import { Moment } from "moment";
import { TimeEntry } from "./timeentry.interface";
import * as moment from "moment";

export interface Stage {
    id?: number;
    projectId?: number;
    name?: string;
    description?: string;
    status?: string;
    deadline?: string;
    timeEntries?:TimeEntry[];
}