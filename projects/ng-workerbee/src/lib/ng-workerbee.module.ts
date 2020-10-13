import { NgModule } from '@angular/core';
import { NgWorkerbeeComponent } from './ng-workerbee.component';
import {
  InitWorker,
  BuildWorkerFunction,
  PostToWorker,
  WorkerHelper,
} from './utils';
export {
  InitWorker,
  BuildWorkerFunction,
  PostToWorker,
  BuildMessage,
  WorkerHelper,
} from './utils';

@NgModule({
  declarations: [NgWorkerbeeComponent],
  imports: [],
  providers: [WorkerHelper],
  exports: [NgWorkerbeeComponent],
})
export class NgWorkerbeeModule {}
