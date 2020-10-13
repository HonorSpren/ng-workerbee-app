import { Component } from '@angular/core';
import {
  InitWorker,
  workerMessageFormat,
  PostToWorker,
  BuildMessage,
} from 'ng-workerbee';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-workerbee-app';
  data: MessageEvent;
  dataSubject = new Subject<MessageEvent>();
  testWorker: Worker;
  constructor() {
    this.dataSubject.subscribe({
      next: (d) => this.data = d
    })
    this.testWorker = InitWorker(this.logData, this);
  }
  logData = function (data: MessageEvent, that: AppComponent) {
    that.dataSubject.next(data)
    console.log(`initWorker got message: ${data.data}`);
  };
  ngAfterContentInit() {
    PostToWorker(
      this.testWorker,
      BuildMessage(this.logTest,
        {logVal: 'workerbee works!'},
        [valCompare]
      )
    );
  }

  logTest(item): Promise<any> {
    return new Promise((resolve) => {
      if (valCompare(item)) {
        resolve('resolving with: ' + item.logVal);
      }
    });
  }
}
export function valCompare(item): boolean {
  if (item.logVal === 'workerbee works!') {
    return true;
  } else {
    return false;
  }
}
