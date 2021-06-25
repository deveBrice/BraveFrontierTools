import { ILsValueDetails } from './iLsValueDetails.interface';

export interface ILsInformation {
    title: string;
    description: string;
    lsValueDetails: Array<ILsValueDetails>;
}