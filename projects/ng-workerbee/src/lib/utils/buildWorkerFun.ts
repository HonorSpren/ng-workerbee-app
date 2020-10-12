/**
 * message provided by PostToWorker in following format
 * {stringWorkerMessageFormat}
 *   ->
 *    {
 *      depFuns: ['' + depFun1, '' + depFun2],
 *      workerFunction: '' + someFunction,
 *      workerFunctionParams: {
 *        whos: onFirst,
 *        whats: { position: onSecond, funny: true },
 *        idunno: onThird,
 *      }
 *    }
 * -- workerFunction -> the stringified web worker function (der)
 *    must return a promise
 * -- depFuns -> an array of stringified functions that workerFunction is dependent on,
 *    and any functions they themselves are dependent on,
 *    remember, a web worker cannot read outside of its context
 *    so the entire chain of dependent functions (if any) MUST be provided in this way
 * -- workerFunctionParams -> BuildWorkerFunction only allows workerFunction
 *    to accept one parameter. If your function requires multiple parameters,
 *    refactor the parameters into a single object.
 *
 * @export
 */
export function BuildWorkerFunction() {
  let parseWorkerFun = function (funStr: string): string {
    return (
      'wFun = ' +
      funStr
        .substring(funStr.indexOf('('), funStr.length)
        .replace('(', 'function(')
    );
  };
  let parseDepFun = function (funStr: string): string {
    return funStr.replace('function ', '').replace('(', ' = function(');
  };
  let IsNullOrUndefined = function (item: any): item is null | undefined {
    return item === null || item === undefined;
  };
  const ctx: Worker = self as any;
  self.onmessage = function (msg) {
    if (!IsNullOrUndefined(msg.data)) {
      msg.data.depFuns.forEach((fun) => {
        eval(parseDepFun(fun));
      });
    //   console.log(
    //     'buildWorkerFunction got message: ' + JSON.stringify(msg.data)
    //   );
      let wFun;
      eval(parseWorkerFun(msg.data.workerFunction));
      wFun(msg.data.workerFunctionParams).then((response) => {
        ctx.postMessage(response);
      });
    };
  };
}
