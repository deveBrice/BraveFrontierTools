import { IElementPictures } from './iElement-pictures.interface';
import { IGender } from './iGender.interface';
import { IUnit } from './iUnit.interface';
import { IAnimationBattle } from './iAnimation-battle.interface';
import { IIdentity } from './iIdentity.interface';
import { iHitCountInformation } from './iHit-count-information.interface';
import { IStats } from './iStats.interface';
import { ISpecialAttacks } from './iSpecial-attacks.interface';
import { IEvolves } from './iEvolves.interface';
import { IHowToObtain } from './iHow-to-obtain.interface';

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