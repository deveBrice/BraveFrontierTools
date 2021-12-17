import { IBbValueDetails } from './iBb-value-details.interface';

export interface IBbInformation {
    title: string;
    description: string;
    bbValueDetails: Array<IBbValueDetails>;
}