import { JobType } from "./jobtype.model";


export class WorkDescription {
    public name: string;
    public type: JobType[];
    public aptNumber?: string[] | string;
    public quantity?: number;
}