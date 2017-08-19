webpackJsonp([4],{1354:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.mapStateToProps=t.default=t.PAGE_ROUTE=void 0;var u,i,c=(n(613),n(612)),s=r(c),f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=n(0),m=r(p),y=n(1),h=r(y),b=n(175),v=n(1367),g=n(1376),O=(t.PAGE_ROUTE="/orders/:id/print",(u=(0,b.ajax)())(i=function(e){function t(){var e,n,r,l;a(this,t);for(var u=arguments.length,i=Array(u),c=0;c<u;c++)i[c]=arguments[c];return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),r.state={data:{}},r.columns=[{title:"名称",dataIndex:"name",key:"name"},{title:"规格",dataIndex:"spec",key:"spec"},{title:"型号",dataIndex:"model",key:"model"},{title:"单位",dataIndex:"unit",key:"unit",render:function(e){var t=v.units.find(function(t){return t.code===e});return t?t.name:e}},{title:"单个总量",dataIndex:"singleUnit",key:"singleUnit",render:function(e,t){var n=v.units.find(function(e){return e.code===t.unit});return n?""+e+n.shortName:e}},{title:"数量",dataIndex:"count",key:"count"},{title:"总量",dataIndex:"total",key:"total",render:function(e,t){var n=t.singleUnit,r=t.count,a=void 0===r?0:r,o=1e4*n*a,l=v.units.find(function(e){return e.code===t.unit});return l?""+o/1e4+l.shortName:o}}],l=n,o(r,l)}return l(t,e),d(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.params.id;this.props.$ajax.get("/orders/"+t).then(function(t){e.setState({data:t}),setTimeout(function(){var e=document.getElementById("frame-content").innerHTML;window.document.body.innerHTML=e,window.print()})})}},{key:"componentDidMount",value:function(){var e=this.props.actions;e.hidePageHeader(),e.hideSideBar()}},{key:"render",value:function(){var e=this.state.data,t=e.products||[],n={display:"inline-block",padding:"8px 16px"},r={display:"inline-block",width:60,textAlign:"right"},a={display:"inline-block",width:120,textAlign:"left"},o=g.orderStatus.find(function(t){return t.value===e.status}),l=o?o.label:"未知状态";return m.default.createElement("div",null,m.default.createElement("div",{style:{textAlign:"left"}},m.default.createElement("span",{style:n},m.default.createElement("span",{style:r},"订单编号："),m.default.createElement("span",{style:a},e.orderNum)),m.default.createElement("span",{style:n},m.default.createElement("span",{style:r},"订单状态："),m.default.createElement("span",{style:a},l))),m.default.createElement("div",{style:{textAlign:"left"}},m.default.createElement("span",{style:n},m.default.createElement("span",{style:r},"出货日期："),m.default.createElement("span",{style:a},(0,h.default)(e.deliveryTime).format("YYYY-MM-DD HH:mm:ss"))),m.default.createElement("span",{style:n},m.default.createElement("span",{style:r},"发起部门："),m.default.createElement("span",{style:a},e.sendOrgName)),m.default.createElement("span",{style:n},m.default.createElement("span",{style:r},"发起人："),m.default.createElement("span",{style:a},e.sendUserName))),m.default.createElement(s.default,{size:"small",style:{marginBottom:16},dataSource:t,columns:this.columns,rowKey:function(e){return e._id},pagination:!1}))}}]),t}(p.Component))||i);t.default=O;t.mapStateToProps=function(e){return f({},e.frame)}},1367:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.units=void 0;var u=(n(278),n(176)),i=r(u),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),d=r(f),p=n(1369),m=r(p),y=i.default.Option,h=t.units=m.default,b=function(e){function t(){var e,n,r,l;a(this,t);for(var u=arguments.length,i=Array(u),c=0;c<u;c++)i[c]=arguments[c];return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),r.state={},l=n,o(r,l)}return l(t,e),s(t,[{key:"render",value:function(){return d.default.createElement(i.default,c({placeholder:"请选择单位"},this.props),h.map(function(e){return d.default.createElement(y,{key:e.code},e.name)}))}}]),t}(f.Component);t.default=b},1369:function(e,t){e.exports=[{code:"squareMetre",name:"平米(㎡)",shortName:"㎡"},{code:"gen",name:"根",shortName:"根"},{code:"zhang",name:"张",shortName:"张"},{code:"kg",name:"千克(kg)",shortName:"kg"},{code:"g",name:"克(g)",shortName:"g"},{code:"t",name:"吨(t)",shortName:"t"},{code:"ge",name:"个",shortName:"个"},{code:"box",name:"箱",shortName:"箱"},{code:"package",name:"包",shortName:"包"},{code:"reel",name:"卷",shortName:"卷"},{code:"bundle",name:"捆",shortName:"捆"},{code:"other",name:"其他",shortName:"其他"}]},1376:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.orderStatus=void 0;var u=(n(278),n(176)),i=r(u),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),d=r(f),p=n(1378),m=r(p),y=i.default.Option;t.orderStatus=m.default;var h=function(e){function t(){var e,n,r,l;a(this,t);for(var u=arguments.length,i=Array(u),c=0;c<u;c++)i[c]=arguments[c];return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),r.state={},l=n,o(r,l)}return l(t,e),s(t,[{key:"render",value:function(){return d.default.createElement(i.default,c({placeholder:"请选择状态"},this.props),m.default.map(function(e){return d.default.createElement(y,{key:e.value},e.label)}))}}]),t}(f.Component);t.default=h},1378:function(e,t){e.exports=[{value:"0",label:"审核中"},{value:"1",label:"审核通过"},{value:"2",label:"驳回"},{value:"3",label:"作废"},{value:"4",label:"生产中"},{value:"5",label:"配送中"},{value:"6",label:"已完成"}]}});