webpackJsonp([7],{1375:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.PAGE_ROUTE=void 0;var l,s,u=(r(35),r(31)),c=n(u),d=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),f=r(0),p=n(f),h=r(111),m=r(43),b=r(176),y=r(83),v=r(1),_=n(v),w=r(50),O=r(1398),E=(t.PAGE_ROUTE="/orders",(l=(0,b.ajax)())(s=function(e){function t(){var e,r,n,i;a(this,t);for(var l=arguments.length,s=Array(l),u=0;u<l;u++)s[u]=arguments[u];return r=n=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.state={total:0,dataSource:[]},n.queryItems=[[{type:"input",field:"orderNum",label:"订单编号",labelSpaceCount:4,width:250,placeholder:"请输入订单编号"},{type:"select",field:"status",label:"订单状态",labelSpaceCount:4,width:200,placeholder:"请选择订单状态",elementProps:{allowClear:!0,options:O.orderStatus}},{type:"data-range",label:"出货日期",field:"date",placeholder:["开始时间","结束时间"],width:300,labelSpaceCount:4}]],n.toolItems=[{type:"primary",text:"发起订单",visible:(0,w.hasPermission)("ORDER_ADD"),onClick:function(){n.props.router.push("/orders/send")}},{visible:(0,w.hasPermission)("ORDER_EXPORT"),getComponent:function(){var e=n.state.params,t=(0,y.mosaicUrl)((0,w.getAjaxBaseUrl)()+"/orders/excel",e);return p.default.createElement("a",{href:t},p.default.createElement(c.default,{type:"ghost"},"导出Excel"))}}],n.columns=[{title:"订单编号",width:120,dataIndex:"orderNum",render:function(e,t){return p.default.createElement(h.Link,{to:"/orders/send/+edit/"+t._id+"?detail=true"},e)}},{title:"订单总价",width:100,dataIndex:"totalPrice",render:function(e){return e?(0,y.formatCurrency)(e):e}},{title:"优惠金额",width:100,dataIndex:"discount",render:function(e){return e?(0,y.formatCurrency)(e):e}},{title:"优惠后总价",width:100,dataIndex:"afterDiscountTotalPrice",render:function(e){return e?(0,y.formatCurrency)(e):e}},{title:"发起人",width:80,dataIndex:"sendUserName"},{title:"发起部门",width:150,dataIndex:"sendOrgName"},{title:"接收部门",width:150,dataIndex:"receiveOrgName"},{title:"下单日期",width:150,dataIndex:"sendTime",render:function(e){return e?(0,_.default)(e).format("YYYY-MM-DD HH:mm:ss"):e}},{title:"出货日期",width:150,dataIndex:"deliveryTime",render:function(e){return e?(0,_.default)(e).format("YYYY-MM-DD HH:mm:ss"):e}},{title:"驳回原因",width:150,dataIndex:"rejectReason"},{title:"作废原因",width:150,dataIndex:"destroyReason"},{title:"备注",dataIndex:"remark"},{title:"状态",width:80,fixed:"right",dataIndex:"statusName"},{title:"操作",width:200,fixed:"right",key:"operator",render:function(e,t){var r={label:"审核通过",visible:(0,w.hasPermission)("ORDER_PASS"),confirm:{title:"您确定要审核通过此订单？",onConfirm:function(){n.props.$ajax.put("/orders/pass",{id:t._id},{successTip:"通过成功！"}).then(function(){n.handleSearch(n.state.params)})}}},a={label:"驳回",visible:(0,w.hasPermission)("ORDER_REJECT"),prompt:{title:"驳回原因",okText:"驳回",inputProps:{rows:3,placeholder:"请输入驳回原因"},decorator:{rules:[{required:!0,message:"请输入驳回原因！"}]},onConfirm:function(e){var r={id:t._id,rejectReason:e};n.props.$ajax.put("/orders/reject",r,{successTip:"驳回成功！"}).then(function(){n.handleSearch(n.state.params)})}}},o={label:"作废",visible:(0,w.hasPermission)("ORDER_DESTROY"),prompt:{title:"作废原因",okText:"作废",inputProps:{rows:3,placeholder:"请输入作废原因"},decorator:{rules:[{required:!0,message:"请输入作废原因！"}]},onConfirm:function(e){var r={id:t._id,destroyReason:e};n.props.$ajax.put("/orders/destroy",r,{successTip:"作废成功！"}).then(function(){n.handleSearch(n.state.params)})}}},i={label:"重新发起",visible:(0,w.hasPermission)("ORDER_UPDATE"),onClick:function(){n.props.router.push("/orders/send/+edit/"+t._id)}},l={label:"完成",visible:(0,w.hasPermission)("ORDER_COMPLETE"),confirm:{title:"您确定要完成此订单？",onConfirm:function(){n.props.$ajax.put("/orders/complete",{id:t._id},{successTip:"订单已完成！"}).then(function(){n.handleSearch(n.state.params)})}}},s=t.status,u=t.receiveOrgId,c=t.sendOrgId,d=n.props.$currentLoginUser||{},f=d.org_id,h=[];return"0"===s&&u===f&&(h=[r,l,a,o]),"1"===s&&u===f&&(h=[l,a,o]),"2"===s&&c===f&&(h=[i,o]),p.default.createElement(m.Operator,{items:h})}}],n.handleSearch=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.date;return t&&t.length?(e.startDate=t[0].format("YYYY-MM-DD"),e.endDate=t[1].format("YYYY-MM-DD")):(Reflect.deleteProperty(e,"startDate"),Reflect.deleteProperty(e,"endDate")),n.setState({params:e}),n.props.$ajax.get("/orders",e).then(function(e){n.setState({total:e.totalCount,dataSource:e.results})})},i=r,o(n,i)}return i(t,e),d(t,[{key:"render",value:function(){var e=this.state,t=e.total,r=e.dataSource;return p.default.createElement("div",null,p.default.createElement(m.ListPage,{queryItems:this.queryItems,showSearchButton:!0,showResetButton:!1,toolItems:this.toolItems,columns:this.columns,onSearch:this.handleSearch,dataSource:r,rowKey:function(e){return e._id},total:t,tableProps:{scroll:{x:2200}}}))}}]),t}(f.Component))||s);t.default=E},1398:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.orderStatus=void 0;var l=(r(279),r(177)),s=n(l),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},c=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),d=r(0),f=n(d),p=r(1400),h=n(p),m=s.default.Option;t.orderStatus=h.default;var b=function(e){function t(){var e,r,n,i;a(this,t);for(var l=arguments.length,s=Array(l),u=0;u<l;u++)s[u]=arguments[u];return r=n=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.state={},i=r,o(n,i)}return i(t,e),c(t,[{key:"render",value:function(){return f.default.createElement(s.default,u({placeholder:"请选择状态"},this.props),h.default.map(function(e){return f.default.createElement(m,{key:e.value},e.label)}))}}]),t}(d.Component);t.default=b},1400:function(e,t){e.exports=[{value:"0",label:"审核中"},{value:"1",label:"审核通过"},{value:"2",label:"驳回"},{value:"3",label:"作废"},{value:"4",label:"生产中"},{value:"5",label:"配送中"},{value:"6",label:"已完成"}]}});