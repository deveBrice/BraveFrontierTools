import { IElementPictures } from './iElementPictures.interface';
import { IGender } from './iGender.interface';
import { IUnit } from './iUnit.interface';
import { IAnimationBattle } from './iAnimationBattle.interface';
import { IIdentity } from './iIdentity.interface';
import { iHitCountInformation } from './iHitCountInformation.interface';
import { IStats } from './iStats.interface';
import { ISpecialAttacks } from './iSpecialAttacks.interface';
import { IEvolves } from './iEvolves.interface';
import { IHowToObtain } from './iHowToObtain.interface';

export interface IUnitDtails {
    id: number;
    name: string;
    elementPicture: IElementPictures;
    gender: IGender;
    unit: IUnit
    color: string;
    animationBattle: Array<IAnimationBattle>;
    summonDescription: string;
    evolveDescription: string;
    fusionDescription: string;
    lore: string;
    identity: IIdentity;
    hitCountInformation: iHitCountInformation;
    stats: Array<IStats>;
    specialsAttacks: ISpecialAttacks;
    evolves: IEvolves;
    howToObtain: Array<IHowToObtain>;
}