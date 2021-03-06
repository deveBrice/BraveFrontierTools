import { IChainEvolves } from './iChainEvolves.interface';
import { IMaterials } from './iMaterials.interface';
import { ICost } from './iCost.interface';

export interface IEvolves {
    chainEvolves: Array<IChainEvolves>;
    materials: Array<IMaterials>;
    cost: ICost;
}