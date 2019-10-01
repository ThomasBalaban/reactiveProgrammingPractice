import * as _ from 'lodash';

export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_AVAILABLE';
export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';
export interface IObserver {
    notify(data: any);
}

interface ISubject {
    registerObserver(eventType: string, obs: IObserver);
    unregisterObserver(eventType: string, obs: IObserver);
    notifyObservers(eventType: string, data: any);
}

class EventBus implements ISubject {

    private observers: {[key: string]: IObserver[]} = {};

    registerObserver(eventType: string, obs: IObserver) {
        this.observersPerEventType(eventType).push(obs);
    }

    unregisterObserver(eventType: string, obs: IObserver) {
        _.remove(this.observersPerEventType(eventType), el => el === obs); // el => el === obs -- returning true or false where the obs passed matches one of the elements exactly
    }

    notifyObservers(eventType: string, data: any) {
        this.observersPerEventType(eventType).forEach(obs => obs.notify(data));
    }

    private observersPerEventType(eventType: string): IObserver[] {
        const observersPerType = this.observers[eventType];
        if(!observersPerType) {
            this.observers[eventType] = [];
        }

        return this.observers[eventType]
    }

}

export const globalEventBus = new EventBus();
