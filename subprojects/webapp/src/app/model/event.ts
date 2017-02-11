import { Entity } from './entity';
import { ScoreRecipe } from './score-recipe';

export interface Event extends Entity {
    name: string;
    description: string;
    type: ScoreRecipe;
    scalable: boolean;
}
