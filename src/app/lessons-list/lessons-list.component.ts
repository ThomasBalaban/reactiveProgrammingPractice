import { Component, OnInit } from '@angular/core';
import { globalEventBus, IObserver, LESSONS_LIST_AVAILABLE } from '../event-bus-experiments/event-bus';
import { ILesson } from '../shared/model/lesson';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
export class LessonsListComponent implements IObserver {

  lessons: ILesson[] = [];

  constructor() {
    console.log('lesson list component is registered as observer..');
    globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);
  }

  ngOnInit() {
  }

  notify(data: ILesson[]) {
    console.log('Lessons list component received', data);
    this.lessons = data;
  }

}
