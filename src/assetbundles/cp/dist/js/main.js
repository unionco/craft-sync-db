!function(e){function t(t){for(var r,i,u=t[0],c=t[1],d=t[2],l=0,f=[];l<u.length;l++)i=u[l],s[i]&&f.push(s[i][0]),s[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(a&&a(t);f.length;)f.shift()();return o.push.apply(o,d||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,u=1;u<n.length;u++){var c=n[u];0!==s[c]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},s={main:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var a=c;o.push([0,"vendor"]),n()}({"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js!./resources/scss/main.scss":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader!./node_modules/postcss-loader/src??embedded!./node_modules/sass-loader/lib/loader.js!./resources/scss/main.scss ***!
  \*******************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){},"./resources/js/index.ts":
/*!*******************************!*\
  !*** ./resources/js/index.ts ***!
  \*******************************/
/*! no exports provided */function(e,t,n){"use strict";n.r(t);new(n(/*! vue */"./node_modules/vue/dist/vue.esm.js").default)({data:{statusText:"Initializing",showSpinner:!1,logOutput:"",cpTrigger:"admin",formData:void 0,secondsBeforeRedirect:10,redirectUrl:""},el:"#vue-sync-root",created:function(){var e=document.querySelector("#vue-sync-root");e&&(this.cpTrigger=e.dataset.cpTrigger,this.redirectUrl=e.dataset.redirectUrl);var t=document.querySelector("#poll-form");t&&(this.formData=new FormData(t))},mounted:function(){this.makeRequest(!0)},methods:{makeRequest:function(e){var t=this;void 0===e&&(e=!0),e&&(this.showSpinner=!0,this.statusText="Running Sync",fetch("/"+this.cpTrigger+"/sync-db/sync/start",{method:"POST",credentials:"same-origin",body:this.formData}).then(function(e){return e.json()}).then(function(e){t.showSpinner=!1,e.output&&(t.logOutput=e.output)})),fetch("/"+this.cpTrigger+"/sync-db/sync/status",{method:"POST",credentials:"same-origin",body:this.formData}).then(function(e){return e.json()}).then(function(n){if((e||2==n.result)&&setTimeout(function(){return t.makeRequest(!1)},500),n.output){var r=n.output;r.length>t.logOutput.length&&(t.logOutput=r)}}).catch(function(e){t.logOutput+="\n\nSync Complete - Page will reload and you will need to sign in again",t.redirect()})},redirect:function(){var e=this;this.secondsBeforeRedirect<1&&(window.location.href=this.redirectUrl),this.statusText="Redirecting in "+this.secondsBeforeRedirect+" seconds",setTimeout(function(){e.secondsBeforeRedirect--,e.redirect()},1e3)}}})},"./resources/scss/main.scss":
/*!**********************************!*\
  !*** ./resources/scss/main.scss ***!
  \**********************************/
/*! no static exports found */function(e,t,n){var r=n(/*! !../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader!../../node_modules/postcss-loader/src??embedded!../../node_modules/sass-loader/lib/loader.js!./main.scss */"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js!./resources/scss/main.scss");"string"==typeof r&&(r=[[e.i,r,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};n(/*! ../../node_modules/style-loader/lib/addStyles.js */"./node_modules/style-loader/lib/addStyles.js")(r,s);r.locals&&(e.exports=r.locals)},0:
/*!****************************************************************!*\
  !*** multi ./resources/js/index.ts ./resources/scss/main.scss ***!
  \****************************************************************/
/*! no static exports found */function(e,t,n){n(/*! /Users/abryrath/Union/Library/craft-sync-db/resources/js/index.ts */"./resources/js/index.ts"),e.exports=n(/*! /Users/abryrath/Union/Library/craft-sync-db/resources/scss/main.scss */"./resources/scss/main.scss")}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9zY3NzL21haW4uc2NzcyJdLCJuYW1lcyI6WyJ3ZWJwYWNrSnNvbnBDYWxsYmFjayIsImRhdGEiLCJtb2R1bGVJZCIsImNodW5rSWQiLCJjaHVua0lkcyIsIm1vcmVNb2R1bGVzIiwiZXhlY3V0ZU1vZHVsZXMiLCJpIiwicmVzb2x2ZXMiLCJsZW5ndGgiLCJpbnN0YWxsZWRDaHVua3MiLCJwdXNoIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwibW9kdWxlcyIsInBhcmVudEpzb25wRnVuY3Rpb24iLCJzaGlmdCIsImRlZmVycmVkTW9kdWxlcyIsImFwcGx5IiwiY2hlY2tEZWZlcnJlZE1vZHVsZXMiLCJyZXN1bHQiLCJkZWZlcnJlZE1vZHVsZSIsImZ1bGZpbGxlZCIsImoiLCJkZXBJZCIsInNwbGljZSIsIl9fd2VicGFja19yZXF1aXJlX18iLCJzIiwiaW5zdGFsbGVkTW9kdWxlcyIsIm1haW4iLCJleHBvcnRzIiwibW9kdWxlIiwibCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwIiwianNvbnBBcnJheSIsIndpbmRvdyIsIm9sZEpzb25wRnVuY3Rpb24iLCJzbGljZSIsIl9fd2VicGFja19leHBvcnRzX18iLCJzdGF0dXNUZXh0Iiwic2hvd1NwaW5uZXIiLCJsb2dPdXRwdXQiLCJjcFRyaWdnZXIiLCJmb3JtRGF0YSIsInVuZGVmaW5lZCIsInNlY29uZHNCZWZvcmVSZWRpcmVjdCIsInJlZGlyZWN0VXJsIiwiZWwiLCJjcmVhdGVkIiwicm9vdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRoaXMiLCJkYXRhc2V0IiwiZm9ybSIsIkZvcm1EYXRhIiwibW91bnRlZCIsIm1ha2VSZXF1ZXN0IiwibWV0aG9kcyIsImluaXRpYWwiLCJfdGhpcyIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJib2R5IiwidGhlbiIsInJlc3AiLCJqc29uIiwib3V0cHV0Iiwic2V0VGltZW91dCIsImNhdGNoIiwiZXJyIiwicmVkaXJlY3QiLCJsb2NhdGlvbiIsImhyZWYiLCJjb250ZW50Iiwib3B0aW9ucyIsImhtciIsInRyYW5zZm9ybSIsImluc2VydEludG8iLCJsb2NhbHMiXSwibWFwcGluZ3MiOiJhQUNBLFNBQUFBLEVBQUFDLEdBUUEsSUFQQSxJQU1BQyxFQUFBQyxFQU5BQyxFQUFBSCxFQUFBLEdBQ0FJLEVBQUFKLEVBQUEsR0FDQUssRUFBQUwsRUFBQSxHQUlBTSxFQUFBLEVBQUFDLEVBQUEsR0FDUUQsRUFBQUgsRUFBQUssT0FBb0JGLElBQzVCSixFQUFBQyxFQUFBRyxHQUNBRyxFQUFBUCxJQUNBSyxFQUFBRyxLQUFBRCxFQUFBUCxHQUFBLElBRUFPLEVBQUFQLEdBQUEsRUFFQSxJQUFBRCxLQUFBRyxFQUNBTyxPQUFBQyxVQUFBQyxlQUFBQyxLQUFBVixFQUFBSCxLQUNBYyxFQUFBZCxHQUFBRyxFQUFBSCxJQUtBLElBRkFlLEtBQUFoQixHQUVBTyxFQUFBQyxRQUNBRCxFQUFBVSxPQUFBVixHQU9BLE9BSEFXLEVBQUFSLEtBQUFTLE1BQUFELEVBQUFiLEdBQUEsSUFHQWUsSUFFQSxTQUFBQSxJQUVBLElBREEsSUFBQUMsRUFDQWYsRUFBQSxFQUFpQkEsRUFBQVksRUFBQVYsT0FBNEJGLElBQUEsQ0FHN0MsSUFGQSxJQUFBZ0IsRUFBQUosRUFBQVosR0FDQWlCLEdBQUEsRUFDQUMsRUFBQSxFQUFrQkEsRUFBQUYsRUFBQWQsT0FBMkJnQixJQUFBLENBQzdDLElBQUFDLEVBQUFILEVBQUFFLEdBQ0EsSUFBQWYsRUFBQWdCLEtBQUFGLEdBQUEsR0FFQUEsSUFDQUwsRUFBQVEsT0FBQXBCLElBQUEsR0FDQWUsRUFBQU0sSUFBQUMsRUFBQU4sRUFBQSxLQUdBLE9BQUFELEVBSUEsSUFBQVEsRUFBQSxHQUtBcEIsRUFBQSxDQUNBcUIsS0FBQSxHQUdBWixFQUFBLEdBR0EsU0FBQVMsRUFBQTFCLEdBR0EsR0FBQTRCLEVBQUE1QixHQUNBLE9BQUE0QixFQUFBNUIsR0FBQThCLFFBR0EsSUFBQUMsRUFBQUgsRUFBQTVCLEdBQUEsQ0FDQUssRUFBQUwsRUFDQWdDLEdBQUEsRUFDQUYsUUFBQSxJQVVBLE9BTkFoQixFQUFBZCxHQUFBYSxLQUFBa0IsRUFBQUQsUUFBQUMsSUFBQUQsUUFBQUosR0FHQUssRUFBQUMsR0FBQSxFQUdBRCxFQUFBRCxRQUtBSixFQUFBTyxFQUFBbkIsRUFHQVksRUFBQVEsRUFBQU4sRUFHQUYsRUFBQVMsRUFBQSxTQUFBTCxFQUFBTSxFQUFBQyxHQUNBWCxFQUFBWSxFQUFBUixFQUFBTSxJQUNBMUIsT0FBQTZCLGVBQUFULEVBQUFNLEVBQUEsQ0FBMENJLFlBQUEsRUFBQUMsSUFBQUosS0FLMUNYLEVBQUFnQixFQUFBLFNBQUFaLEdBQ0Esb0JBQUFhLGVBQUFDLGFBQ0FsQyxPQUFBNkIsZUFBQVQsRUFBQWEsT0FBQUMsWUFBQSxDQUF3REMsTUFBQSxXQUV4RG5DLE9BQUE2QixlQUFBVCxFQUFBLGNBQWlEZSxPQUFBLEtBUWpEbkIsRUFBQW9CLEVBQUEsU0FBQUQsRUFBQUUsR0FFQSxHQURBLEVBQUFBLElBQUFGLEVBQUFuQixFQUFBbUIsSUFDQSxFQUFBRSxFQUFBLE9BQUFGLEVBQ0EsS0FBQUUsR0FBQSxpQkFBQUYsUUFBQUcsV0FBQSxPQUFBSCxFQUNBLElBQUFJLEVBQUF2QyxPQUFBd0MsT0FBQSxNQUdBLEdBRkF4QixFQUFBZ0IsRUFBQU8sR0FDQXZDLE9BQUE2QixlQUFBVSxFQUFBLFdBQXlDVCxZQUFBLEVBQUFLLFVBQ3pDLEVBQUFFLEdBQUEsaUJBQUFGLEVBQUEsUUFBQU0sS0FBQU4sRUFBQW5CLEVBQUFTLEVBQUFjLEVBQUFFLEVBQUEsU0FBQUEsR0FBZ0gsT0FBQU4sRUFBQU0sSUFBcUJDLEtBQUEsS0FBQUQsSUFDckksT0FBQUYsR0FJQXZCLEVBQUEyQixFQUFBLFNBQUF0QixHQUNBLElBQUFNLEVBQUFOLEtBQUFpQixXQUNBLFdBQTJCLE9BQUFqQixFQUFBLFNBQzNCLFdBQWlDLE9BQUFBLEdBRWpDLE9BREFMLEVBQUFTLEVBQUFFLEVBQUEsSUFBQUEsR0FDQUEsR0FJQVgsRUFBQVksRUFBQSxTQUFBZ0IsRUFBQUMsR0FBc0QsT0FBQTdDLE9BQUFDLFVBQUFDLGVBQUFDLEtBQUF5QyxFQUFBQyxJQUd0RDdCLEVBQUE4QixFQUFBLEdBRUEsSUFBQUMsRUFBQUMsT0FBQSxhQUFBQSxPQUFBLGlCQUNBQyxFQUFBRixFQUFBaEQsS0FBQTJDLEtBQUFLLEdBQ0FBLEVBQUFoRCxLQUFBWCxFQUNBMkQsSUFBQUcsUUFDQSxRQUFBdkQsRUFBQSxFQUFnQkEsRUFBQW9ELEVBQUFsRCxPQUF1QkYsSUFBQVAsRUFBQTJELEVBQUFwRCxJQUN2QyxJQUFBVSxFQUFBNEMsRUFJQTFDLEVBQUFSLEtBQUEsY0FFQVU7Ozs7Ozs7O3VEQ3RKQU8sRUFBQWdCLEVBQUFtQixHQU9XLElBUFhuQyxZQUFBLHNDQU9lLFNBQUksQ0FDZjNCLEtBQU0sQ0FDRitELFdBQVksZUFDWkMsYUFBYSxFQUNiQyxVQUFXLEdBQ1hDLFVBQVcsUUFDWEMsY0FBVUMsRUFDVkMsc0JBQXVCLEdBQ3ZCQyxZQUFhLElBRWpCQyxHQUFJLGlCQUNKQyxRQUFTLFdBQ0wsSUFBTUMsRUFBdUJDLFNBQVNDLGNBQWMsa0JBQ2hERixJQUNBRyxLQUFLVixVQUFZTyxFQUFLSSxRQUFRWCxVQUM5QlUsS0FBS04sWUFBY0csRUFBS0ksUUFBUVAsYUFFcEMsSUFBTVEsRUFBd0JKLFNBQVNDLGNBQWMsY0FDakRHLElBQ0FGLEtBQUtULFNBQVcsSUFBSVksU0FBU0QsS0FHckNFLFFBQVMsV0FDTEosS0FBS0ssYUFBWSxJQUVyQkMsUUFBUyxDQUNMRCxZQUFhLFNBQVVFLEdBQVYsSUFBQUMsRUFBQVIsVUFBVSxJQUFBTyxPQUFBLEdBQ2ZBLElBQ0FQLEtBQUtaLGFBQWMsRUFDbkJZLEtBQUtiLFdBQWEsZUFFbEJzQixNQUFNLElBQUlULEtBQUtWLFVBQVMsc0JBQXVCLENBQzNDb0IsT0FBUSxPQUNSQyxZQUFhLGNBQ2JDLEtBQU1aLEtBQUtULFdBRWRzQixLQUFLLFNBQUNDLEdBQW1CLE9BQUFBLEVBQUtDLFNBQzlCRixLQUFLLFNBQUNFLEdBQ0hQLEVBQUtwQixhQUFjLEVBQ2YyQixFQUFLQyxTQUVMUixFQUFLbkIsVUFBWTBCLEVBQUtDLFdBS2xDUCxNQUFNLElBQUlULEtBQUtWLFVBQVMsdUJBQXdCLENBQzVDb0IsT0FBUSxPQUNSQyxZQUFhLGNBQ2JDLEtBQU1aLEtBQUtULFdBRVZzQixLQUFLLFNBQUNDLEdBQW1CLE9BQUFBLEVBQUtDLFNBQzlCRixLQUFLLFNBQUNFLEdBSUgsSUFISVIsR0FBMEIsR0FBZlEsRUFBS3RFLFNBQ2hCd0UsV0FBVyxXQUFNLE9BQUFULEVBQUtILGFBQVksSUFBUSxLQUUxQ1UsRUFBS0MsT0FBUSxDQUNiLElBQU1BLEVBQVNELEVBQUtDLE9BQ2hCQSxFQUFPcEYsT0FBUzRFLEVBQUtuQixVQUFVekQsU0FDL0I0RSxFQUFLbkIsVUFBWTJCLE1BSTVCRSxNQUFNLFNBQUFDLEdBQ0hYLEVBQUtuQixXQUFhLDBFQUNsQm1CLEVBQUtZLGNBR2pCQSxTQUFVLGVBQUFaLEVBQUFSLEtBQ0ZBLEtBQUtQLHNCQUF3QixJQUM3QlYsT0FBT3NDLFNBQVNDLEtBQU90QixLQUFLTixhQUVoQ00sS0FBS2IsV0FBYSxrQkFBa0JhLEtBQUtQLHNCQUFxQixXQUM5RHdCLFdBQVcsV0FDUFQsRUFBS2Ysd0JBQ0xlLEVBQUtZLFlBQ047Ozs7OENDbEZmLElBQUFHLEVBQWN4RSwwTUFBUSw0TUFFdEIsaUJBQUF3RSxNQUFBLEVBQTRDbkUsRUFBQTFCLEVBQVM2RixFQUFBLE1BT3JELElBQUFDLEVBQUEsQ0FBZUMsS0FBQSxFQUVmQyxlQVBBQSxFQVFBQyxnQkFBQW5DLEdBRWF6Qyx5REFBUSwrQ0FBUkEsQ0FBMkR3RSxFQUFBQyxHQUV4RUQsRUFBQUssU0FBQXhFLEVBQUFELFFBQUFvRSxFQUFBSyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtYWluXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJ2ZW5kb3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5cbmludGVyZmFjZSBJUG9sbFJlc3BvbnNlIHtcbiAgICBvdXRwdXQ6IHN0cmluZztcbiAgICByZXN1bHQ6IG51bWJlcjtcbn1cblxuY29uc3Qgdm0gPSBuZXcgVnVlKHtcbiAgICBkYXRhOiB7XG4gICAgICAgIHN0YXR1c1RleHQ6ICdJbml0aWFsaXppbmcnLFxuICAgICAgICBzaG93U3Bpbm5lcjogZmFsc2UsXG4gICAgICAgIGxvZ091dHB1dDogJycsXG4gICAgICAgIGNwVHJpZ2dlcjogJ2FkbWluJyxcbiAgICAgICAgZm9ybURhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgc2Vjb25kc0JlZm9yZVJlZGlyZWN0OiAxMCxcbiAgICAgICAgcmVkaXJlY3RVcmw6ICcnXG4gICAgfSxcbiAgICBlbDogJyN2dWUtc3luYy1yb290JyxcbiAgICBjcmVhdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHJvb3Q6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Z1ZS1zeW5jLXJvb3QnKTtcbiAgICAgICAgaWYgKHJvb3QpIHtcbiAgICAgICAgICAgIHRoaXMuY3BUcmlnZ2VyID0gcm9vdC5kYXRhc2V0LmNwVHJpZ2dlciBhcyBzdHJpbmc7XG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0VXJsID0gcm9vdC5kYXRhc2V0LnJlZGlyZWN0VXJsIGFzIHN0cmluZzsgXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9ybTogSFRNTEZvcm1FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvbGwtZm9ybScpO1xuICAgICAgICBpZiAoZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbW91bnRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1ha2VSZXF1ZXN0KHRydWUpO1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBtYWtlUmVxdWVzdDogZnVuY3Rpb24gKGluaXRpYWw6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoaW5pdGlhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NwaW5uZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9ICdSdW5uaW5nIFN5bmMnO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZldGNoKGAvJHt0aGlzLmNwVHJpZ2dlcn0vc3luYy1kYi9zeW5jL3N0YXJ0YCwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHRoaXMuZm9ybURhdGFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwOiBSZXNwb25zZSkgPT4gcmVzcC5qc29uKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGpzb246IElQb2xsUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U3Bpbm5lciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoanNvbi5vdXRwdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG91dHB1dCA9IFBvbGwuZm9ybWF0T3V0cHV0KGpzb24ub3V0cHV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nT3V0cHV0ID0ganNvbi5vdXRwdXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGZldGNoKGAvJHt0aGlzLmNwVHJpZ2dlcn0vc3luYy1kYi9zeW5jL3N0YXR1c2AsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgICAgICAgICBib2R5OiB0aGlzLmZvcm1EYXRhXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwOiBSZXNwb25zZSkgPT4gcmVzcC5qc29uKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGpzb246IElQb2xsUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwgfHwganNvbi5yZXN1bHQgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm1ha2VSZXF1ZXN0KGZhbHNlKSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoanNvbi5vdXRwdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG91dHB1dCA9IGpzb24ub3V0cHV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG91dHB1dC5sZW5ndGggPiB0aGlzLmxvZ091dHB1dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ091dHB1dCA9IG91dHB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nT3V0cHV0ICs9ICdcXG5cXG5TeW5jIENvbXBsZXRlIC0gUGFnZSB3aWxsIHJlbG9hZCBhbmQgeW91IHdpbGwgbmVlZCB0byBzaWduIGluIGFnYWluJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWRpcmVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Vjb25kc0JlZm9yZVJlZGlyZWN0IDwgMSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5yZWRpcmVjdFVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9IGBSZWRpcmVjdGluZyBpbiAke3RoaXMuc2Vjb25kc0JlZm9yZVJlZGlyZWN0fSBzZWNvbmRzYDtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kc0JlZm9yZVJlZGlyZWN0LS07XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdCgpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/ZW1iZWRkZWQhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9tYWluLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2xvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9lbWJlZGRlZCEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL21haW4uc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2xvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9lbWJlZGRlZCEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL21haW4uc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSJdLCJzb3VyY2VSb290IjoiIn0=