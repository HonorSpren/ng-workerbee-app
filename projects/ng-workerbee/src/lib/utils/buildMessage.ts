import { workerMessageFormat } from './workerMessageFormat';

/**
 * returns a message of type {workerMessageFormat}
 *  ->
 *    {
 *      depFuns: Function[];
 *      workerFunction: Function;
 *      workerFunctionParams: any;
 *    }
 *
 * @export
 * @param {Function[]} depFuns
 * @param {Function} wFun
 * @param {*} params
 * @return {*}  {workerMessageFormat}
 */
export function BuildMessage(depFuns: Function[], wFun: Function, params: any): workerMessageFormat {
    let msg: workerMessageFormat = {
        depFuns: depFuns,
        workerFunction: wFun,
        workerFunctionParams: params
    }
    return msg;
}