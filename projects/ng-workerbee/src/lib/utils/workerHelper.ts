// WorkerHelper written by https://github.com/klausj
// sourced from https://github.com/angular/angular-cli/issues/15059#issuecomment-584593180

// Helper class to build Worker Object URL

export class WorkerHelper {

    static buildWorkerBlobURL(workerFct: Function): string {
   
         // Update 2020-07-16: Try to mitigate XSS attacks
         // Should ensure a type check at runtime and reject an injected XSS string.
         if(! (workerFct instanceof Function)) {
            throw new Error(
               'Parameter workerFct is not a function! (XSS attack?).'
            )
         }
         let woFctNm = workerFct.name;
         let woFctStr = workerFct.toString();
   
         // Make sure code starts with "function()"
         // Chrome, Firefox: "[wofctNm](){...}", Safari: "function [wofctNm](){...}"
         // we need an anonymous function: "function() {...}"
         let piWoFctStr = woFctStr.replace(/^function +/, '');
   
         // Convert to anonymous function
         let anonWoFctStr = piWoFctStr.replace(woFctNm + '()', 'function()')
        
         // Self executing
         let ws = '(' + anonWoFctStr + ')();'
      
         // Build the worker blob
         let wb = new Blob([ws], {type: 'text/javascript'});
   
         let workerBlobUrl=window.URL.createObjectURL(wb);
         return workerBlobUrl;
       }
   }