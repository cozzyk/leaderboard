import {
    Component,
    OnInit
} from 'angular2/core';

import {
    ModelService,
    Event
} from '../model/model';

import {
    MODAL_DIRECTIVES
} from '../tools/tools';

import {
    CreateEvent
} from './create-event.component'

@Component({
    selector: 'event-list',
    template: `
        <modal #modal>
            <modal-header>
                <h3>Create event</h3>
            </modal-header>
            <modal-body>
                <create-event (onCreated)="modal.hide()"></create-event>
            </modal-body>
        </modal>
        <button class="btn btn-default" (click)="modal.open()">Create new</button>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#event of events; #i = index">
                        <td width="5%">{{ i + 1 }}</td>
                        <td>{{ event.name }}</td>
                        <td>{{ event.type.name }}</td>
                        <td>{{ event.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    directives: [CreateEvent, MODAL_DIRECTIVES]
})
export class EventList implements OnInit {

    events: Event[];

    constructor(private service: ModelService) {
    }

    ngOnInit() {
        this.service.onCompetitionUpdate.subscribe(comp => {
            this.events = comp.events;
        });
    }
}
