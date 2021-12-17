import { ILsValueDetails } from './iLs-value-details.interface';

export interface ILsInformation {
    title: string;
    description: string;
    lsValueDetails: Array<ILsValueDetails>;
}