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
 * @param {Function} wFun
 * @param {*} params
 * @param {Function[]} depFuns
 * @return {*}  {workerMessageFormat}
 */
export function BuildMessage( wFun: Function, params: any, depFuns: Function[] ): workerMessageFormat {
    let msg: workerMessageFormat = {
        depFuns: depFuns,
        workerFunction: wFun,
        workerFunctionParams: params
    }
    return msg;
}