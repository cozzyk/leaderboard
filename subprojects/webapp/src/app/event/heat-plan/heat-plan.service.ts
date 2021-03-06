import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs';

import { HeatPlan } from './heat-plan';

@Injectable()
export class HeatPlanService {

    constructor(private http: Http) {}

    public getPlan(competitionId: number, eventId: number): Observable<HeatPlan> {
        return this.http.get(`api/competitions/${competitionId}/events/${eventId}/heats`).map((res) => res.json());
    }

    public savePlan(competitionId: number, plan: HeatPlan): Observable<HeatPlan> {
        return this.http.post(`api/competitions/${competitionId}/events/${plan.event.id}/heats`, JSON.stringify(plan), {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).map((res) => res.json());
    }

    public copyFromPreviousEvent(competitionId: number, plan: HeatPlan): Observable<HeatPlan> {
        return this.http.post(`api/competitions/${competitionId}/events/${plan.event.id}/heats/copy`,
            JSON.stringify(plan)).map((res) => res.json());
    }

    public fillByRanking(competitionId: number, plan: HeatPlan) {
        return this.http.post(`api/competitions/${competitionId}/events/${plan.event.id}/heats/byRank`,
            JSON.stringify(plan)).map((res) => res.json());
    }

    public merge(competitionId: number, plan: HeatPlan) {
        return this.http.post(`api/competitions/${competitionId}/events/${plan.event.id}/heats/merge`,
            JSON.stringify(plan)).map((res) => res.json());
    }
}
