import {
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Subject } from 'rxjs';
import * as utils from './index';
import { workerMessageFormat } from './workerMessageFormat';
//TODO: write better unit tests...

describe('NgWorkerbeeService', () => {
  let BuildMessage = utils.BuildMessage;
  let BuildWorkerFun = utils.BuildWorkerFunction;
  let InitWorker = utils.InitWorker;
  let PostToWorker = utils.PostToWorker;
  let WorkerHelper = utils.WorkerHelper;
  let worker;

  let logTest = function (item): Promise<any> {
    return new Promise((resolve) => {
      if (valCompare(item)) {
        console.log(item.logVal);
      }
      resolve('resolving with: ' + item.logVal);
    });
  };

  let testVal = { val: 'not set', sub: new Subject<any>() };


  beforeEach((done) => {
    let testValFunction = function (data, that) {
      that.sub.next(data.data);
      console.log('and the value is: ', data.data, that);
      done();
    };
    testVal.sub.subscribe({
      next: (d) => {
        testVal.val = d;
      },
    });
    worker = InitWorker(testValFunction, testVal);
    PostToWorker(
      worker,
      BuildMessage(
        logTest,
        {
          logVal: 'workerbee works!',
        },
        [valCompare]
      )
    );
  });

  it('should be created', () => {
    console.log('test1')
    expect(BuildMessage).toBeTruthy();
    expect(BuildWorkerFun).toBeTruthy();
    expect(InitWorker).toBeTruthy();
    expect(PostToWorker).toBeTruthy();
    expect(WorkerHelper).toBeTruthy();
    expect(workerMessageFormat).toBeTruthy();
  });
  it('InitWorker should return a worker', () => {
    console.log('test2')
    expect(worker instanceof Worker).toBeTrue();
  });
  it('worker should return proper value', () => {
console.log('here it is')
      expect(testVal.val).toEqual('resolving with: workerbee works!') 
  });
});

export function valCompare(item) {
  if (item.logVal === 'workerbee works!') {
    return true;
  } else {
    return false;
  }
}
