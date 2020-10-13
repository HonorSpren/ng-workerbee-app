# Ng-Workerbee

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.8.

## Why ng-workerbee?
Angular 8 introduced native support for Web Workers, however this support does not extend to Angular libraries. 
Ng-Workerbee makes use of the WorkerHelper class (written by klausj https://github.com/klausj and sourced from https://github.com/angular/angular-cli/issues/15059#issuecomment-584593180) to allow a developer to easily use Web Workers in a compiled Angular library. While developed specifically to support Web Workers in Angular libraries, ng-workerbee can be used in any Angular project.

## Usage

### Install
npm i ng-workerbee
-or-
clone this repo and build the ng-workerbee project.
https://www.npmjs.com/package/ng-workerbee

### Imports
```typescript
import {
  InitWorker,
  workerMessageFormat,
  PostToWorker,
  BuildMessage,
} from 'ng-workerbee';
```

### Initialize your worker in a component constructor:
```typescript
  // InitWorker takes 2 parameters like:
  // InitWorker(processResponse: Function, that?: any)
  // your processResponse function should take 2 parameters
  // someFunction(response: MessageResponse, that: myComponent)
  // Passing an instance of your component to InitWorker
  // is required if you wish your worker to "return" a value.
  // It is suggested to use a Subject(BehaviorSubject or ReplaySubject) here.
  data: MessageEvent;
  dataSubject = new Subject<MessageEvent>();
  testWorker: Worker;
  workerTest = function (data: MessageEvent, that: myComponent) {
    that.dataSubject.next(data)
    console.log(`initWorker got message: ${data.data}`);
  };
  constructor() {
    this.dataSubject.subscribe({
      next: (d) => this.data = d
    })
    this.testWorker = InitWorker(this.workerTest, this);
  }
  ```
  
### Use BuildMessage to construct the second parameter for PostToWorker like:
```typescript
// BuildMessage takes 3 parameterslike:
// BuildMessage( wFun: Function, params: any, depFuns: Function[] )
// the first is the function your worker should execute, the workerFunction, which MUST reuturn a Promise.
// this function should take one parameter, even should you decide that it is undefined.
// the second is the parameter to be passed to the workerFunction
// the third is an optional array of functions that the workerFunction is dependent on, 

  workerFunction(item): Promise<any> {
    return new Promise((resolve) => {
      if (valCompare(item)) {
        resolve('resolving with: ' + item.logVal);
      }
    });
  }
  valCompare(item): boolean {
  if (item.logVal === 'workerbee works!') {
    return true;
  } else {
    return false;
  }
}
params = { logVal: 'workerbee works!' }
testMessage: workerMessageFormat = BuildMessage(workerFunction, params, [valCompare])
```

### Use PostToWorker to invoke:
```typescript
// PostToWorker takes 2 parameters like:
// PostToWorker(worker: Worker, message: workerMessageFormat)
// the first is the worker to which the message should be posted
// the second is a message of type {workerMessageFormat} (returned by BuildMessage)
// When the worker completes, the function you provided to InitWorker will be
// invoked with the resolution of your workerFunction and the Component instance 
// you passed to InitWorker(if any).
// DONE.
    PostToWorker(
      this.testWorker,
      this.testMessage
    );
```

### Demo
To run the sample app, clone the github repo and run npm run build ng-workerbee && npm start

#### WorkerHelper class sourced from https://github.com/angular/angular-cli/issues/15059#issuecomment-584593180 
