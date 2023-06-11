import { Project } from './project.interface';

export interface User{
    id?: number;
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    projects?: Project[];
    token?: string;
}