import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { TaskSlideEnum } from '../core/models/task-slide.enum';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {

  @ViewChild(IonSlides) slides: IonSlides;

  currentView = TaskSlideEnum.Daily;

  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.slides);
  }


  slideChanged() {
    const currentIndexPromise = this.slides.getActiveIndex();

    currentIndexPromise.then(currentIndex => {
      this.currentView = currentIndex;
    });
  }

  onCurrentViewChange(event) {
    this.currentView = (Number(event.detail.value));

    this.slides.slideTo(this.currentView, 400);
  }
}
