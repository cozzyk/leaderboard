import {Component, OnInit, ViewChild} from 'angular2/core';
import {RouteParams, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Competition, Model} from '../model/model';
import {CompetitionService} from './competition.service';
import {DivisionListComponent} from '../division/division-list.component';
import {CompetitionDashboardComponent} from './competition-dashboard.component';

@Component({
    template: `
        <h1 *ngIf="competition">{{competition.name}}</h1>
        <router-outlet></router-outlet>
    `,
    providers: [Model],
    directives: [DivisionListComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/', name: 'CompetitionDashboard', component: CompetitionDashboardComponent, useAsDefault: true },
    { path: '/divisions', name: 'Divisions', component: DivisionListComponent },
    { path: '/divisions/{divisionId}', name: 'Division', component: null}
])
export class CompetitionComponent implements OnInit {

    @ViewChild(CompetitionSubComponent) view: CompetitionSubComponent;

    competition: Competition;

    constructor(
        private routeParams: RouteParams,
        private competitionService: CompetitionService) {
    }

    ngAfterViewInit() {
        this.view.competition = this.competition;
    }

    ngOnInit () {
        let competitionId = this.routeParams.get('id');
        this.competitionService.get(competitionId).subscribe((competition: Competition) => {
            this.competition = competition
        });
    }
}

export abstract class CompetitionSubComponent {

    competition: Competition;

}