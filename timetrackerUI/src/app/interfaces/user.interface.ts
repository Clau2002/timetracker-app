import { Project } from './project.interface';

export interface User{
    id?: number;
    username?: string;
    password?: string;
    projects?: Project[];
}