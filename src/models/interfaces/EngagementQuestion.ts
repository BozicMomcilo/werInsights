import { EngagementAnswer } from './EngagementAnswer';
import { EngagementType } from './EngagementType';
import { LocalizedString } from './LocalizedString';

export interface EngagementQuestion {
    id: string;
    ordinal: number;
    answers: EngagementAnswer[];
    type: EngagementType;
    text?: LocalizedString;
} 