webpackJsonp([13],{1374:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.PAGE_ROUTE=void 0;var u,s,l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),d=n(c),p=r(111),f=r(63),h=r(137),m=r(83),y=r(1),b=n(y),v=r(49),_=r(1412),w=(t.PAGE_ROUTE="/orders",(u=(0,h.ajax)())(s=function(e){function t(){var e,r,n,i;o(this,t);for(var u=arguments.length,s=Array(u),l=0;l<u;l++)s[l]=arguments[l];return r=n=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.state={total:0,dataSource:[]},n.queryItems=[[{type:"input",field:"orderNum",label:"订单编号",labelSpaceCount:4,width:250,placeholder:"请输入订单编号"},{type:"select",field:"status",label:"订单状态",labelSpaceCount:4,width:200,placeholder:"请选择订单状态",elementProps:{options:_.orderStatus}}]],n.toolItems=[{type:"primary",text:"发起订单",permission:"ORDER_ADD",onClick:function(){n.props.router.push("/orders/send")}}],n.columns=[{title:"订单编号",width:120,dataIndex:"orderNum",render:function(e,t){return d.default.createElement(p.Link,{to:"/orders/send/+edit/"+t._id+"?detail=true"},e)}},{title:"订单总价",width:100,dataIndex:"totalPrice",render:function(e){return e?(0,m.formatCurrency)(e):e}},{title:"优惠金额",width:100,dataIndex:"discount",render:function(e){return e?(0,m.formatCurrency)(e):e}},{title:"优惠后总价",width:100,dataIndex:"afterDiscountTotalPrice",render:function(e){return e?(0,m.formatCurrency)(e):e}},{title:"发起人",width:80,dataIndex:"sendUserName"},{title:"发起部门",width:150,dataIndex:"sendOrgName"},{title:"接收部门",width:150,dataIndex:"receiveOrgName"},{title:"接收人",width:80,dataIndex:"receiveUserName"},{title:"下单日期",width:150,dataIndex:"sendTime",render:function(e){return e?(0,b.default)(e).format("YYYY-MM-DD HH:mm:ss"):e}},{title:"出货日期",width:150,dataIndex:"deliveryTime",render:function(e){return e?(0,b.default)(e).format("YYYY-MM-DD HH:mm:ss"):e}},{title:"驳回原因",width:150,dataIndex:"rejectReason"},{title:"作废原因",width:150,dataIndex:"destroyReason"},{title:"备注",dataIndex:"remark"},{title:"状态",width:80,fixed:"right",dataIndex:"status",render:function(e){var t=_.orderStatus.find(function(t){return t.value===e});return t?t.label:""}},{title:"操作",width:200,fixed:"right",key:"operator",render:function(e,t){var r={label:"审核通过",permission:"ORDER_PASS",confirm:{title:"您确定要审核通过此订单？",onConfirm:function(){n.props.$ajax.put("/orders/pass",{id:t._id},{successTip:"通过成功！"}).then(function(){n.handleSearch(n.state.params)})}}},o={type:"prompt",label:"驳回",permission:"ORDER_REJECT",title:"驳回原因",okText:"驳回",inputProps:{rows:3,placeholder:"请输入驳回原因"},decorator:{rules:[{required:!0,message:"请输入驳回原因！"}]},onConfirm:function(e){var r={id:t._id,rejectReason:e};n.props.$ajax.put("/orders/reject",r,{successTip:"驳回成功！"}).then(function(){n.handleSearch(n.state.params)})}},a={type:"prompt",label:"作废",permission:"ORDER_DESTROY",title:"作废原因",okText:"作废",inputProps:{rows:3,placeholder:"请输入作废原因"},decorator:{rules:[{required:!0,message:"请输入作废原因！"}]},onConfirm:function(e){var r={id:t._id,destroyReason:e};n.props.$ajax.put("/orders/destroy",r,{successTip:"作废成功！"}).then(function(){n.handleSearch(n.state.params)})}},i={label:"重新发起",permission:"ORDER_UPDATE",onClick:function(){n.props.router.push("/orders/send/+edit/"+t._id)}},u={label:"完成",permission:"ORDER_COMPLETE",confirm:{title:"您确定要完成此订单？",onConfirm:function(){n.props.$ajax.put("/orders/complete",{id:t._id},{successTip:"订单已完成！"}).then(function(){n.handleSearch(n.state.params)})}}},s=t.status,l=t.receiveOrgId,c=t.sendOrgId,p=n.props.$currentLoginUser||{},h=p.org_id,m=[];return"0"===s&&l===h&&(m=[r,u,o,a]),"1"===s&&l===h&&(m=[u,o,a]),"2"===s&&c===h&&(m=[i,a]),d.default.createElement(f.Operator,{items:m,hasPermission:v.hasPermission})}}],n.handleSearch=function(e){return n.setState({params:e}),n.props.$ajax.get("/orders",e).then(function(e){n.setState({total:e.totalCount,dataSource:e.results})})},i=r,a(n,i)}return i(t,e),l(t,[{key:"render",value:function(){var e=this.state,t=e.total,r=e.dataSource;return d.default.createElement(f.ListPage,{hasPermission:v.hasPermission,queryItems:this.queryItems,showSearchButton:!0,showResetButton:!1,toolItems:this.toolItems,columns:this.columns,onSearch:this.handleSearch,dataSource:r,rowKey:function(e){return e._id},total:t,tableProps:{scroll:{x:2200}}})}}]),t}(c.Component))||s);t.default=w},1412:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.orderStatus=void 0;var u=(r(177),r(138)),s=n(u),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},c=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),d=r(0),p=n(d),f=s.default.Option,h=t.orderStatus=[{value:"0",label:"审核中"},{value:"1",label:"审核通过"},{value:"2",label:"驳回"},{value:"3",label:"作废"},{value:"4",label:"生产中"},{value:"5",label:"配送中"},{value:"6",label:"已完成"}],m=function(e){function t(){var e,r,n,i;o(this,t);for(var u=arguments.length,s=Array(u),l=0;l<u;l++)s[l]=arguments[l];return r=n=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.state={},i=r,a(n,i)}return i(t,e),c(t,[{key:"render",value:function(){return p.default.createElement(s.default,l({placeholder:"请选择状态"},this.props),h.map(function(e){return p.default.createElement(f,{key:e.value},e.label)}))}}]),t}(d.Component);t.default=m}});