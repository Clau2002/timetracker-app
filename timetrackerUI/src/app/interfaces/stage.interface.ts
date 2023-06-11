import { TimeEntry } from "./timeentry.interface";

export interface Stage {
    id?: number;
    projectId?: number;
    name?: string;
    description?: string;
    status?: string;
    deadline?: Date;
    timeentries?:TimeEntry[];
}