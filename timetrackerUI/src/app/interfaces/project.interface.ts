import { Stage } from './stage.interface';

export interface Project {
    id?: number;
    userId?: number;
    name?: string;
    description?: string;
    projectStatus?: number;
    stages?: Stage[];
}