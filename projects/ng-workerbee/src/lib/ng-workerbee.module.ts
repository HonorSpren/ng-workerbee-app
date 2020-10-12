import { NgModule } from '@angular/core';
import { NgWorkerbeeComponent } from './ng-workerbee.component';
import { InitWorker,
BuildWorkerFunction,
PostToWorker,
WorkerHelper,
workerMessageFormat } from './utils'
export { InitWorker,
  BuildWorkerFunction,
  PostToWorker,
  BuildMessage,
  WorkerHelper,
  workerMessageFormat } from './utils'



@NgModule({
  declarations: [NgWorkerbeeComponent],
  imports: [
  ],
  providers:[
    WorkerHelper,
    workerMessageFormat
  ],
  exports: [NgWorkerbeeComponent]
})
export class NgWorkerbeeModule { }
