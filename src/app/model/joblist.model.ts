import { WorkDescription } from "./workdescription.model";
import { WorkType } from "./worktype.model";

export class JobList {
    public date: {startDate: Date | string, endDate: Date | string};
    public dateRange?: Date[];
    public email?: string;
    public company: string;
    public address: string;
    public type: WorkDescription[];
    public phone: number;
    public aptNumber?: string[];
    public rate?: number;
    public amount?: number;
    public id?: number;

}