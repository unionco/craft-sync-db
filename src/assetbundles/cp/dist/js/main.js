!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=1)}([function(t,n,e){var r,o,i={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),a=function(t){var n={};return function(t,e){if("function"==typeof t)return t();if(void 0===n[t]){var r=function(t,n){return n?n.querySelector(t):document.querySelector(t)}.call(this,t,e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}n[t]=r}return n[t]}}(),u=null,c=0,l=[],f=e(6);function d(t,n){for(var e=0;e<t.length;e++){var r=t[e],o=i[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(y(r.parts[s],n))}else{var a=[];for(s=0;s<r.parts.length;s++)a.push(y(r.parts[s],n));i[r.id]={id:r.id,refs:1,parts:a}}}}function h(t,n){for(var e=[],r={},o=0;o<t.length;o++){var i=t[o],s=n.base?i[0]+n.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(a):e.push(r[s]={id:s,parts:[a]})}return e}function p(t,n){var e=a(t.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=l[l.length-1];if("top"===t.insertAt)r?r.nextSibling?e.insertBefore(n,r.nextSibling):e.appendChild(n):e.insertBefore(n,e.firstChild),l.push(n);else if("bottom"===t.insertAt)e.appendChild(n);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=a(t.insertAt.before,e);e.insertBefore(n,o)}}function m(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var n=l.indexOf(t);n>=0&&l.splice(n,1)}function b(t){var n=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return e.nc}();r&&(t.attrs.nonce=r)}return v(n,t.attrs),p(t,n),n}function v(t,n){Object.keys(n).forEach(function(e){t.setAttribute(e,n[e])})}function y(t,n){var e,r,o,i;if(n.transform&&t.css){if(!(i="function"==typeof n.transform?n.transform(t.css):n.transform.default(t.css)))return function(){};t.css=i}if(n.singleton){var s=c++;e=u||(u=b(n)),r=w.bind(null,e,s,!1),o=w.bind(null,e,s,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=function(t){var n=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",v(n,t.attrs),p(t,n),n}(n),r=function(t,n,e){var r=e.css,o=e.sourceMap,i=void 0===n.convertToAbsoluteUrls&&o;(n.convertToAbsoluteUrls||i)&&(r=f(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,e,n),o=function(){m(e),e.href&&URL.revokeObjectURL(e.href)}):(e=b(n),r=function(t,n){var e=n.css,r=n.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}.bind(null,e),o=function(){m(e)});return r(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;r(t=n)}else o()}}t.exports=function(t,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(n=n||{}).attrs="object"==typeof n.attrs?n.attrs:{},n.singleton||"boolean"==typeof n.singleton||(n.singleton=s()),n.insertInto||(n.insertInto="head"),n.insertAt||(n.insertAt="bottom");var e=h(t,n);return d(e,n),function(t){for(var r=[],o=0;o<e.length;o++){var s=e[o];(a=i[s.id]).refs--,r.push(a)}t&&d(h(t,n),n);for(o=0;o<r.length;o++){var a;if(0===(a=r[o]).refs){for(var u=0;u<a.parts.length;u++)a.parts[u]();delete i[a.id]}}}};var g,j=(g=[],function(t,n){return g[t]=n,g.filter(Boolean).join("\n")});function w(t,n,e,r){var o=e?"":r.css;if(t.styleSheet)t.styleSheet.cssText=j(n,o);else{var i=document.createTextNode(o),s=t.childNodes;s[n]&&t.removeChild(s[n]),s.length?t.insertBefore(i,s[n]):t.appendChild(i)}}},function(t,n,e){e(2),t.exports=e(7)},function(t,n,e){"use strict";e.r(n);e(3);var r=function(){function t(t){this.node=t,this.submitButton=t.querySelector('button[type="submit"]'),this.startSync=this.startSync.bind(this),this.node.addEventListener("submit",this.startSync)}return t.prototype.startSync=function(t){this.submitButton.classList.add("disabled"),this.submitButton.disabled=!0},t}(),o=function(){function t(t){this.continue=!0,this.formData=new FormData(document.querySelector("#poll-form")),this.root=t,this.cpTrigger=t.dataset.cpTrigger,this.timeoutInMs=500,this.spinner=document.querySelector("#spinner"),this.statusText=document.querySelector("#status"),this.outputContainer=document.querySelector("[data-output]"),this.redirectUrl=this.root.dataset.redirectUrl,this.makeRequest=this.makeRequest.bind(this),this.redirect=this.redirect.bind(this),this.makeRequest()}return t.prototype.makeRequest=function(n){var e=this;void 0===n&&(n=!0),n&&(this.spinner.classList.remove("hidden"),this.statusText.innerText="Running sync...",fetch("/"+this.cpTrigger+"/sync-db/sync/start",{method:"POST",credentials:"same-origin",body:this.formData}).then(function(t){return t.json()}).then(function(n){if(e.spinner.classList.add("hidden"),n.output){var r=t.formatOutput(n.output);e.output=r,e.outputContainer.innerHTML=r}})),fetch("/"+this.cpTrigger+"/sync-db/sync/status",{method:"POST",credentials:"same-origin",body:this.formData}).then(function(t){return t.json()}).then(function(r){if((n||2==r.result)&&setTimeout(function(){return e.makeRequest(!1)},e.timeoutInMs),r.output){var o=t.formatOutput(r.output);o.length>e.output.length&&(e.output=o),e.outputContainer.innerHTML=e.output}}).catch(function(t){e.outputContainer.innerHTML+="Sync Complete - Page will reload and you will need to sign in again",e.redirect(e.redirectUrl,5)})},t.prototype.redirect=function(t,n){var e=this;n<1&&(window.location.href=t),this.statusText.innerText="Redirecting in "+n+" seconds",setTimeout(function(){return e.redirect(t,n-1)},1e3)},t.formatOutput=function(t){return t.trimLeft()},t}(),i=document.querySelector("form[data-sync-db]");i&&new r(i);var s=document.querySelector("#vue-sync-root");s&&new o(s)},function(t,n,e){var r=e(4);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(0)(r,o);r.locals&&(t.exports=r.locals)},function(t,n,e){(t.exports=e(5)(!1)).push([t.i,"/*\n\nOriginal highlight.js style (c) Ivan Sagalaev <maniac@softwaremaniacs.org>\n\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: #F0F0F0;\n}\n\n\n/* Base color: saturation 0; */\n\n.hljs,\n.hljs-subst {\n  color: #444;\n}\n\n.hljs-comment {\n  color: #888888;\n}\n\n.hljs-keyword,\n.hljs-attribute,\n.hljs-selector-tag,\n.hljs-meta-keyword,\n.hljs-doctag,\n.hljs-name {\n  font-weight: bold;\n}\n\n\n/* User color: hue: 0 */\n\n.hljs-type,\n.hljs-string,\n.hljs-number,\n.hljs-selector-id,\n.hljs-selector-class,\n.hljs-quote,\n.hljs-template-tag,\n.hljs-deletion {\n  color: #880000;\n}\n\n.hljs-title,\n.hljs-section {\n  color: #880000;\n  font-weight: bold;\n}\n\n.hljs-regexp,\n.hljs-symbol,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-link,\n.hljs-selector-attr,\n.hljs-selector-pseudo {\n  color: #BC6060;\n}\n\n\n/* Language color: hue: 90; */\n\n.hljs-literal {\n  color: #78A960;\n}\n\n.hljs-built_in,\n.hljs-bullet,\n.hljs-code,\n.hljs-addition {\n  color: #397300;\n}\n\n\n/* Meta color: hue: 200 */\n\n.hljs-meta {\n  color: #1f7199;\n}\n\n.hljs-meta-string {\n  color: #4d99bf;\n}\n\n\n/* Misc effects */\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n",""])},function(t,n){t.exports=function(t){var n=[];return n.toString=function(){return this.map(function(n){var e=function(t,n){var e=t[1]||"",r=t[3];if(!r)return e;if(n&&"function"==typeof btoa){var o=(s=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[e].concat(i).concat([o]).join("\n")}var s;return[e].join("\n")}(n,t);return n[2]?"@media "+n[2]+"{"+e+"}":e}).join("")},n.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&r[s[0]]||(e&&!s[2]?s[2]=e:e&&(s[2]="("+s[2]+") and ("+e+")"),n.push(s))}},n}},function(t,n){t.exports=function(t){var n="undefined"!=typeof window&&window.location;if(!n)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var e=n.protocol+"//"+n.host,r=e+n.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,n){var o,i=n.trim().replace(/^"(.*)"$/,function(t,n){return n}).replace(/^'(.*)'$/,function(t,n){return n});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?e+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(t,n,e){var r=e(8);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(0)(r,o);r.locals&&(t.exports=r.locals)},function(t,n,e){}]);