import { stringWorkerMessageFormat } from './strMsgFormat';
import { workerMessageFormat } from './workerMessageFormat';

/**
 * * message should be in following format
 * {workerMessageFormat}
 *  ->
 *    {
 *      depFuns: [depFun1, depFun2, ...],
 *      workerFunction: someFunction,
 *      workerFunctionParams: {
 *        whos: onFirst,
 *        whats: { position: onSecond, funny: true },
 *        idunno: onThird,
 *        ...
 *      }
 *    }
 * -- workerFunction -> the web worker function (der)
 *    must return a promise
 * -- depFuns -> an array of functions that workerFunction is dependent on,
 *    and any functions they themselves are dependent on, 
 *    remember, a web worker cannot read outside of its context
 *    so the entire chain of dependent functions (if any) MUST be provided in this way
 * -- workerFunctionParams -> BuildWorkerFunction only allows workerFunction
 *    to accept one parameter. If your function requires multiple parameters,
 *    refactor the parameters into a single object. 
 * 
 * @export
 * @param {*} worker
 * @param {workerMessageFormat} message
 * @return {*}  {*}
 */
export function PostToWorker(worker, message: workerMessageFormat): any {
    let df = [];
    message.depFuns.forEach( fun=> {
        df.push('' + fun)
    });
    let wf = '' + message.workerFunction;
    let msg: stringWorkerMessageFormat;
    msg = {
        depFuns: df,
        workerFunction: wf,
        workerFunctionParams: message.workerFunctionParams,
      }
worker.postMessage(msg);
}