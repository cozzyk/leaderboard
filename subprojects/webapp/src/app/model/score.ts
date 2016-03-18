import {Competitor} from './competitor';
import {Event} from './event';

export interface Score {
    id?: number;
    event: Event;
    competitor: Competitor;
    scaled: boolean;
    score?: number;
}