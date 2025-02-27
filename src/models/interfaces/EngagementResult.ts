import { EngagementQuestionAnswer } from './EngagementQuestionAnswer';

export interface EngagementResult {
    id: string;
    person_id: string;
    engagement_id: string;
    submitted: boolean;
    question_answers: EngagementQuestionAnswer[];
} 