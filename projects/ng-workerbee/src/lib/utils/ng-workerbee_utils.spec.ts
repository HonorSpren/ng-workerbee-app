import { TestBed } from '@angular/core/testing';
import * as utils from './index';

//TODO: write better unit tests...

describe('NgWorkerbeeService', () => {
  let BuildMessage = utils.BuildMessage;
  let BuildWorkerFun = utils.BuildWorkerFunction;
  let InitWorker = utils.InitWorker;
  let PostToWorker = utils.PostToWorker;
  let WorkerHelper = utils.WorkerHelper;
  let workerMessageFormat = utils.workerMessageFormat;
  let worker;
  let logTest = function (item): Promise<any> {
    return new Promise((resolve) => {
      if (valCompare(item)) {
        console.log(item.logVal);
      }
      resolve('resolving with: ' + item.logVal);
    });
  };
  let valCompare = function (item) {
    if (item.logVal === 'workerbee works!') {
      return true;
    } else {
      return false;
    }
  };
  let testVal;
  let testValFunction = function (data, that) {
    that.testVal = data.data;
  };

  beforeEach(() => {
    worker = InitWorker(testValFunction);
    PostToWorker(
      worker,
      BuildMessage( logTest, {
        logVal: 'workerbee works!'
      },
      [valCompare])
    );
  });

  it('should be created', () => {
    expect(BuildMessage).toBeTruthy();
    expect(BuildWorkerFun).toBeTruthy();
    expect(InitWorker).toBeTruthy();
    expect(PostToWorker).toBeTruthy();
    expect(WorkerHelper).toBeTruthy();
    expect(workerMessageFormat).toBeTruthy();
  });
  it('InitWorker should return a worker', () => {
    expect(worker instanceof Worker).toBeTrue();
  });
  it('worker should return proper value', () => {
    expect(testVal).toEqual('resolving with: workerbee works!');
  });
});
