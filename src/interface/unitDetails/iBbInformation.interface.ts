import { IBbValueDetails } from './iBbValueDetails.interface';

export interface IBbInformation {
    title: string;
    description: string;
    bbValueDetails: Array<IBbValueDetails>;
}