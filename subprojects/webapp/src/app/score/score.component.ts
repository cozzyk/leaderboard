import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap';

import {
    ModelService,
    Event,
    Score,
    Division
} from '../model/model';

import { EditScoreComponent } from './score-edit.component';
import { ScoreService } from '../services/score.service';
import { EventBus } from '../services/eventbus';

@Component({
    templateUrl: './score.component.html',
    styles: [`
        .clickable {
            cursor: pointer;
        }
    `],
    providers : [ScoreService],
})
export class ScoreComponent implements OnInit {

    public events: Event[] = [];
    public divisions: Division[] = [];
    public event: string = '';
    public scores: Score[] = [];
    public query: string = '';
    public division: string = 'all';
    public onlyUnset: boolean = false;

    @ViewChild(ModalDirective) public $modal: ModalDirective;
    @ViewChild(EditScoreComponent) public $edit: EditScoreComponent;

    constructor(
        private modelService: ModelService,
        private scoreService: ScoreService,
        private eventBus: EventBus) {
        this.eventBus.on('score.updated').subscribe((score) => {
            this.updateScores(score.event.id);
        });
    }

    public selectScore(score: Score) {
        this.$edit.score = score;
        this.$modal.show();
    }

    public ngOnInit() {
        this.modelService.onCompetitionUpdate.subscribe((competition) => {
            this.events = competition.events
            if (this.events.length > 0) {
                this.event = competition.events[0].id.toString();
                this.divisions = competition.divisions;
                this.updateScores(+this.event);
            }
        });
    }

    public eventChanged(e: number) {
        this.updateScores(e);
    }

    public updateScores(eventId: number) {
        this.scoreService.getScoresForEvent(eventId).subscribe((scores) => {
            this.scores = scores;
        });
    }
}
