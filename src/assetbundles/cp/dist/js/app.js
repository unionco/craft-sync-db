(function(e){function t(t){for(var i,o,a=t[0],l=t[1],c=t[2],p=0,d=[];p<a.length;p++)o=a[p],s[o]&&d.push(s[o][0]),s[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);u&&u(t);while(d.length)d.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,a=1;a<n.length;a++){var l=n[a];0!==s[l]&&(i=!1)}i&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},s={app:0},r=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var u=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"291d":function(e,t,n){"use strict";var i=n("4902"),s=n.n(i);s.a},"383c":function(e,t,n){},"42cb":function(e,t,n){"use strict";var i=n("383c"),s=n.n(i);s.a},4394:function(e,t,n){"use strict";var i=n("be4f"),s=n.n(i);s.a},4902:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var i,s,r,o,a,l,c,u,p,d,v,b,m,f,h,O,g,y,j,C,_,k,w,S,$,x,T,P,E,A,D,F,N,H,R,I,L,U,q,M,B,J,V,z,G,Q,K,W,X,Y,Z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",["settings"===e.page?n("CpSettings"):e._e(),"preview"===e.page?n("SyncPreview"):e._e(),"sync"===e.page?n("SyncOutput"):e._e()],1)},ee=[],te=n("d225"),ne=n("b0b4"),ie=n("308d"),se=n("6bb5"),re=n("4e2b"),oe=n("60a3"),ae=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{on:{submit:e.save}},[n("Autocomplete",{ref:"skipTables",attrs:{options:e.$store.dbTables,label:"Skip Tables",instructions:"Tables to skip during sync",selected:e.$store.skipTables,"selected-label":"Selected"},on:{"item-selected":e.$store.addSkipTable,"item-removed":e.$store.removeSkipTable}}),n("Environments",{ref:"environments",attrs:{environments:e.$store.environments}})],1)},le=[],ce=(n("ac6a"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"Autocomplete"},[n("div",{staticClass:"field"},[n("div",{staticClass:"heading"},[n("label",[e._v(e._s(e.$props.label))]),n("div",{staticClass:"instructions"},[n("p",[e._v(e._s(e.$props.instructions))])])]),n("div",{staticClass:"row"},[n("div",{staticClass:"column search"},[n("div",{staticClass:"input ltr"},[n("div",{staticClass:"autosuggest-container"},[n("div",{staticClass:"flex-grow texticon search icon clearable"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"text",attrs:{type:"text",autocomplete:"on"},domProps:{value:e.search},on:{input:[function(t){t.target.composing||(e.search=t.target.value)},e.onChange],blur:e.onBlur}})]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isOpen,expression:"isOpen"}],staticClass:"autosuggest__results-container"},[n("div",{staticClass:"autosuggest__results"},[n("ul",{staticClass:"autosuggest-results",attrs:{role:"listbox"}},[e._l(e.results,function(t,i){return n("li",{key:i,staticClass:"autosuggest__results_item",attrs:{role:"option"},on:{click:function(){return e.setSelected(t)}}},[e._v(e._s(t))])}),e.noResults?n("li",{staticClass:"autosuggest__results_item",attrs:{role:"option"}},[e._v("No results")]):e._e()],2)])])])])]),n("div",{staticClass:"column results"},[n("div",{staticClass:"heading"},[n("label",{staticClass:"selected-label"},[e._v(e._s(e.$props.selectedLabel))]),n("SelectedItems",{attrs:{items:e.selected},on:{"item-removed":e.removeSelected}})],1)])])])])}),ue=[],pe=(n("386d"),n("6762"),n("2fdb"),n("75fc")),de=n("d360"),ve=(n("8a30"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"elementselect"},[n("div",{staticClass:"elements"},e._l(e.$props.items,function(t,i){return n("div",{key:i,staticClass:"element small removable"},[n("a",{staticClass:"delete icon",on:{click:function(){return e.removeSelected(t)}}}),n("div",{staticClass:"label"},[n("span",{staticClass:"title"},[e._v(e._s(t))])])])}),0)])}),be=[],me=(i=Object(oe["a"])({props:{items:Array}}),s=Object(oe["b"])("item-removed"),i((o=function(e){function t(){return Object(te["a"])(this,t),Object(ie["a"])(this,Object(se["a"])(t).apply(this,arguments))}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"removeSelected",value:function(e){return console.log(e),e}}]),t}(oe["c"]),Object(de["a"])(o.prototype,"removeSelected",[s],Object.getOwnPropertyDescriptor(o.prototype,"removeSelected"),o.prototype),r=o))||r),fe=me,he=n("2877"),Oe=Object(he["a"])(fe,ve,be,!1,null,null,null),ge=Oe.exports,ye=(a=Object(oe["a"])({name:"Autocomplete",props:{options:Array,selected:Array,label:String,instructions:String,selectedLabel:String},components:{SelectedItems:ge}}),l=Object(oe["b"])("item-selected"),c=Object(oe["b"])("item-removed"),a((d=function(e){function t(){var e,n;Object(te["a"])(this,t);for(var i=arguments.length,s=new Array(i),r=0;r<i;r++)s[r]=arguments[r];return n=Object(ie["a"])(this,(e=Object(se["a"])(t)).call.apply(e,[this].concat(s))),n.search="",n.availableOptions=[],n.results=[],n.noResults=!1,n.isOpen=!1,n}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"onChange",value:function(){this.isOpen=!0,this.updateAvailableOptions(),this.updateResults()}},{key:"onBlur",value:function(){this.isOpen=!1}},{key:"setSelected",value:function(e){return this.availableOptions=this.availableOptions.filter(function(t){return t!=e}),this.updateResults(),e}},{key:"removeSelected",value:function(e){return this.availableOptions=[].concat(Object(pe["a"])(this.availableOptions),[e]),this.updateResults(),e}},{key:"updateAvailableOptions",value:function(){var e=this;this.availableOptions=this.$props.options.filter(function(t){return!e.$props.selected.includes(t)})}},{key:"updateResults",value:function(){var e=this;this.results=this.availableOptions.filter(function(t){return t.toLowerCase().indexOf(e.search.toLowerCase())>-1}),this.noResults=this.results.length<1}}]),t}(oe["c"]),p=d,Object(de["a"])(p.prototype,"setSelected",[l],Object.getOwnPropertyDescriptor(p.prototype,"setSelected"),p.prototype),Object(de["a"])(p.prototype,"removeSelected",[c],Object.getOwnPropertyDescriptor(p.prototype,"removeSelected"),p.prototype),u=p))||u),je=ye,Ce=(n("4394"),Object(he["a"])(je,ce,ue,!1,null,null,null)),_e=Ce.exports,ke=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"field"},[e._m(0),n("div",{staticClass:"input ltr"},[e._l(e.$store.environments,function(e){return n("Environment",{key:e.uid,attrs:{uid:e.uid}})}),n("div",{staticClass:"buttons last"},[n("div",{staticClass:"btngroup"},[n("div",{staticClass:"btn add icon",on:{click:e.addEnvironment}},[e._v("Add Environment")])])])],2)])},we=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"heading"},[n("label",[e._v("Environments")])])}],Se=n("daf9"),$e=n("3172"),xe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"matrix matrix-field"},[n("div",{staticClass:"blocks"},[n("div",{class:{matrixblock:!0,collapsed:e.$store.environmentAccordionHide[e.$props.uid]}},[n("div",{staticClass:"titlebar",domProps:{innerHTML:e._s(e.environment.name)}}),n("div",{staticClass:"actions"},[n("a",{staticClass:"settings icon menubtn",on:{click:e.toggleEnvironment}}),n("a",{staticClass:"delete icon",on:{click:e.removeEnvironment}})]),e.$store.environmentAccordionHide[e.$props.uid]?e._e():n("div",{staticClass:"fields"},[n("div",{staticClass:"content"},[n("CraftTextField",{attrs:{label:"Name"},model:{value:e.environment.name,callback:function(t){e.$set(e.environment,"name",t)},expression:"environment.name"}}),n("CraftSelectField",{attrs:{label:"Environment",items:e.environmentItems},model:{value:e.environment.environment,callback:function(t){e.$set(e.environment,"environment",t)},expression:"environment.environment"}}),n("CraftSelectField",{attrs:{label:"Verbosity",items:e.verbosityItems},model:{value:e.environment.verbosity,callback:function(t){e.$set(e.environment,"verbosity",t)},expression:"environment.verbosity"}}),n("CraftTextField",{attrs:{label:"SSH Username"},model:{value:e.environment.username,callback:function(t){e.$set(e.environment,"username",t)},expression:"environment.username"}}),n("CraftTextField",{attrs:{label:"SSH Host"},model:{value:e.environment.host,callback:function(t){e.$set(e.environment,"host",t)},expression:"environment.host"}}),n("CraftTextField",{attrs:{label:"SSH Port"},model:{value:e.environment.port,callback:function(t){e.$set(e.environment,"port",t)},expression:"environment.port"}}),n("CraftTextField",{attrs:{label:"PHP Path"},model:{value:e.environment.phpPath,callback:function(t){e.$set(e.environment,"phpPath",t)},expression:"environment.phpPath"}}),n("CraftTextField",{attrs:{label:"Database Dump Client Path",instructions:"Path to pg_dump or mysqldump executable"},model:{value:e.environment.dbDumpClientPath,callback:function(t){e.$set(e.environment,"dbDumpClientPath",t)},expression:"environment.dbDumpClientPath"}}),n("CraftTextField",{attrs:{label:"Project Root",instructions:"Absolute path to the project root directory"},model:{value:e.environment.root,callback:function(t){e.$set(e.environment,"root",t)},expression:"environment.root"}}),n("CraftTextField",{attrs:{label:"Backup Directory",instructions:"Absolute path where temporary files should be stored"},model:{value:e.environment.backupDirectory,callback:function(t){e.$set(e.environment,"backupDirectory",t)},expression:"environment.backupDirectory"}})],1)])])])])},Te=[],Pe=(n("7514"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"field"},[e.$props.label||e.$props.instructions?n("div",{staticClass:"heading"},[e.$props.label?n("label",{domProps:{innerHTML:e._s(e.$props.label)}}):e._e(),e.$props.instructions?n("div",{staticClass:"instructions"},[n("p",[e._v(e._s(e.$props.instructions))])]):e._e()]):e._e(),n("div",{staticClass:"input ltr"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],staticClass:"text fullwidth",attrs:{type:"text"},domProps:{value:e.input},on:{input:function(t){t.target.composing||(e.input=t.target.value)}}})])])}),Ee=[],Ae=(n("c5f6"),v=Object(oe["a"])({props:{label:String,value:[String,Number],instructions:String}}),b=Object(oe["b"])("input"),m=Object(oe["d"])("input"),v((h=function(e){function t(){return Object(te["a"])(this,t),Object(ie["a"])(this,Object(se["a"])(t).apply(this,arguments))}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"data",value:function(){return{input:this.$props.value}}},{key:"onInputChanged",value:function(e,t){return e}}]),t}(oe["c"]),Object(de["a"])(h.prototype,"onInputChanged",[b,m],Object.getOwnPropertyDescriptor(h.prototype,"onInputChanged"),h.prototype),f=h))||f),De=Ae,Fe=Object(he["a"])(De,Pe,Ee,!1,null,null,null),Ne=Fe.exports,He=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"field lightswitch-field"},[n("div",{staticClass:"heading"},[n("label",{domProps:{innerHTML:e._s(e.$props.label)}})]),n("div",{staticClass:"input ltr"},[n("div",{class:{lightswitch:!0,fieldtoggle:!0,on:e.input},attrs:{role:"checkbox"}},[n("div",{class:{"lightswitch-container":!0,off:!e.input},on:{click:function(){return e.input=!e.input}}},[n("div",{staticClass:"label on"}),n("div",{staticClass:"handle"}),n("div",{staticClass:"label off"})]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],attrs:{type:"hidden",name:"enabled"},domProps:{value:e.input},on:{input:function(t){t.target.composing||(e.input=t.target.value)}}})])])])},Re=[],Ie=(O=Object(oe["a"])({props:{label:String,value:Boolean}}),g=Object(oe["b"])("input"),y=Object(oe["d"])("input"),O((C=function(e){function t(){return Object(te["a"])(this,t),Object(ie["a"])(this,Object(se["a"])(t).apply(this,arguments))}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"data",value:function(){return{input:this.$props.value}}},{key:"onInput",value:function(e,t){return e}}]),t}(oe["c"]),Object(de["a"])(C.prototype,"onInput",[g,y],Object.getOwnPropertyDescriptor(C.prototype,"onInput"),C.prototype),j=C))||j),Le=Ie,Ue=(n("820f"),Object(he["a"])(Le,He,Re,!1,null,null,null)),qe=Ue.exports,Me=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"field"},[n("div",{staticClass:"heading"},[n("label",{domProps:{innerHTML:e._s(e.$props.label)}})]),n("div",{staticClass:"input ltr"},[n("div",{staticClass:"select"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],staticClass:"fieldtoggle",on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.input=t.target.multiple?n:n[0]}}},e._l(e.$props.items,function(t){return n("option",{key:t.value,domProps:{value:t.value}},[e._v(e._s(t.label))])}),0)])])])},Be=[],Je=(_=Object(oe["a"])({name:"craft-select-field",props:{label:String,value:[String,Number],items:Array}}),_(k=function(e){function t(){return Object(te["a"])(this,t),Object(ie["a"])(this,Object(se["a"])(t).apply(this,arguments))}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"data",value:function(){return{input:this.$props.value}}}]),t}(oe["c"]))||k),Ve=Je,ze=Object(he["a"])(Ve,Me,Be,!1,null,null,null),Ge=ze.exports,Qe=(w=Object(oe["a"])({name:"environment",props:{uid:String},components:{CraftTextField:Ne,CraftLightswitch:qe,CraftSelectField:Ge}}),Object($e["a"])(S=w(S=function(e){function t(){return Object(te["a"])(this,t),Object(ie["a"])(this,Object(se["a"])(t).apply(this,arguments))}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"data",value:function(){var e=this;return{environment:this.$store.environments.find(function(t){return t.uid===e.$props.uid})}}},{key:"toggleEnvironment",value:function(){this.$store.toggleEnvironmentAccordion(this.$props.uid)}},{key:"removeEnvironment",value:function(){this.$store.removeEnvironment(this.$props.uid)}},{key:"environmentItems",get:function(){return[{label:"Production",value:"production"},{label:"Staging",value:"staging"},{label:"Development",value:"development"}]}},{key:"verbosityItems",get:function(){return[{label:"Quiet",value:16},{label:"Info",value:32},{label:"Debug",value:64},{label:"Verbose",value:128},{label:"Very Verbose",value:256}]}}]),t}(oe["c"]))||S)||S),Ke=Qe,We=(n("291d"),Object(he["a"])(Ke,xe,Te,!1,null,null,null)),Xe=We.exports,Ye=($=Object(oe["a"])({components:{Environment:Xe}}),Object($e["a"])(x=$(x=function(e){function t(){return Object(te["a"])(this,t),Object(ie["a"])(this,Object(se["a"])(t).apply(this,arguments))}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"addEnvironment",value:function(e){e.preventDefault(),this.$store.addEnvironment()}}]),t}(oe["c"]))||x)||x),Ze=Ye,et=(n("e097"),Object(he["a"])(Ze,ke,we,!1,null,null,null)),tt=et.exports,nt=(T=Object(oe["a"])({props:{},components:{Autocomplete:_e,Environments:tt}}),Object($e["a"])(P=T((E=function(e){function t(){var e,n;Object(te["a"])(this,t);for(var i=arguments.length,s=new Array(i),r=0;r<i;r++)s[r]=arguments[r];return n=Object(ie["a"])(this,(e=Object(se["a"])(t)).call.apply(e,[this].concat(s))),n.settings={skipTables:[],environments:{}},n.dbTables=[],n}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"mounted",value:function(){var e=this,t=document.querySelector("[data-vue]"),n=t.dataset.settingsJson,i=JSON.parse(n),s=t.dataset.dbTablesJson,r=JSON.parse(s);this.$store.setEnvironments(i.environments),this.$store.setDbTables(r),this.$store.setSkipTables(i.skipTables),document.querySelectorAll(".btn.submit").forEach(function(t){t.addEventListener("click",function(t){t.preventDefault(),e.save(t)})})}},{key:"save",value:function(e){e.preventDefault();var t={skipTables:Object(Se["f"])(this.$store.skipTables),environments:Object(Se["f"])(this.$store.environments)},n={pluginHandle:"sync-db",settings:t},i=function(e,t,n){200===n.status&&(window.Craft.cp.displayNotice("Settings saved"),setTimeout(function(){return window.Craft.redirectTo("/admin/settings")},1e3))};window.Craft.postActionRequest("sync-db/config/save",n,i)}}]),t}(oe["c"]),P=E))||P)||P),it=nt,st=Object(he["a"])(it,ae,le,!1,null,null,null),rt=st.exports,ot=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"col"},[n("input",{attrs:{name:"timeoutInMs",type:"hidden",value:"1000"}}),n("div",{staticClass:"field",attrs:{id:"source-field"}},[e._m(0),n("div",{staticClass:"input ltr"},[n("div",{staticClass:"select"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedSource,expression:"selectedSource"}],attrs:{id:"source",name:"env"},on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.selectedSource=t.target.multiple?n:n[0]},e.sourceChanged]}},e._l(e.$store.environments,function(t){return n("option",{key:t.name,domProps:{value:t.name}},[e._v(e._s(t.name)+" ["+e._s(t.environment)+"]")])}),0)])])]),n("div",{staticClass:"field",attrs:{id:"logFile-field"}},[n("div",{staticClass:"heading"},[n("label",{attrs:{id:"logFile-label",for:"logFile"}},[e._v("Log File")]),n("div",{staticClass:"instructions"},[n("p",[e._v("Log files are stored in "+e._s(e.storagePath))])])]),n("div",{staticClass:"input ltr"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.logFileName,expression:"logFileName"}],staticClass:"text fullwidth",attrs:{type:"text",id:"logFile",name:"logFile",autocomplete:"off"},domProps:{value:e.logFileName},on:{input:function(t){t.target.composing||(e.logFileName=t.target.value)}}})])]),n("button",{staticClass:"btn submit",attrs:{type:"submit"}},[e._v("Start")])])])},at=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"heading"},[n("label",{attrs:{id:"source-label",for:"source"}},[e._v("Source")])])}],lt=(n("7f7f"),A=Object(oe["a"])({}),Object($e["a"])(D=A((F=function(e){function t(){var e,n;Object(te["a"])(this,t);for(var i=arguments.length,s=new Array(i),r=0;r<i;r++)s[r]=arguments[r];return n=Object(ie["a"])(this,(e=Object(se["a"])(t)).call.apply(e,[this].concat(s))),n.timestamp="",n.cpUrl="",n.selectedSource="",n.storagePath="",n}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"created",value:function(){void 0!==window.Craft&&(this.cpUrl=window.Craft.getCpUrl())}},{key:"sourceChanged",value:function(e){var t=e.target;this.selectedSource=t.value}},{key:"mounted",value:function(){var e=document.querySelector("[data-vue]"),t=e.dataset.settingsJson,n=JSON.parse(t);this.timestamp=e.dataset.timestamp,this.$store.setEnvironments(n.environments),n.environments.length&&(this.selectedSource=n.environments[0].name),this.storagePath=e.dataset.storagePath}},{key:"logFileName",get:function(){return"syncdb_".concat(this.selectedSource,"_").concat(this.timestamp,".log")}}]),t}(oe["c"]),D=F))||D)||D),ct=lt,ut=(n("d82d"),Object(he["a"])(ct,ot,at,!1,null,"1721bb9e",null)),pt=ut.exports,dt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"field",attrs:{"data-status":""}},[e._m(0),n("div",{attrs:{id:"status"},domProps:{innerHTML:e._s(e.statusText)}})]),n("div",{staticClass:"field"},[e._m(1),e.showSpinner?n("div",{staticClass:"spinner",attrs:{id:"spinner"}}):e._e(),e.logOutput?n("pre",[n("code",{domProps:{innerHTML:e._s(e.logOutput)}})]):e._e()])])},vt=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"heading"},[n("label",{attrs:{for:"status"}},[e._v("Status")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"heading"},[n("label",[e._v("Output")])])}],bt=(n("28a5"),Object(oe["a"])((H=function(e){function t(){var e,n;Object(te["a"])(this,t);for(var i=arguments.length,s=new Array(i),r=0;r<i;r++)s[r]=arguments[r];return n=Object(ie["a"])(this,(e=Object(se["a"])(t)).call.apply(e,[this].concat(s))),n.logFile="",n.env="",n.statusText="Initializing",n.showSpinner=!1,n.logOutput="",n.secondsBeforeRedirect=4,n.cpUrl=void 0,n.redirectUrl=void 0,n}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"created",value:function(){void 0!==window.Craft&&(this.cpUrl=window.Craft.getCpUrl(),this.redirectUrl="".concat(this.cpUrl,"/sync-db/preview"))}},{key:"mounted",value:function(){console.log("mounted");var e=document.querySelector("[data-vue]");this.env=e.dataset.env,this.logFile=e.dataset.logFile,this.makeRequest(!0)}},{key:"makeRequest",value:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],n={env:this.env,logFile:this.logFile};t&&(this.showSpinner=!0,this.statusText="Running Sync",window.Craft.postActionRequest("".concat(this.cpUrl,"/sync-db/sync/start"),n,function(t,n){e.showSpinner=!1,t.output&&(e.setLogOutput(t.output),window.Craft.cp.displayNotice("Success! Page will reload"),e.redirect())}.bind(this)))}},{key:"setLogOutput",value:function(e){var t="";e.split(/\n/).forEach(function(e){-1!==e.indexOf("NOTICE")?t+='<span class="log-notice">'+e+"</span><br/>":-1!==e.indexOf("INFO")?t+='<span class="log-info">'+e+"</span><br/>":-1!==e.indexOf("DEBUG")?t+='<span class="log-debug">'+e+"</span><br/>":-1!==e.indexOf("ERROR")&&(t+='<span class="log-error">'+e+"</span><br/>")}),this.logOutput=t}},{key:"redirect",value:function(){var e=this;this.secondsBeforeRedirect<1&&(window.location.href=this.redirectUrl),this.statusText="Redirecting in ".concat(this.secondsBeforeRedirect," seconds"),setTimeout(function(){e.secondsBeforeRedirect-=1,e.redirect()},1e3)}}]),t}(oe["c"]),N=H))||N),mt=bt,ft=(n("42cb"),Object(he["a"])(mt,dt,vt,!1,null,null,null)),ht=ft.exports,Ot=(R=Object(oe["a"])({name:"app",components:{CpSettings:rt,SyncPreview:pt,SyncOutput:ht}}),R(I=function(e){function t(){return Object(te["a"])(this,t),Object(ie["a"])(this,Object(se["a"])(t).apply(this,arguments))}return Object(re["a"])(t,e),Object(ne["a"])(t,[{key:"data",value:function(){return{page:document.querySelector("[data-vue").dataset.vue}}}]),t}(oe["c"]))||I),gt=Ot,yt=Object(he["a"])(gt,Z,ee,!1,null,null,null),jt=yt.exports,Ct=n("5e15"),_t=(n("77a7"),L=Se["b"].bound,U=Se["b"].bound,q=Se["b"].bound,M=Se["b"].bound,B=Se["b"].bound,J=Se["b"].bound,V=Se["b"].bound,z=Se["b"].bound,Y=function(){function e(){Object(te["a"])(this,e),Object(Ct["a"])(this,"environments",Q,this),Object(Ct["a"])(this,"environmentAccordionHide",K,this),Object(Ct["a"])(this,"dbTables",W,this),Object(Ct["a"])(this,"skipTables",X,this)}return Object(ne["a"])(e,[{key:"setEnvironments",value:function(e){var t=this;this.environments=e.map(function(e){return e.uid=window.Craft.randomString(24),e}),e.forEach(function(e){t.environmentAccordionHide[e.uid]=!1})}},{key:"addEnvironment",value:function(){var e=window.Craft.randomString(24);this.environments=[].concat(Object(pe["a"])(this.environments),[{name:"new",username:"",host:"",root:"",backupDirectory:"",port:"22",dbDumpClientPath:"/usr/bin/pg_dump",phpPath:"/usr/bin/php",verbosity:64,environment:"production",uid:e}])}},{key:"removeEnvironment",value:function(e){this.environments=this.environments.filter(function(t){return t.uid!==e})}},{key:"toggleEnvironmentAccordion",value:function(e){this.environmentAccordionHide[e]=!this.environmentAccordionHide[e],console.log(this.dump)}},{key:"setDbTables",value:function(e){this.dbTables=e}},{key:"setSkipTables",value:function(e){this.skipTables=e}},{key:"addSkipTable",value:function(e){console.log(e),this.skipTables=[].concat(Object(pe["a"])(this.skipTables),[e])}},{key:"removeSkipTable",value:function(e){this.skipTables=this.skipTables.filter(function(t){return t!=e})}},{key:"dump",get:function(){return{skipTables:Object(Se["f"])(this.skipTables),environmentAccordionHide:Object(Se["f"])(this.environmentAccordionHide),environments:Object(Se["f"])(this.environments)}}}]),e}(),G=Y,Q=Object(de["a"])(G.prototype,"environments",[Se["e"]],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),K=Object(de["a"])(G.prototype,"environmentAccordionHide",[Se["e"]],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),W=Object(de["a"])(G.prototype,"dbTables",[Se["e"]],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),X=Object(de["a"])(G.prototype,"skipTables",[Se["e"]],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),Object(de["a"])(G.prototype,"setEnvironments",[L],Object.getOwnPropertyDescriptor(G.prototype,"setEnvironments"),G.prototype),Object(de["a"])(G.prototype,"addEnvironment",[U],Object.getOwnPropertyDescriptor(G.prototype,"addEnvironment"),G.prototype),Object(de["a"])(G.prototype,"removeEnvironment",[q],Object.getOwnPropertyDescriptor(G.prototype,"removeEnvironment"),G.prototype),Object(de["a"])(G.prototype,"toggleEnvironmentAccordion",[M],Object.getOwnPropertyDescriptor(G.prototype,"toggleEnvironmentAccordion"),G.prototype),Object(de["a"])(G.prototype,"setDbTables",[B],Object.getOwnPropertyDescriptor(G.prototype,"setDbTables"),G.prototype),Object(de["a"])(G.prototype,"setSkipTables",[J],Object.getOwnPropertyDescriptor(G.prototype,"setSkipTables"),G.prototype),Object(de["a"])(G.prototype,"addSkipTable",[V],Object.getOwnPropertyDescriptor(G.prototype,"addSkipTable"),G.prototype),Object(de["a"])(G.prototype,"removeSkipTable",[z],Object.getOwnPropertyDescriptor(G.prototype,"removeSkipTable"),G.prototype),Object(de["a"])(G.prototype,"dump",[Se["c"]],Object.getOwnPropertyDescriptor(G.prototype,"dump"),G.prototype),G);if("undefined"!==typeof window&&window.Vue){window.Vue.prototype.$store=new _t;var kt=document.querySelector("[data-app]");kt&&new window.Vue({render:function(e){return e(jt)}}).$mount(kt)}},"820f":function(e,t,n){"use strict";var i=n("ce40"),s=n.n(i);s.a},"8bbf":function(e,t){e.exports=Vue},ac94:function(e,t,n){},be4f:function(e,t,n){},ce40:function(e,t,n){},d82d:function(e,t,n){"use strict";var i=n("d899"),s=n.n(i);s.a},d899:function(e,t,n){},e097:function(e,t,n){"use strict";var i=n("ac94"),s=n.n(i);s.a}});
//# sourceMappingURL=app.js.map