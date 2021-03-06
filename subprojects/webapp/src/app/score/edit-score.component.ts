import {
     Component,
     OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModelService } from '../model/model';
import { Score } from '../model/model';
import { PartialScore } from '../model/partial-score';
import { ScoreService } from '../services/score.service';

@Component({
    templateUrl: './edit-score.component.html',
    styleUrls: ['./edit-score.component.css']
})
export class EditScoreComponent implements OnInit {

    public score: Score;

    constructor(
        private scoreService: ScoreService,
        private route: ActivatedRoute,
        private router: Router,
        private modelService: ModelService) {
    }

    public ngOnInit() {
        this.modelService.onCompetitionUpdate.map((competition) => {
            return {
                competitionId: competition.id
            };
        }).zip(this.route.params, Object.assign).subscribe((params) => {
            let competitionId = params['competitionId'];
            let eventId = params['eventId'];
            let competitorId = params['competitorId'];
            this.scoreService.getScore(competitionId, eventId, competitorId).subscribe((score) => {
                this.score = score;
            });
        });
    }

    public onSubmit() {
        this.scoreService.addScore(this.score).subscribe(() => {
            this.navigateBack();
        });
    }

    public abort() {
        this.navigateBack();
    }

    public setScore(name: string, score: PartialScore) {
        if (score) {
            this.score.parts[name] = score;
        } else {
            delete this.score.parts[name];
        }
    }

    public getScore(name: string) {
        return this.score.parts[name];
    }

    private navigateBack() {
        this.router.navigate(['scores'], {
            relativeTo: this.route.parent.parent,
            queryParams: {
                event: this.score.event.id
            }
        });
    }
}
