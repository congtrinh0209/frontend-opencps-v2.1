(function(t){function e(e){for(var i,s,r=e[0],l=e[1],c=e[2],p=0,u=[];p<r.length;p++)s=r[p],n[s]&&u.push(n[s][0]),n[s]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);d&&d(e);while(u.length)u.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],i=!0,s=1;s<a.length;s++){var l=a[s];0!==n[l]&&(i=!1)}i&&(o.splice(e--,1),t=r(r.s=a[0]))}return t}var i={},n={app:0},o=[];function s(t){return r.p+"../../docs/o/opencps-frontend-cli/survey/app/js/"+({HoanThienBoSungHoSoDetail:"HoanThienBoSungHoSoDetail",Landing:"Landing",TiepNhanHoSoDetail:"TiepNhanHoSoDetail"}[t]||t)+".js"}function r(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.e=function(t){var e=[],a=n[t];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise(function(e,i){a=n[t]=[e,i]});e.push(a[2]=i);var o,l=document.createElement("script");l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.src=s(t),o=function(e){l.onerror=l.onload=null,clearTimeout(c);var a=n[t];if(0!==a){if(a){var i=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,s=new Error("Loading chunk "+t+" failed.\n("+i+": "+o+")");s.type=i,s.request=o,a[1](s)}n[t]=void 0}};var c=setTimeout(function(){o({type:"timeout",target:l})},12e4);l.onerror=l.onload=o,document.head.appendChild(l)}return Promise.all(e)},r.m=t,r.c=i,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(a,i,function(e){return t[e]}.bind(null,i));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var p=0;p<l.length;p++)e(l[p]);var d=c;o.push(["2f8d","chunk-vendors"]),a()})({"2f8d":function(t,e,a){"use strict";a.r(e);a("0f18");var i=a("a026"),n=a("bb71");a("74ef");i["a"].use(n["a"],{theme:{primary:"#001f4d",secondary:"#424242",accent:"#001f4d",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"},customProperties:!0,iconfont:"md"});var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"app_survey"}},[t._e(),a("v-content",[a("router-view")],1)],1)},s=[],r={data:function(){return{}},beforeDestroy:function(){"undefined"!==typeof window&&window.removeEventListener("resize",this.onResize,{passive:!0})},mounted:function(){this.onResize(),window.addEventListener("resize",this.onResize,{passive:!0}),this.isMobile&&$("section#content").css("padding-left","0px")},computed:{isMobile:function(){return this.$store.getters.getIsMobile}},methods:{onResize:function(){var t=this,e=window.innerWidth<1024;t.$store.commit("setIsMobile",e)}}},l=r,c=a("2877"),p=a("6544"),d=a.n(p),u=a("7496"),v=a("549c"),f=a("f774"),m=Object(c["a"])(l,o,s,!1,null,null,null);m.options.__file="App.vue";var h=m.exports;d()(m,{VApp:u["a"],VContent:v["a"],VNavigationDrawer:f["a"]});var g=a("8c4f"),y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v("\n  13123\n")])},_=[],x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-chitiet"},[a("div",[a("v-tabs",{attrs:{"icons-and-text":""},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}},[a("v-tabs-slider",{attrs:{color:"primary"}}),a("v-tab",{key:1,attrs:{href:"#tabs-1"},on:{click:function(e){t.getNextActions()}}},[a("v-btn",{staticClass:"px-0 py-0 mx-0 my-0",attrs:{flat:""}},[3===t.originality?a("span",[t._v("XỬ LÝ HỒ SƠ")]):a("span",[t._v("CHUẨN BỊ HỒ SƠ")])])],1),a("v-tabs-items",{staticStyle:{overflow:"visible!important"},attrs:{"reverse-transition":"fade-transition",transition:"fade-transition"},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}},[a("v-tab-item",{key:1,attrs:{value:"tabs-1","reverse-transition":"fade-transition",transition:"fade-transition"}},[0!==t.checkInput&&t.filterNextActionEnable(t.btnDossierDynamics)?a("div",{staticStyle:{position:"relative"}},[a("v-expansion-panel",{staticClass:"expansion-pl",attrs:{value:[!0]}},[a("v-expansion-panel-content",{key:1,attrs:{"hide-actions":""}},[t._v("\n                123\n              ")])],1)],1):t._e(),t.btnStateVisible?a("div",{staticClass:"px-4 py-3",staticStyle:{"border-bottom":"1px solid #dddddd"}},[t._l(t.btnPlugins,function(e,i){return a("v-btn",{key:i,staticClass:"ml-0 mr-2",attrs:{color:"primary",loading:t.loadingPlugin,disabled:t.loadingPlugin},nativeOn:{click:function(a){t.processPullBtnplugin(e,i)}}},[t._v("\n              "+t._s(e.pluginName)+"\n              "),a("span",{attrs:{slot:"loader"},slot:"loader"},[t._v("Loading...")])])}),t.btnStepsDynamics.length>0&&t.thongTinChiTietHoSo["permission"].indexOf("write")>=0?a("v-menu",{staticStyle:{display:"inline-block",position:"relative !important"},attrs:{bottom:"","offset-y":""}},[a("v-btn",{staticClass:"deactive__btn",attrs:{slot:"activator",color:"primary",dark:""},slot:"activator"},[t._v("Khác   "),a("v-icon",{attrs:{size:"18"}},[t._v("arrow_drop_down")])],1),a("v-list",t._l(t.btnStepsDynamics,function(e,i){return a("v-list-tile",{key:i,on:{click:function(a){t.btnActionEvent(e,i)}}},[a("v-list-tile-title",[t._v(t._s(e.title))])],1)}),1)],1):t._e()],2):t._e()])],1)],1)],1)])},b=[],w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",[t._l(t.dossierTemplateItems,function(e,i){return t.partTypes.includes(e.partType)&&t.checkVisibleTemp(e,i)?a("div",{key:e.partNo,staticClass:"form_alpaca",staticStyle:{position:"relative"}},[a("v-expansion-panel",{staticClass:"expaned__list__data",attrs:{expand:"",value:[t.currentFormView==="formAlpaca"+e.partNo+t.id]}},[a("v-expansion-panel-content",{attrs:{"hide-actions":""}},[a("div",{staticStyle:{"background-color":"#fff"},attrs:{slot:"header"},on:{click:function(e){t.stateView=!1}},slot:"header"},[a("div",{staticStyle:{"align-items":"center",background:"#fff","padding-left":"25px"},style:{width:t.checkStyle(e)}},[a("div",{staticClass:"mr-2",staticStyle:{"min-width":"18px",display:"flex"},on:{click:function(a){t.onlyView&&e.hasForm?t.viewFile2(e):t.loadAlpcaForm(e)}}},[a("div",{staticClass:"header__tphs"},[a("span",{staticClass:"text-bold"},[t._v(t._s(i+1)+".")]),t._v("  ")]),a("div",{staticClass:"header__tphs"},[a("v-tooltip",{staticStyle:{"max-width":"100% !important"},attrs:{top:""}},[a("span",{attrs:{slot:"activator"},slot:"activator"},[t._v("\n                      "+t._s(e.partName)+"  \n                      "),e.required?a("span",{staticStyle:{color:"red"}},[t._v(" (*) ")]):t._e(),t._v("\n                        \n                    ")]),e.partTip["tip"]?a("span",[t._v(t._s(e.partTip["tip"]))]):t._e()]),e.hasForm&&e.daKhai&&(1===t.originality&&2!==e.partType||1!==t.originality)?a("v-tooltip",{attrs:{top:""}},[a("i",{staticClass:"fa fa-file-text-o",staticStyle:{color:"#0d71bb","font-size":"13px"},attrs:{slot:"activator","aria-hidden":"true"},slot:"activator"}),a("span",[t._v("Biểu mẫu trực tuyến (Đã khai)")])]):t._e(),e.hasForm&&!e.daKhai&&(1===t.originality&&2!==e.partType||1!==t.originality)?a("v-tooltip",{attrs:{top:""}},[a("i",{staticClass:"fa fa-file-o",staticStyle:{color:"#0d71bb","font-size":"13px"},attrs:{slot:"activator"},slot:"activator"}),a("span",[t._v("Biểu mẫu trực tuyến (Chưa khai)")])]):t._e(),t._v("\n                    \n                  "),!e.hasForm&&e.hasFileTemp?a("v-tooltip",{attrs:{top:""}},[a("v-icon",{staticStyle:{color:"#0d71bb"},attrs:{slot:"activator",size:"16",color:"primary"},on:{click:function(a){a.stopPropagation(),t.downloadFileTemplate(e,i)}},slot:"activator"},[t._v("save_alt")]),a("span",[t._v("Biểu mẫu điền thủ công")])],1):t._e()],1)]),a("div",{staticStyle:{display:"flex"}},[1===t.checkInput&&2===e.fileCheck&&e.stateEditFileCheck?a("v-text-field",{attrs:{placeholder:"Nhập lý do",rules:[function(t){return!!t||"Bạn phải nhập lý do trước khi gửi"}],required:""},on:{keyup:function(a){if(!("button"in a)&&t._k(a.keyCode,"enter",13,a.key,"Enter"))return null;t.changeFileComment(e,i)}},model:{value:e.fileComment,callback:function(a){t.$set(e,"fileComment",a)},expression:"item.fileComment"}}):t._e(),1===t.checkInput&&2===e.fileCheck&&e.stateEditFileCheck?a("v-tooltip",{attrs:{top:""}},[a("v-btn",{staticClass:"mx-0 my-0",attrs:{slot:"activator",icon:""},on:{click:function(a){a.stopPropagation(),t.changeFileComment(e,i)}},slot:"activator"},[a("v-icon",{staticClass:"mx-0",attrs:{size:"16",color:"primary"}},[t._v("send")])],1),a("span",[t._v("Gửi")])],1):t._e()],1),e.fileComment&&!e.stateEditFileCheck?a("i",{staticStyle:{"font-size":"12px",color:"#0d71bb","margin-left":"10px"}},[t._v(t._s(e.fileComment))]):t._e(),e.fileComment&&!e.stateEditFileCheck&&1===t.checkInput?a("v-tooltip",{attrs:{top:""}},[a("v-icon",{staticStyle:{"font-size":"13px",color:"#0d71bb","margin-left":"10px",cursor:"pointer"},attrs:{slot:"activator"},on:{click:function(t){t.stopPropagation(),e.stateEditFileCheck=!e.stateEditFileCheck}},slot:"activator"},[t._v("edit")]),a("span",[t._v("Chỉnh sửa ý kiến")])],1):t._e(),t._l(t.dossierFilesItems,function(i,n){return e.partNo!==i.dossierPartNo||i.eForm?t._e():a("div",{key:n},[a("div",{style:{width:"calc(100% - 370px)",display:"flex","align-items":"center",background:"#fff","padding-left":"15px","font-size":"12px","margin-bottom":t.onlyView?"5px":"0px"}},[a("span",{staticClass:"ml-3",staticStyle:{cursor:"pointer"},on:{click:function(e){e.stopPropagation(),t.viewFile2(i)}}},[0!==i.fileSize?a("v-icon",[t._v("attach_file")]):t._e(),t._v("\n                    "+t._s(i.displayName)+" - \n                    "),a("i",[t._v(t._s(i.modifiedDate))])],1),t.onlyView||1===t.checkInput?t._e():a("v-btn",{staticClass:"mx-0 my-0",attrs:{icon:"",ripple:""},on:{click:function(e){e.stopPropagation(),t.deleteSingleFile(i,n)}}},[a("v-icon",{staticStyle:{color:"red"}},[t._v("delete_outline")])],1)],1)])}),a("div",{staticClass:"mr-3 my-1 py-2",staticStyle:{display:"none",border:"1px solid #f3ae75"},attrs:{id:"fileApplicant-"+e.partNo}},t._l(t.dossierFilesApplicant,function(i,n){return i.dossierTemplateNo===t.thongTinHoSo["dossierTemplateNo"]&&e.partNo===i.dossierPartNo?a("div",{key:n},[i.eForm?a("div",{style:{width:"calc(100% - 0px)",display:"flex","align-items":"center",background:"#fff","padding-left":"15px","font-size":"12px","margin-bottom":t.onlyView?"5px":"0px"}},[a("v-tooltip",{staticStyle:{"max-width":"100%"},attrs:{top:""}},[a("span",{staticClass:"ml-3",staticStyle:{cursor:"pointer"},attrs:{slot:"activator"},on:{click:function(e){e.stopPropagation(),t.viewGiayToDaNop(i)}},slot:"activator"},[a("i",{staticClass:"ml-1 fa fa-file-o",staticStyle:{color:"#0d71bb","font-size":"13px"}}),t._v("  \n                        "+t._s(i.referenceUid)+"."+t._s(i.fileType)+" - \n                        "),a("i",[t._v(t._s(i.modifiedDate))])]),a("span",[t._v("Bản khai trực tuyến")])])],1):a("div",{style:{width:"calc(100% - 0px)",display:"flex","align-items":"center",background:"#fff","padding-left":"15px","font-size":"12px","margin-bottom":t.onlyView?"5px":"0px"}},[a("v-tooltip",{staticStyle:{"max-width":"100%"},attrs:{top:""}},[a("span",{staticClass:"ml-3",staticStyle:{cursor:"pointer"},attrs:{slot:"activator"},on:{click:function(e){e.stopPropagation(),t.viewGiayToDaNop(i)}},slot:"activator"},[0!==i.fileSize?a("v-icon",{staticStyle:{color:"#0d71bb"}},[t._v("attach_file")]):t._e(),t._v("\n                        "+t._s(i.displayName)+" - \n                        "),a("i",[t._v(t._s(i.modifiedDate))])],1),a("span",[t._v("Đính kèm")])])],1)]):t._e()}),0)],2)]),e.hasForm&&!t.onlyView?a("v-card",[a("v-card-text",{staticStyle:{"background-color":"rgba(244, 247, 213, 0.19)"}},[a("v-layout",{attrs:{wrap:""}},[t.stateView?t._e():a("v-flex",{staticClass:"text-xs-right",attrs:{xs12:""}},[a("div",{style:t.pstFixed>t.pstEl&&t.pstFixed<t.endEl+t.pstEl?"position:fixed;top:5px;z-index:101":"",attrs:{id:"wrapForm"+e.partNo+t.id}},[e.hasForm&&!t.onlyView&&1!==t.checkInput?a("v-btn",{attrs:{color:"primary"},on:{click:function(a){t.saveAlpacaForm(e,i)}}},[t._v("Lưu lại")]):t._e(),e.daKhai&&e.hasForm&&!t.onlyView&&1!==t.checkInput?a("v-btn",{attrs:{color:"primary"},on:{click:function(a){t.deleteSingleFileEform(e,i)}}},[t._v("Xóa")]):t._e(),e.daKhai&&e.hasForm?a("v-btn",{attrs:{color:"primary"},on:{click:function(a){t.previewFileEfom(e,i)}}},[t._v("In")]):t._e()],1),!t.onlyView||e.daKhai?a("div",{class:{no_acction__event:t.onlyView},attrs:{id:"formAlpaca"+e.partNo+t.id}}):t._e()])],1)],1)],1):t._e()],1)],1),a("div",{staticClass:"absolute__btn group__thanh_phan mr-1"},[t.loading?a("content-placeholders",{staticClass:"mt-1"},[a("content-placeholders-text",{attrs:{lines:1}})],1):a("v-layout",{attrs:{row:"",wrap:""}},[1===t.originality||1!==e.partType||t.thongTinHoSo.online||1===t.checkInput?t._e():a("v-flex",{staticClass:"layout wrap",staticStyle:{width:"110px"}},[a("v-select",{attrs:{items:t.fileMarkItems,disabled:t.onlyView},on:{change:function(e){t.changeFileMark(e,i)}},model:{value:t.dossierTemplateItems[i].fileMark,callback:function(e){t.$set(t.dossierTemplateItems[i],"fileMark",e)},expression:"dossierTemplateItems[index].fileMark"}})],1),1===t.checkInput?a("v-flex",{staticClass:"layout wrap",staticStyle:{width:"120px"}},[a("v-select",{attrs:{items:t.fileCheckItems,"item-text":"text","item-value":"value"},on:{change:function(e){t.changeFileCheck(e,i)}},model:{value:t.dossierTemplateItems[i].fileCheck,callback:function(e){t.$set(t.dossierTemplateItems[i],"fileCheck",e)},expression:"dossierTemplateItems[index].fileCheck"}})],1):e.fileCheck>0?a("v-flex",{staticClass:"layout wrap",style:{width:"20px","align-items":"center","margin-left":"10px","margin-top":t.thongTinHoSo.online?"10px":"0px"}},[1===e.fileCheck?a("v-tooltip",{attrs:{top:""}},[a("v-icon",{staticClass:"mx-0",attrs:{slot:"activator",size:"16",color:"primary"},slot:"activator"},[t._v("done")]),a("span",[t._v("Đạt")])],1):2===e.fileCheck?a("v-tooltip",{attrs:{top:""}},[a("v-icon",{staticClass:"mx-0",attrs:{slot:"activator",size:"16",color:"primary"},slot:"activator"},[t._v("close")]),a("span",[t._v("Không đạt")])],1):t._e()],1):t._e(),1!==t.checkInput?a("v-flex",{class:{"text-xs-right":t.onlyView},style:{width:t.onlyView?"auto":"90px"}},[a("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"file"+e.partNo},on:{change:function(a){t.onUploadSingleFile(a,e,i)}}}),3!==e.partType||3!==t.originality||t.onlyView?t._e():a("v-tooltip",{attrs:{top:""}},[a("v-btn",{staticClass:"mx-0 my-0",attrs:{slot:"activator",icon:""},on:{click:function(a){t.addFileOther(e)}},slot:"activator"},[a("v-icon",{staticClass:"mx-0",attrs:{size:"16",color:"primary"}},[t._v("add")])],1),a("span",[t._v("Thêm giấy tờ khác")])],1),t.progressUploadPart===e.partNo?a("v-progress-circular",{attrs:{width:2,size:25,color:"green",indeterminate:""}}):t.progressUploadPart===e.partNo||t.onlyView?t._e():a("v-tooltip",{attrs:{left:""}},[a("v-btn",{staticClass:"mx-0 my-0",attrs:{slot:"activator",icon:""},on:{click:function(a){t.pickFile(e)}},slot:"activator"},[a("v-badge",[a("v-icon",{attrs:{size:"16",color:"primary"}},[t._v("cloud_upload")])],1)],1),e.partTip["extensions"]||e.partTip["maxSize"]?a("span",[t._v("Chấp nhận tải lên các định dạng: "+t._s(e.partTip["extensions"])+". Tối đa "+t._s(e.partTip["maxSize"])+" MB ")]):a("span",[t._v("Tải file lên")])],1),t.partNoApplicantHasFile(e.partNo)&&!t.onlyView?a("v-tooltip",{attrs:{top:""}},[a("v-btn",{staticClass:"mx-0 my-0",attrs:{slot:"activator",icon:""},on:{click:function(a){t.showFilesApplicant(e.partNo)}},slot:"activator"},[a("v-badge",[a("v-icon",{attrs:{size:"16",color:"orange darken-3"}},[t._v("warning")])],1)],1),a("span",[t._v("Giấy tờ đã nộp")])],1):t._e()],1):t._e()],1)],1)],1):t._e()}),t.partTypes.includes(2)?t._e():a("div",[a("v-layout",{staticClass:"mx-4",attrs:{wrap:""}},[!t.onlyView||t.onlyView&&t.applicantNoteDossier?a("v-flex",{staticClass:"my-0 py-2 text-bold",staticStyle:{width:"60px"}},[t._v("Ghi chú:")]):t._e(),a("v-flex",{staticStyle:{width:"calc(100% - 80px)"}},[t.onlyView?t._e():a("div",{staticClass:"pl-2"},[a("v-text-field",{staticClass:"py-0",attrs:{"multi-line":"",rows:"3"},on:{input:t.changeApplicantNote},model:{value:t.applicantNoteDossier,callback:function(e){t.applicantNoteDossier=e},expression:"applicantNoteDossier"}})],1),t.onlyView&&t.applicantNoteDossier?a("p",{staticClass:"my-0 py-2"},[t._v("\n            "+t._s(t.applicantNoteDossier)+" \n          ")]):t._e()])],1)],1),a("v-dialog",{attrs:{"max-width":"400",transition:"fade-transition",persistent:""},model:{value:t.dialogAddOtherTemp,callback:function(e){t.dialogAddOtherTemp=e},expression:"dialogAddOtherTemp"}},[a("v-card",[a("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-card-title",{staticClass:"headline"},[t._v("Tên giấy tờ")]),a("v-btn",{staticClass:"mx-0 my-0 absolute__btn_panel mr-2",attrs:{icon:"",dark:""},nativeOn:{click:function(e){return t.cancelDialog(e)}}},[a("v-icon",[t._v("clear")])],1),t.loadingAddOther?a("v-progress-linear",{staticClass:"my-0",attrs:{indeterminate:!0}}):t._e(),a("v-card-text",{staticClass:"pb-0 pt-4"},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{staticClass:"px-2 pb-3 fix__label",attrs:{xs12:""}},[a("v-text-field",{attrs:{label:"Tên giấy tờ:",rules:[function(t){return!!t||"Bạn phải điền tên giấy tờ."}],required:""},model:{value:t.otherDossierTemplate,callback:function(e){t.otherDossierTemplate=e},expression:"otherDossierTemplate"}})],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"red darken-3",flat:"flat"},nativeOn:{click:function(e){return t.cancelDialog(e)}}},[t._v("\n              Quay lại\n            ")]),a("v-btn",{attrs:{color:"primary",flat:"flat",loading:t.loadingAddOther},nativeOn:{click:function(e){return t.addOtherTemplate(e)}}},[t._v("\n              Đồng ý\n              "),a("span",{attrs:{slot:"loader"},slot:"loader"},[t._v("Loading...")])])],1)],1)],1)],1)],2),a("v-dialog",{staticStyle:{overflow:"hidden"},attrs:{"max-width":"900",transition:"fade-transition"},model:{value:t.dialogPDF,callback:function(e){t.dialogPDF=e},expression:"dialogPDF"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t.pdfEform?a("span",[t._v("Bản khai trực tuyến")]):a("span",[t._v("File đính kèm")])]),a("v-btn",{staticClass:"mx-0 my-0 absolute__btn_panel mr-2",attrs:{icon:"",dark:""},nativeOn:{click:function(e){t.dialogPDF=!1}}},[a("v-icon",[t._v("clear")])],1),t.dialogPDFLoading?a("div",{staticStyle:{"min-height":"600px","text-align":"center",margin:"auto",padding:"25%"}},[a("v-progress-circular",{attrs:{size:100,width:1,color:"primary",indeterminate:""}})],1):t._e(),a("iframe",{directives:[{name:"show",rawName:"v-show",value:!t.dialogPDFLoading,expression:"!dialogPDFLoading"}],staticStyle:{overflow:"auto","min-height":"600px"},attrs:{id:"dialogPDFPreview"+t.id,src:"",type:"application/pdf",width:"100%",height:"100%",frameborder:"0"}})],1)],1)],1)},C=[],k={data:function(){return{}}},S=k,V=a("4ca6"),T=a("8336"),I=a("b0af"),D=a("99d9"),F=a("12b2"),P=a("169a"),N=a("cd55"),L=a("49e2"),A=a("0e8f"),E=a("4bd4"),z=a("132d"),O=a("a722"),M=a("490a"),H=a("8e36"),R=a("b56d"),B=a("9910"),j=a("2677"),G=a("3a2f"),U=Object(c["a"])(S,w,C,!1,null,null,null);U.options.__file="TiepNhanHoSo_ThanhPhanHoSo.vue";var K=U.exports;d()(U,{VBadge:V["a"],VBtn:T["a"],VCard:I["a"],VCardActions:D["a"],VCardText:D["b"],VCardTitle:F["a"],VDialog:P["a"],VExpansionPanel:N["a"],VExpansionPanelContent:L["a"],VFlex:A["a"],VForm:E["a"],VIcon:z["a"],VLayout:O["a"],VProgressCircular:M["a"],VProgressLinear:H["a"],VSelect:R["a"],VSpacer:B["a"],VTextField:j["a"],VTooltip:G["a"]});var q={props:["index","id"],components:{"thanh-phan-ho-so":K},data:function(){return{}}},X=q,Y=a("8860"),J=a("ba95"),Q=a("5d23"),W=a("e449"),Z=a("71a3"),tt=a("c671"),et=a("fe57"),at=a("aac8"),it=a("9a96"),nt=Object(c["a"])(X,x,b,!1,null,null,null);nt.options.__file="XemChiTietHoSoDetailCanBo.vue";var ot=nt.exports;d()(nt,{VBtn:T["a"],VExpansionPanel:N["a"],VExpansionPanelContent:L["a"],VIcon:z["a"],VList:Y["a"],VListTile:J["a"],VListTileTitle:Q["b"],VMenu:W["a"],VTab:Z["a"],VTabItem:tt["a"],VTabs:et["a"],VTabsItems:at["a"],VTabsSlider:it["a"]});var st={props:["id","formCode"],components:{"xem-chi-tiet-ho-so-detail-can-bo":ot},data:function(){return{initData:null,step:""}}},rt=st,lt=Object(c["a"])(rt,y,_,!1,null,null,null);lt.options.__file="DetailForward.vue";var ct=lt.exports,pt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{staticClass:"text-xs-center",attrs:{xs12:"","mt-5":""}},[a("v-progress-circular",{attrs:{size:100,width:1,color:"primary",indeterminate:""}})],1)],1)],1)},dt=[],ut={},vt=ut,ft=a("a523"),mt=Object(c["a"])(vt,pt,dt,!1,null,null,null);mt.options.__file="NotFound.vue";var ht=mt.exports;d()(mt,{VContainer:ft["a"],VFlex:A["a"],VLayout:O["a"],VProgressCircular:M["a"]});var gt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{height:"100%","background-color":"#ffff","padding-top":"20px"}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{staticClass:"text-xs-center",staticStyle:{"margin-bottom":"20px"},attrs:{xs12:"",sm12:""}},[a("h3",{staticClass:"text-xs-center mt-2",staticStyle:{color:"#065694"}},[t._v("CÂU HỎI KHẢO SÁT")])]),a("v-flex",{attrs:{xs12:"",sm2:""}}),a("v-flex",{staticClass:"px-2",attrs:{xs12:"",sm8:""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:"",sm12:""}},[t._l(t.votingItems,function(e,i){return a("div",{key:i,staticStyle:{"margin-bottom":"5px"}},[a("v-layout",{staticClass:"text-bold",attrs:{wrap:""}},[a("div",{staticClass:"flex px-3 py-1",staticStyle:{height:"26px","max-width":"75px","background-color":"#0167d3",transform:"skew(-25deg)"}},[a("span",{staticClass:"d-block white--text",staticStyle:{transform:"skew(25deg)"}},[t._v("Câu "+t._s(i+1))])]),a("div",{staticClass:"flex pl-3 pr-2 pt-0",staticStyle:{"max-width":"calc(100% - 100px)",color:"#0167d3"},domProps:{innerHTML:t._s(e.subject)}})]),a("div",{staticClass:"ml-4"},[a("v-radio-group",{staticClass:"my-2",attrs:{row:""},model:{value:e.selected,callback:function(a){t.$set(e,"selected",a)},expression:"item.selected"}},t._l(e["choices"],function(i,n){return a("v-radio",{key:"rd"+n,attrs:{value:n+1}},[a("div",{staticStyle:{"text-align":"justify"},style:e.selected===n+1?"color:#0167d3":"color:black",attrs:{slot:"label"},slot:"label"},[t._v(t._s(i))])])}),1)],1)],1)}),t.showCaptcha?a("v-flex",{staticClass:"mb-3 mt-3",attrs:{xs12:"",sm12:""}},[a("captcha",{ref:"captcha"})],1):t._e(),a("v-flex",{staticClass:"text-xs-center mt-2",attrs:{xs12:"",sm12:""}},[a("v-btn",{attrs:{color:"primary",loading:t.btnLoading,disabled:t.btnLoading},on:{click:t.doVottingResultSubmit}},[a("v-icon",[t._v("save")]),t._v(" \n              Gửi đánh giá\n            ")],1),a("v-btn",{staticClass:"ml-3",attrs:{color:"primary",loading:t.btnLoading,disabled:t.btnLoading},on:{click:t.showVotingResult}},[a("v-icon",[t._v("bookmark")]),t._v(" \n              Xem kết quả đánh giá\n            ")],1)],1)],2)],1)],1),a("v-flex",{attrs:{xs12:"",sm2:""}})],1),a("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:t.dialog_voting_result,callback:function(e){t.dialog_voting_result=e},expression:"dialog_voting_result"}},[a("v-card",[a("v-toolbar",{attrs:{dark:"",color:"primary"}},[a("v-toolbar-title",{staticClass:"pl-5"},[t._v("Kết quả đánh giá")]),a("v-spacer"),a("v-toolbar-items",[a("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.dialog_voting_result=!1}}},[a("v-icon",[t._v("close")])],1)],1)],1),a("v-card-text",[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:"",sm1:""}}),a("v-flex",{attrs:{xs12:"",sm10:""}},[Array.isArray(t.votingItems)&&t.votingItems.length>0?a("v-card",{staticClass:"py-1",attrs:{flat:""}},t._l(t.votingItems,function(e,i){return a("div",{key:i},[a("div",{staticClass:"text-bold primary--text"},[t._v("\n                  "+t._s(i+1)+". "+t._s(e.subject)+"\n                  "),a("i",{staticStyle:{color:"#ad1717"}},[t._v(" (Số lượt đánh giá: "+t._s(e.answersCount)+")")])]),a("v-card",{staticClass:"pl-2",attrs:{flat:""}},[a("v-card-text",{staticClass:"px-2 py-1 pr-0"},t._l(e["choices"],function(i,n){return a("div",{key:"rd"+n},[a("v-layout",{staticClass:"mb-2",attrs:{wrap:""}},[a("div",{staticClass:"flex xs6 sm8 pr-2"},[t._v(t._s(i)+" "),a("span",{staticClass:"text-bold",style:"color:"+t.barColor[n]},[t._v("("+t._s(e.answers[n])+")")])]),e.answersCount>0?a("progress-bar",{staticClass:"flex xs6 sm4",staticStyle:{"z-index":"10000"},attrs:{size:"16",spacing:1,"bar-transition":"all 1s ease",val:t.getPercent(e.answers,n),text:0!==t.getPercent(e.answers,n)?t.getPercent(e.answers,n)+"%":"","text-position":"inside","bg-color":"#e0e0e0","bar-color":t.barColor[n],"text-fg-color":"#fff"}}):t._e()],1)],1)}),0)],1)],1)}),0):a("div",{staticClass:"px-3"},[a("v-alert",{attrs:{outline:"",color:"warning",icon:"priority_high",value:!0}},[t._v("\n                Không có câu hỏi khảo sát\n              ")])],1),a("v-flex",{staticClass:"mt-4 text-xs-right",attrs:{xs12:"",sm12:""}},[a("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.dialog_voting_result=!1}}},[a("v-icon",{attrs:{size:"16"}},[t._v("reply")]),t._v(" \n                Quay lại \n              ")],1)],1)],1),a("v-flex",{attrs:{xs12:"",sm1:""}})],1)],1)],1)],1)],1)},yt=[],_t=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("span",[t._v("Kéo thả các ô vuông để cho đúng thứ tự")]),a("br"),a("v-flex",{staticClass:"text-xs-center",attrs:{xs12:"",sm12:""}},[a("v-chip",{staticStyle:{"background-color":"#81D4FA"},attrs:{label:"","text-color":"white"}},[t._v("\n      "+t._s(t.captcha)+"\n    ")])],1),a("div",{directives:[{name:"drag-and-drop",rawName:"v-drag-and-drop:options",value:t.options,expression:"options",arg:"options"}],staticClass:"drag-wrapper text-xs-center mt-3"},[a("ul",{attrs:{id:"captcha"}},t._l(t.arrCaptcha,function(e,i){return a("li",{key:i,staticClass:"item-captcha",staticStyle:{padding:"10px 15px","background-color":"#81D4FA","margin-right":"2px",color:"#fff","font-weight":"bold"}},[t._v(t._s(e))])}),0)])],1)},xt=[],bt=a("1157"),wt=a.n(bt),Ct={props:["index"],components:{},data:function(){return{options:{},arrCaptcha:[],captcha:"",currentlyDragging:null,loggedEvent:"",images:[{name:"Image 1",src:"http://placehold.it/100/000000/ffffff"},{name:"Image 2",src:"http://placehold.it/100/C93742/ffffff"},{name:"Image 3",src:"http://placehold.it/100/6894D1/ffffff"}]}},computed:{loading:function(){return this.$store.getters.loading}},created:function(){var t=this;t.makeRandomString(),t.shuffleArrCaptcha(t.arrCaptcha)},watch:{},methods:{makeRandomString:function(){for(var t=this,e="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=0;i<4;i++)e+=a.charAt(Math.floor(Math.random()*a.length));e&&(t.arrCaptcha=t.shuffleArrCaptcha(e.split(""))),t.captcha=e},shuffleArrCaptcha:function(t){var e=t.length,a=null,i=0;while(e>0)i=Math.floor(Math.random()*e),e--,a=t[e],t[e]=t[i],t[i]=a;return t},checkValidCaptcha:function(){for(var t=this,e="",a=wt()("#captcha").children(),i=0;i<a.length;i++)e+=a[i].innerHTML;return t.captcha===e}},filters:{dateTimeView:function(t){if(t){var e=new Date(t);return"".concat(e.getDate().toString().padStart(2,"0"),"/").concat((e.getMonth()+1).toString().padStart(2,"0"),"/").concat(e.getFullYear())}return""}}},kt=Ct,St=(a("cf0c"),a("cc20")),Vt=Object(c["a"])(kt,_t,xt,!1,null,null,null);Vt.options.__file="Captcha.vue";var Tt=Vt.exports;d()(Vt,{VChip:St["a"],VFlex:A["a"]});var It=a("854a"),Dt=a.n(It),Ft=a("a7e3"),Pt=a.n(Ft);i["a"].use(Dt.a),Dt.a.options={closeButton:!0,timeOut:"5000"};var Nt={props:["index"],components:{captcha:Tt,ProgressBar:Pt.a},data:function(){return{votingItems:[],btnLoading:!1,showCaptcha:!1,barColor:["#5cb85c","#f0ad4e","#d9534f","#2e4fc8","#2ec8bad9","#142f14"],dialog_voting_result:!1}},computed:{loading:function(){return this.$store.getters.loading}},created:function(){var t=this;t.$nextTick(function(){t.$store.dispatch("loadVoting",{className:"survey",classPk:0}).then(function(e){t.votingItems=e}).catch(function(t){})})},watch:{},methods:{viewListEmployee:function(t){this.$router.push({path:"/danh-sach-can-bo/"+t.itemCode,query:{itemName:t.itemName}})},doVottingResultSubmit:function(){var t=this;t.btnLoading=!0;var e=[],a=!1;for(var i in t.votingItems)t.votingItems[i]["className"]="survey",t.votingItems[i]["classPk"]=0,"0"!==String(t.votingItems[i]["selected"])&&(a=!0,e.push(t.$store.dispatch("submitVoting",t.votingItems[i])));a?Promise.all(e).then(function(e){Dt.a.success("Yêu cầu của bạn được thực hiện thành công."),t.btnLoading=!1,t.$refs.captcha&&t.$refs.captcha.makeRandomString(),t.$store.dispatch("loadVoting",{className:"survey",classPk:0}).then(function(e){t.votingItems=e}).catch(function(t){})}).catch(function(e){Dt.a.error("Yêu cầu của bạn thực hiện thất bại."),t.btnLoading=!1}):(t.btnLoading=!1,Dt.a.error("Bạn chưa chọn đánh giá nào"))},showVotingResult:function(){var t=this;t.$store.dispatch("loadVoting",{className:"survey",classPk:0}).then(function(e){t.votingItems=e,t.dialog_voting_result=!0}).catch(function(t){})},getPercent:function(t,e){for(var a=0,i=0,n=0;n<t.length;n++)a+=t[n];return i=(t[e]/a*100).toFixed(1),i}},filters:{}},Lt=Nt,At=a("0798"),Et=a("67b6"),zt=a("43a6"),Ot=a("71d9"),Mt=a("2a7f"),Ht=Object(c["a"])(Lt,gt,yt,!1,null,null,null);Ht.options.__file="Landing_v2.1.vue";var Rt=Ht.exports;d()(Ht,{VAlert:At["a"],VBtn:T["a"],VCard:I["a"],VCardText:D["b"],VDialog:P["a"],VFlex:A["a"],VIcon:z["a"],VLayout:O["a"],VRadio:Et["a"],VRadioGroup:zt["a"],VSpacer:B["a"],VToolbar:Ot["a"],VToolbarItems:Mt["a"],VToolbarTitle:Mt["b"]});var $t=[{path:"/",component:Rt,props:!0},{path:"/danh-sach-ho-so/:index",name:"Landing",component:function(){return a.e("Landing").then(a.bind(null,"306c"))},props:!0,meta:{requiresAuth:!1}},{path:"/danh-sach-ho-so/:index/tiep-nhan-ho-so/:id/:formCode",name:"TiepNhanHoSoDetail",component:function(){return a.e("TiepNhanHoSoDetail").then(a.bind(null,"d129"))},props:!0,meta:{requiresAuth:!1}},{path:"/danh-sach-ho-so/:index/bo-sung-ho-so/:id",name:"HoanThienBoSungHoSoDetail",component:function(){return a.e("HoanThienBoSungHoSoDetail").then(a.bind(null,"a35c"))},props:!0,meta:{requiresAuth:!1}},{path:"/danh-sach-ho-so/:index/ho-so/:id/:formCode",name:"DetailForward",component:ct,props:!0},{path:"*",name:"NotFound",component:ht}];i["a"].use(g["a"]);var Bt=new g["a"]({routes:$t}),jt=Bt,Gt=a("2f62"),Ut=a("bc3a"),Kt=a.n(Ut),qt=a("bbd0");i["a"].use(Dt.a),i["a"].use(Gt["a"]);var Xt=new Gt["a"].Store({state:{initData:{},loading:!1,index:0,endPointApi:"/o/rest/v2",isMobile:!1},actions:{loadInitResource:function(t){t.commit;var e=t.state;return new Promise(function(t,a){null!==window.themeDisplay&&void 0!==window.themeDisplay?(e.initData["groupId"]=window.themeDisplay.getScopeGroupId(),e.initData["user"]={userName:window.themeDisplay.getUserName(),userEmail:"",userId:window.themeDisplay.getUserId()}):(e.initData["groupId"]=0,e.initData["user"]={userName:"",userEmail:"",userId:20103}),t(e.initData)})},loadVoting:function(t,e){var a=t.commit,i=t.state;return new Promise(function(t,n){a("setLoading",!0),Xt.dispatch("loadInitResource").then(function(o){var s={headers:{groupId:i.initData.groupId}};Kt.a.get(i.endPointApi+"/postal/votings/"+e.className+"/"+e.classPk,s).then(function(e){if(e.data){for(var i=e.data.data,n=0;n<i.length;n++)i[n]["answerPercent"]=[],i[n]["averageScore"]=0;t(i)}else t([]);a("setLoading",!1)}).catch(function(t){n(t),a("setLoading",!1)})})})},loadGovAgencys:function(t,e){var a=t.commit,i=t.state;return new Promise(function(t,e){a("setLoading",!0),Xt.dispatch("loadInitResource").then(function(n){var o={headers:{groupId:i.initData.groupId}};Kt.a.get(qt.initData.dictcollectionsApi+"/GOVERNMENT_AGENCY/dictitems",o).then(function(e){e.data?t(e.data.data):t([]),a("setLoading",!1)}).catch(function(t){e(t),a("setLoading",!1)})})})},loadEmployees:function(t,e){var a=t.commit,i=t.state;return new Promise(function(t,n){a("setLoading",!0),Xt.dispatch("loadInitResource").then(function(o){var s={headers:{groupId:i.initData.groupId}};Kt.a.get(qt.initData.employeeApi+"/"+e.itemCode,s).then(function(e){e.data?t(e.data.data):t([]),a("setLoading",!1)}).catch(function(t){n(t),a("setLoading",!1)})})})},getEmployee:function(t,e){var a=t.commit,i=t.state;return new Promise(function(t,n){a("setLoading",!0),Xt.dispatch("loadInitResource").then(function(o){var s={headers:{groupId:i.initData.groupId}};Kt.a.get(qt.initData.detailEmployeeApi+"/"+e.employeeId,s).then(function(e){t(e.data),a("setLoading",!1)}).catch(function(t){n(t),a("setLoading",!1)})})})},checkPermisionVoting:function(t,e){t.commit;var a=t.state;return new Promise(function(t,i){Xt.dispatch("loadInitResource").then(function(){var n={headers:{groupId:a.initData.groupId},params:{applicantIdNo:e.applicantIdNo,dossierNo:e.dossierNo}};Kt.a.get("/o/rest/v2/votings/checkpermission",n).then(function(e){var a=e.data;t(a)}).catch(function(t){i(t)})})})},submitVoting:function(t,e){t.commit;var a=t.state;return new Promise(function(t,i){Xt.dispatch("loadInitResource").then(function(n){var o=new URLSearchParams,s={headers:{groupId:a.initData.groupId}};e.comment&&o.append("comment",e.comment),o.append("selected",e.selected),o.append("className",e.className),o.append("classPk",e.classPk),Kt.a.post(a.endPointApi+"/postal/votings/"+e.votingId+"/results",o,s).then(function(e){t(e.data)}).catch(function(t){i(t)})})})}},mutations:{setIndex:function(t,e){t.index=e},setInitData:function(t,e){t.initData=e},setLoading:function(t,e){t.loading=e},setIsMobile:function(t,e){t.isMobile=e}},getters:{loading:function(t){return t.loading},index:function(t){return t.index},getIsMobile:function(t){return t.isMobile}}}),Yt=a("967d"),Jt=a("d8c5"),Qt=a.n(Jt);a("d304");i["a"].use(Yt["default"]),i["a"].use(Qt.a);var Wt=void 0!==window.themeDisplay?window.themeDisplay.getScopeGroupId():0;Kt.a.defaults.withCredentials=!0,Kt.a.defaults.headers.common["Token"]=void 0!==window.Liferay?window.Liferay.authToken:"",Kt.a.defaults.headers.common["groupId"]=Wt,i["a"].config.productionTip=!0,i["a"].mixin({methods:{getScopeGroupId:function(){return null!==window.themeDisplay&&void 0!==window.themeDisplay?window.themeDisplay.getScopeGroupId():0},getAuthToken:function(){return null!==window.themeDisplay&&void 0!==window.themeDisplay?window.Liferay.authToken:""},getUserId:function(){return null!==window.themeDisplay&&void 0!==window.themeDisplay?window.themeDisplay.getUserId():0}}}),new i["a"]({router:jt,store:Xt,render:function(t){return t(h)}}).$mount("#app_survey")},"726e":function(t,e,a){},"74ef":function(t,e,a){},bbd0:function(t){t.exports={renderURLInit:"?p_p_id=FrontendWebVoting&p_p_lifecycle=2&p_p_state=exclusive&p_p_mode=view&p_p_resource_id=renderURLInit",initData:{votingApi:"/o/rest/v2/postal/votings",agenciesApi:"/o/rest/v2/serviceinfos/statistics/agencies",employeeApi:"/o/rest/v2/employees/publish",detailEmployeeApi:"/o/rest/v2/employees",dictcollectionsApi:"/o/rest/v2/dictcollections"}}},cf0c:function(t,e,a){"use strict";var i=a("726e"),n=a.n(i);n.a}});
//# sourceMappingURL=app.js.map