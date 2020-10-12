import { Component } from '@angular/core';
import {
  InitWorker,
  workerMessageFormat,
  PostToWorker,
  BuildMessage,
} from 'ng-workerbee';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-workerbee-app';
  testWorker;
  data: MessageEvent;
  constructor() {
    this.testWorker = InitWorker(this.logData, this);
  }
  logData = function (data, that) {
    that.data = data
    console.log(`initWorker got message: ${data.data}`);
  };
  ngAfterContentInit() {
    PostToWorker(
      this.testWorker,
      BuildMessage([valCompare], this.logTest, {
        logVal: 'workerbee works!',
      })
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
export function valCompare(item) {
  if (item.logVal === 'workerbee works!') {
    return true;
  } else {
    return false;
  }
}
