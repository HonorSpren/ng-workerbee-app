import { Component } from '@angular/core';
import { BuildWorkerFunction } from './buildWorkerFun';
import { WorkerHelper } from './workerHelper';

/**
 * returns a new worker if web workers are supported by your browser
 * processResponse should take one parameter, a messageResponse which
 * will contain the resolution of your worker function's promise
 * as the "data" member 
 * the 
 *
 * @export
 * @param {Function} processResponse
 * @return {*}  {*}
 */
export function InitWorker(processResponse: Function, that?: any): any {
    if (typeof Worker !== 'undefined') {
        let worker;
        worker = new Worker(
          WorkerHelper.buildWorkerBlobURL(BuildWorkerFunction)
        );
        worker.onmessage = ( data  => {
          processResponse(data, that);
        });
        return worker;
      } else {
        console.log('Web Workers are not supported by your browser');
        return null;
      }
}

//`initWorker got message: ${data}`