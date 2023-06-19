import { Project } from './project.interface';

export interface User{
    id?: number;
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    projects?: Project[];
    token?: string;
}