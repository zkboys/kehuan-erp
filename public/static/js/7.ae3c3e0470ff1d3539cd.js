webpackJsonp([7],{1357:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.PAGE_ROUTE=void 0;var u,i,c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),s=function(e){return e&&e.__esModule?e:{default:e}}(l),f=n(41),d=n(175),p=n(84),m=n(1367),h=n(52),y=(t.PAGE_ROUTE="/products",(u=(0,d.ajax)())(i=function(e){function t(){var e,n,a,u;r(this,t);for(var i=arguments.length,c=Array(i),l=0;l<i;l++)c[l]=arguments[l];return n=a=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),a.state={total:0,dataSource:[]},a.queryItems=[[{type:"input",field:"name",label:"名称",labelSpaceCount:2,width:200,placeholder:"请输入名称"},{type:"input",field:"spec",label:"规格",labelSpaceCount:2,width:200,placeholder:"请输入规格"},{type:"input",field:"model",label:"型号",labelSpaceCount:2,width:200,placeholder:"请输入型号"}]],a.toolItems=[{type:"primary",text:"添加",visible:(0,h.hasPermission)("PRODUCT_ADD"),onClick:function(){a.props.router.push("/products/+edit/:id")}}],a.columns=[{title:"名称",dataIndex:"name",key:"name"},{title:"规格",dataIndex:"spec",key:"spec"},{title:"型号",dataIndex:"model",key:"model"},{title:"单位",dataIndex:"unit",key:"unit",render:function(e){var t=m.units.find(function(t){return t.code===e});return t?t.name:e}},{title:"单价",dataIndex:"unitPrice",key:"unitPrice",render:function(e,t){var n=m.units.find(function(e){return e.code===t.unit});return n?(0,p.formatCurrency)(e)+"/"+n.shortName:e}},{title:"单个总量",dataIndex:"singleUnit",key:"singleUnit",render:function(e,t){var n=m.units.find(function(e){return e.code===t.unit});return n?""+e+n.shortName:e}},{title:"单个总价",dataIndex:"singleUnitPrice",key:"singleUnitPrice",render:function(e){return""+(0,p.formatCurrency)(e)}},{title:"库存总数",dataIndex:"stockCount",key:"stockCount",render:function(e){return e<h.STOCK_THRESHOLD_COUNT?s.default.createElement("span",{style:{color:"red"}},e):e}},{title:"库存总量",dataIndex:"stockTotal",key:"stockTotal",render:function(e,t){if(!e)return"";var n=e,r=m.units.find(function(e){return e.code===t.unit});return r&&(n=""+e+r.shortName),t.stockCount<h.STOCK_THRESHOLD_COUNT?s.default.createElement("span",{style:{color:"red"}},n):n}},{title:"备注",dataIndex:"remark",key:"remark"},{title:"操作",key:"operator",render:function(e,t){var n=t._id,r=t.name,o="删除“"+r+"”成功！",u=[{label:"修改",visible:(0,h.hasPermission)("PRODUCT_UPDATE"),onClick:function(){a.props.router.push("/products/+edit/"+n)}},{label:"删除",visible:(0,h.hasPermission)("PRODUCT_DELETE"),confirm:{title:"您确定要删除“"+r+"”？",onConfirm:function(){a.props.$ajax.del("/products/"+n,null,{successTip:o}).then(function(){var e=a.state.dataSource.filter(function(e){return e._id!==n});a.setState({dataSource:e})})}}}];return s.default.createElement(f.Operator,{items:u})}}],a.handleSearch=function(e){return a.props.$ajax.get("/products",e).then(function(e){a.setState({total:e.totalCount,dataSource:e.results})})},u=n,o(a,u)}return a(t,e),c(t,[{key:"render",value:function(){var e=this.state,t=e.total,n=e.dataSource;return s.default.createElement(f.ListPage,{queryItems:this.queryItems,showSearchButton:!0,showResetButton:!1,toolItems:this.toolItems,columns:this.columns,onSearch:this.handleSearch,dataSource:n,rowKey:function(e){return e._id},total:t})}}]),t}(l.Component))||i);t.default=y},1367:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.units=void 0;var i=(n(278),n(176)),c=r(i),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),d=r(f),p=n(1369),m=r(p),h=c.default.Option,y=t.units=m.default,b=function(e){function t(){var e,n,r,u;o(this,t);for(var i=arguments.length,c=Array(i),l=0;l<i;l++)c[l]=arguments[l];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),r.state={},u=n,a(r,u)}return u(t,e),s(t,[{key:"render",value:function(){return d.default.createElement(c.default,l({placeholder:"请选择单位"},this.props),y.map(function(e){return d.default.createElement(h,{key:e.code},e.name)}))}}]),t}(f.Component);t.default=b},1369:function(e,t){e.exports=[{code:"squareMetre",name:"平米(㎡)",shortName:"㎡"},{code:"gen",name:"根",shortName:"根"},{code:"zhang",name:"张",shortName:"张"},{code:"kg",name:"千克(kg)",shortName:"kg"},{code:"g",name:"克(g)",shortName:"g"},{code:"t",name:"吨(t)",shortName:"t"},{code:"ge",name:"个",shortName:"个"},{code:"box",name:"箱",shortName:"箱"},{code:"package",name:"包",shortName:"包"},{code:"reel",name:"卷",shortName:"卷"},{code:"bundle",name:"捆",shortName:"捆"},{code:"other",name:"其他",shortName:"其他"}]}});