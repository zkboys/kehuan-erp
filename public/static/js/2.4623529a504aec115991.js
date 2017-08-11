webpackJsonp([2],{1363:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.PAGE_ROUTE=void 0;var i,c,l,u=(n(605),n(604)),p=a(u),f=(n(36),n(65)),h=a(f),y=(n(83),n(82)),g=a(y),v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},k=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),K=n(0),b=a(K),m=n(45),x=n(174),N=n(110),E=n(1380),S=a(E),D="UN_SAVED_NEW_NODE_KEY",C=(t.PAGE_ROUTE="/system/organization",i=g.default.create(),c=(0,x.ajax)(),i(l=c(l=function(e){function t(){var e,n,a,d;o(this,t);for(var i=arguments.length,c=Array(i),l=0;l<i;l++)c[l]=arguments[l];return n=a=s(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),a.state={dataSource:[],selectedKey:""},a.handleAddNewNode=function(e){var t=[].concat(r(a.state.dataSource)),n=a.props.form.setFieldsValue,o={key:D,parentKey:e,text:"新增节点",order:100};t.push(o),n(o),a.setState({dataSource:t,selectedKey:D})},a.handleTreeSelect=function(e){if(e){console.log(e);(0,a.props.form.setFieldsValue)({key:e.key,parentKey:e.parentKey,text:e.name,description:e.description,order:e.order}),a.setState({selectedKey:e.key})}},a.handleSubmit=function(e){var t=a.state.dataSource,n=a.props.$ajax,r=t.find(function(e){return e.key===D}),o=void 0;e.name=e.text,r?(e.key=null,e.parentId=e.parentKey,o="添加成功！",n.post("/system/organizations",e,{successTip:o}).then(function(e){var n=e,r=t.filter(function(e){return e.key!==D});n.text=n.name,n.key=n._id,n.parentKey=n.parentId,r.push(n),a.setState({dataSource:r,selectedKey:n.key}),a.handleTreeSelect(n)})):(o="修改成功！",n.put("/system/organizations",e,{successTip:o}).then(function(){var n=t.filter(function(t){return t.key!==e.key});n.push(e),a.setState({dataSource:n,selectedKey:e.key}),a.handleTreeSelect(e)}))},a.handleDelete=function(){var e=a.state,t=e.dataSource,n=e.selectedKey;if(n===D){var r=t.filter(function(e){return e.key!==D});a.setState({dataSource:r}),a.props.form.resetFields(),a.setState({selectedKey:""})}else a.props.$ajax.del("/system/organizations/"+n,null,{successTip:"删除成功！"}).then(function(){a.props.form.resetFields();var e=(0,N.getGenerationsByKey)(t,n),r=e.map(function(e){return e.key}),o=t.filter(function(e){return!r.includes(e.key)});a.setState({dataSource:o,selectedKey:""})})},d=n,s(a,d)}return d(t,e),k(t,[{key:"componentWillMount",value:function(){var e=this;this.props.$ajax.get("/system/organizations").then(function(t){var n=(t||[]).map(function(e){return v({key:e._id,parentKey:e.parentId,text:e.name},e)});console.log(n),e.setState({dataSource:n})})}},{key:"render",value:function(){var e=this.props,t=e.form,n=e.form.getFieldDecorator,a=this.state,r=a.dataSource,o=a.selectedKey,s=!o;return b.default.createElement(m.PageContent,null,b.default.createElement(S.default,{form:t,dataSource:r,selectedKey:o,unSavedNewNodeKey:D,onSelect:this.handleTreeSelect,onDelete:this.handleDelete,onSubmit:this.handleSubmit,onAddTopNode:this.handleAddNewNode,onAddSubNode:this.handleAddNewNode},b.default.createElement(g.default,{onSubmit:this.handleSubmit,style:{marginTop:12}},n("key")(b.default.createElement(h.default,{type:"hidden"})),n("parentKey")(b.default.createElement(h.default,{type:"hidden"})),b.default.createElement(m.FormItemLayout,{label:"名称",labelSpaceCount:3,width:300},n("text",{rules:[{required:!0,message:"请输入名称！"}]})(b.default.createElement(h.default,{placeholder:"请输入名称",disabled:s}))),b.default.createElement(m.FormItemLayout,{label:"描述",labelSpaceCount:3,width:300},n("description",{rules:[{required:!1,message:"请输入描述！"}]})(b.default.createElement(h.default,{type:"textarea",placeholder:"请输入描述",disabled:s}))),b.default.createElement(m.FormItemLayout,{label:"排序",labelSpaceCount:3,width:300},n("order",{rules:[{required:!1,message:"请输入菜单排序"}]})(b.default.createElement(p.default,{style:{width:"100%"},step:1,placeholder:"请输入整数",disabled:s}))))))}}]),t}(K.Component))||l)||l);t.default=C},1372:function(e,t,n){"use strict";function a(){}n.d(t,"b",function(){return C});var r=n(4),o=n.n(r),s=n(9),d=n.n(s),i=n(51),c=n.n(i),l=n(3),u=n.n(l),p=n(7),f=n.n(p),h=n(6),y=n.n(h),g=n(5),v=n.n(g),k=n(0),K=n.n(k),b=n(2),m=n.n(b),x=n(8),N=n.n(x),E=n(23),S=n.n(E),D=n(1375),C={rcTree:m.a.shape({selectable:m.a.bool})},O=function(e){function t(e){u()(this,t);var a=y()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.onCheck=function(e){var t=!e.props.checked;e.props.halfChecked&&(t=!0);var r=e.props.eventKey,o=[].concat(c()(a.state.checkedKeys)),s=o.indexOf(r),d={event:"check",node:e,checked:t};if(a.props.checkStrictly){t&&-1===s&&o.push(r),!t&&s>-1&&o.splice(s,1),d.checkedNodes=[],n.i(D.a)(a.props.children,function(e,t,n,a){-1!==o.indexOf(a)&&d.checkedNodes.push(e)}),"checkedKeys"in a.props||a.setState({checkedKeys:o});var i=a.props.checkedKeys?a.props.checkedKeys.halfChecked:[];a.props.onCheck(n.i(D.b)(o,i),d)}else{t&&-1===s&&(a.treeNodesStates[e.props.pos].checked=!0,n.i(D.c)(a.treeNodesStates,e.props.pos,!0)),t||(a.treeNodesStates[e.props.pos].checked=!1,a.treeNodesStates[e.props.pos].halfChecked=!1,n.i(D.c)(a.treeNodesStates,e.props.pos,!1));var l=n.i(D.d)(a.treeNodesStates);d.checkedNodes=l.checkedNodes,d.checkedNodesPositions=l.checkedNodesPositions,d.halfCheckedKeys=l.halfCheckedKeys,a.checkKeys=l,a._checkedKeys=o=l.checkedKeys,"checkedKeys"in a.props||a.setState({checkedKeys:o}),a.props.onCheck(o,d)}},a.onKeyDown=function(e){e.preventDefault()},a.checkedKeysChange=!0,a.state={expandedKeys:a.getDefaultExpandedKeys(e),checkedKeys:a.getDefaultCheckedKeys(e),selectedKeys:a.getDefaultSelectedKeys(e),dragNodesKeys:"",dragOverNodeKey:"",dropNodeKey:""},a}return v()(t,e),f()(t,[{key:"getChildContext",value:function(){return{rcTree:{selectable:this.props.selectable}}}},{key:"componentWillReceiveProps",value:function(e){var t=this.getDefaultExpandedKeys(e,!0),n=this.getDefaultCheckedKeys(e,!0),a=this.getDefaultSelectedKeys(e,!0),r={};t&&(r.expandedKeys=t),n&&(e.checkedKeys===this.props.checkedKeys?this.checkedKeysChange=!1:this.checkedKeysChange=!0,r.checkedKeys=n),a&&(r.selectedKeys=a),this.setState(r)}},{key:"onDragStart",value:function(e,t){this.dragNode=t,this.dragNodesKeys=this.getDragNodes(t);var n={dragNodesKeys:this.dragNodesKeys},a=this.getExpandedKeys(t,!1);a&&(this.getRawExpandedKeys(),n.expandedKeys=a),this.setState(n),this.props.onDragStart({event:e,node:t}),this._dropTrigger=!1}},{key:"onDragEnterGap",value:function(e,t){var a=n.i(D.e)(t.refs.selectHandle).top,r=t.refs.selectHandle.offsetHeight,o=e.pageY;return o>a+r-2?(this.dropPosition=1,1):o<a+2?(this.dropPosition=-1,-1):(this.dropPosition=0,0)}},{key:"onDragEnter",value:function(e,t){var n=this,a=this.onDragEnterGap(e,t);if(this.dragNode.props.eventKey===t.props.eventKey&&0===a)return void this.setState({dragOverNodeKey:""});this.setState({dragOverNodeKey:t.props.eventKey}),this.delayedDragEnterLogic||(this.delayedDragEnterLogic={}),Object.keys(this.delayedDragEnterLogic).forEach(function(e){clearTimeout(n.delayedDragEnterLogic[e])}),this.delayedDragEnterLogic[t.props.pos]=setTimeout(function(){var a=n.getExpandedKeys(t,!0);a&&(n.getRawExpandedKeys(),n.setState({expandedKeys:a})),n.props.onDragEnter({event:e,node:t,expandedKeys:a&&[].concat(c()(a))||[].concat(c()(n.state.expandedKeys))})},400)}},{key:"onDragOver",value:function(e,t){this.props.onDragOver({event:e,node:t})}},{key:"onDragLeave",value:function(e,t){this.props.onDragLeave({event:e,node:t})}},{key:"onDrop",value:function(e,t){var n=t.props.eventKey;if(this.setState({dragOverNodeKey:"",dropNodeKey:n}),this.dragNodesKeys.indexOf(n)>-1)return S()(!1,"can not drop to dragNode(include it's children node)"),!1;var a=t.props.pos.split("-"),r={event:e,node:t,dragNode:this.dragNode,dragNodesKeys:[].concat(c()(this.dragNodesKeys)),dropPosition:this.dropPosition+Number(a[a.length-1])};0!==this.dropPosition&&(r.dropToGap=!0),"expandedKeys"in this.props&&(r.rawExpandedKeys=[].concat(c()(this._rawExpandedKeys))||[].concat(c()(this.state.expandedKeys))),this.props.onDrop(r),this._dropTrigger=!0}},{key:"onDragEnd",value:function(e,t){this.setState({dragOverNodeKey:""}),this.props.onDragEnd({event:e,node:t})}},{key:"onExpand",value:function(e){var t=this,n=!e.props.expanded,a="expandedKeys"in this.props,r=[].concat(c()(this.state.expandedKeys)),o=r.indexOf(e.props.eventKey);if(n&&-1===o?r.push(e.props.eventKey):!n&&o>-1&&r.splice(o,1),a||this.setState({expandedKeys:r}),this.props.onExpand(r,{node:e,expanded:n}),n&&this.props.loadData)return this.props.loadData(e).then(function(){a||t.setState({expandedKeys:r})})}},{key:"onSelect",value:function(e){var t=this.props,a=[].concat(c()(this.state.selectedKeys)),r=e.props.eventKey,o=a.indexOf(r),s=void 0;-1!==o?(s=!1,a.splice(o,1)):(s=!0,t.multiple||(a.length=0),a.push(r));var d=[];a.length&&n.i(D.a)(this.props.children,function(e){-1!==a.indexOf(e.key)&&d.push(e)});var i={event:"select",node:e,selected:s,selectedNodes:d};"selectedKeys"in this.props||this.setState({selectedKeys:a}),t.onSelect(a,i)}},{key:"onMouseEnter",value:function(e,t){this.props.onMouseEnter({event:e,node:t})}},{key:"onMouseLeave",value:function(e,t){this.props.onMouseLeave({event:e,node:t})}},{key:"onContextMenu",value:function(e,t){var n=t.props.eventKey;this.setState({selectedKeys:[n]}),this.props.onRightClick({event:e,node:t})}},{key:"getFilterExpandedKeys",value:function(e,t,a){var r=e[t];if(!a&&!e.autoExpandParent)return r||[];var o=[];e.autoExpandParent&&n.i(D.a)(e.children,function(e,t,n,a){r.indexOf(a)>-1&&o.push(n)});var s={};n.i(D.a)(e.children,function(t,r,d,i){if(a)s[i]=!0;else if(e.autoExpandParent){var c=o.some(function(e){return n.i(D.f)(d.split("-"),e.split("-"))});c&&(s[i]=!0)}});var d=Object.keys(s);return d.length?d:r}},{key:"getDefaultExpandedKeys",value:function(e,t){var n=t?void 0:this.getFilterExpandedKeys(e,"defaultExpandedKeys",!e.defaultExpandedKeys.length&&e.defaultExpandAll);return"expandedKeys"in e&&(n=(e.autoExpandParent?this.getFilterExpandedKeys(e,"expandedKeys",!1):e.expandedKeys)||[]),n}},{key:"getDefaultCheckedKeys",value:function(e,t){var n=t?void 0:e.defaultCheckedKeys;return"checkedKeys"in e&&(n=e.checkedKeys||[],e.checkStrictly&&(e.checkedKeys.checked?n=e.checkedKeys.checked:Array.isArray(e.checkedKeys)||(n=[]))),n}},{key:"getDefaultSelectedKeys",value:function(e,t){var n=function(t){return e.multiple?[].concat(c()(t)):t.length?[t[0]]:t},a=t?void 0:n(e.defaultSelectedKeys);return"selectedKeys"in e&&(a=n(e.selectedKeys)),a}},{key:"getRawExpandedKeys",value:function(){!this._rawExpandedKeys&&"expandedKeys"in this.props&&(this._rawExpandedKeys=[].concat(c()(this.state.expandedKeys)))}},{key:"getOpenTransitionName",value:function(){var e=this.props,t=e.openTransitionName,n=e.openAnimation;return t||"string"!=typeof n||(t=e.prefixCls+"-open-"+n),t}},{key:"getDragNodes",value:function(e){var t=[],a=e.props.pos.split("-");return n.i(D.a)(this.props.children,function(r,o,s,d){var i=s.split("-");(e.props.pos===s||a.length<i.length&&n.i(D.f)(a,i))&&t.push(d)}),t}},{key:"getExpandedKeys",value:function(e,t){var n=e.props.eventKey,a=this.state.expandedKeys,r=a.indexOf(n),o=void 0;return r>-1&&!t?(o=[].concat(c()(a)),o.splice(r,1),o):t&&-1===a.indexOf(n)?a.concat([n]):void 0}},{key:"filterTreeNode",value:function(e){var t=this.props.filterTreeNode;return"function"==typeof t&&!e.props.disabled&&t.call(this,e)}},{key:"renderTreeNode",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=this.state,r=this.props,o=n+"-"+t,s=e.key||o,d={root:this,eventKey:s,pos:o,loadData:r.loadData,prefixCls:r.prefixCls,showIcon:r.showIcon,draggable:r.draggable,dragOver:a.dragOverNodeKey===s&&0===this.dropPosition,dragOverGapTop:a.dragOverNodeKey===s&&-1===this.dropPosition,dragOverGapBottom:a.dragOverNodeKey===s&&1===this.dropPosition,_dropTrigger:this._dropTrigger,expanded:-1!==a.expandedKeys.indexOf(s),selected:-1!==a.selectedKeys.indexOf(s),openTransitionName:this.getOpenTransitionName(),openAnimation:r.openAnimation,filterTreeNode:this.filterTreeNode.bind(this)};return r.checkable&&(d.checkable=r.checkable,r.checkStrictly?(a.checkedKeys&&(d.checked=-1!==a.checkedKeys.indexOf(s)),r.checkedKeys&&r.checkedKeys.halfChecked?d.halfChecked=-1!==r.checkedKeys.halfChecked.indexOf(s):d.halfChecked=!1):(this.checkedKeys&&(d.checked=-1!==this.checkedKeys.indexOf(s)),d.halfChecked=-1!==this.halfCheckedKeys.indexOf(s))),K.a.cloneElement(e,d)}},{key:"render",value:function(){var e=this,t=this.props,a=N()(t.prefixCls,t.className,d()({},t.prefixCls+"-show-line",t.showLine)),r={};if(t.focusable&&(r.tabIndex="0",r.onKeyDown=this.onKeyDown),t.checkable&&(this.checkedKeysChange||t.loadData)){var s=this.state.checkedKeys,i=void 0;if(!t.loadData&&this.checkKeys&&this._checkedKeys&&n.i(D.g)(this._checkedKeys,s))i=this.checkKeys;else{var c=[];this.treeNodesStates={},n.i(D.a)(t.children,function(t,n,a,r,o,d){e.treeNodesStates[a]={node:t,key:r,checked:!1,halfChecked:!1,disabled:t.props.disabled,disableCheckbox:t.props.disableCheckbox,childrenPos:o,parentPos:d},-1!==s.indexOf(r)&&(e.treeNodesStates[a].checked=!0,c.push(a))}),c.forEach(function(t){n.i(D.c)(e.treeNodesStates,t,!0)}),i=n.i(D.d)(this.treeNodesStates)}this.halfCheckedKeys=i.halfCheckedKeys,this.checkedKeys=i.checkedKeys}return K.a.createElement("ul",o()({},r,{className:a,role:"tree-node",unselectable:!0}),K.a.Children.map(t.children,this.renderTreeNode,this))}}]),t}(K.a.Component);O.propTypes={prefixCls:m.a.string,children:m.a.any,showLine:m.a.bool,showIcon:m.a.bool,selectable:m.a.bool,multiple:m.a.bool,checkable:m.a.oneOfType([m.a.bool,m.a.node]),checkStrictly:m.a.bool,draggable:m.a.bool,autoExpandParent:m.a.bool,defaultExpandAll:m.a.bool,defaultExpandedKeys:m.a.arrayOf(m.a.string),expandedKeys:m.a.arrayOf(m.a.string),defaultCheckedKeys:m.a.arrayOf(m.a.string),checkedKeys:m.a.oneOfType([m.a.arrayOf(m.a.string),m.a.object]),defaultSelectedKeys:m.a.arrayOf(m.a.string),selectedKeys:m.a.arrayOf(m.a.string),onExpand:m.a.func,onCheck:m.a.func,onSelect:m.a.func,loadData:m.a.func,onMouseEnter:m.a.func,onMouseLeave:m.a.func,onRightClick:m.a.func,onDragStart:m.a.func,onDragEnter:m.a.func,onDragOver:m.a.func,onDragLeave:m.a.func,onDrop:m.a.func,onDragEnd:m.a.func,filterTreeNode:m.a.func,openTransitionName:m.a.string,openAnimation:m.a.oneOfType([m.a.string,m.a.object])},O.childContextTypes=C,O.defaultProps={prefixCls:"rc-tree",showLine:!1,showIcon:!0,selectable:!0,multiple:!1,checkable:!1,checkStrictly:!1,draggable:!1,autoExpandParent:!0,defaultExpandAll:!1,defaultExpandedKeys:[],defaultCheckedKeys:[],defaultSelectedKeys:[],onExpand:a,onCheck:a,onSelect:a,onDragStart:a,onDragEnter:a,onDragOver:a,onDragLeave:a,onDrop:a,onDragEnd:a,onMouseEnter:a,onMouseLeave:a,onRightClick:a},t.a=O},1373:function(e,t,n){"use strict";var a=n(4),r=n.n(a),o=n(9),s=n.n(o),d=n(37),i=n.n(d),c=n(3),l=n.n(c),u=n(7),p=n.n(u),f=n(6),h=n.n(f),y=n(5),g=n.n(y),v=n(0),k=n.n(v),K=n(2),b=n.n(K),m=n(8),x=n.n(m),N=n(66),E=n(606),S=n(1372),D=function(e){function t(e){l()(this,t);var n=h()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onCheck=function(){n.props.root.onCheck(n)},n.onMouseEnter=function(e){e.preventDefault(),n.props.root.onMouseEnter(e,n)},n.onMouseLeave=function(e){e.preventDefault(),n.props.root.onMouseLeave(e,n)},n.onContextMenu=function(e){e.preventDefault(),n.props.root.onContextMenu(e,n)},n.onDragStart=function(e){e.stopPropagation(),n.setState({dragNodeHighlight:!0}),n.props.root.onDragStart(e,n);try{e.dataTransfer.setData("text/plain","")}catch(e){}},n.onDragEnter=function(e){e.preventDefault(),e.stopPropagation(),n.props.root.onDragEnter(e,n)},n.onDragOver=function(e){return e.preventDefault(),e.stopPropagation(),n.props.root.onDragOver(e,n),!1},n.onDragLeave=function(e){e.stopPropagation(),n.props.root.onDragLeave(e,n)},n.onDrop=function(e){e.preventDefault(),e.stopPropagation(),n.setState({dragNodeHighlight:!1}),n.props.root.onDrop(e,n)},n.onDragEnd=function(e){e.stopPropagation(),n.setState({dragNodeHighlight:!1}),n.props.root.onDragEnd(e,n)},n.onExpand=function(){var e=n.props.root.onExpand(n);if(e&&"object"===(void 0===e?"undefined":i()(e))){var t=function(e){n.setState({dataLoading:e})};t(!0),e.then(function(){t(!1)},function(){t(!1)})}},n.state={dataLoading:!1,dragNodeHighlight:!1},n}return g()(t,e),p()(t,[{key:"componentDidMount",value:function(){this.props.root._treeNodeInstances||(this.props.root._treeNodeInstances=[]),this.props.root._treeNodeInstances.push(this)}},{key:"onSelect",value:function(){this.props.root.onSelect(this)}},{key:"onKeyDown",value:function(e){e.preventDefault()}},{key:"isSelectable",value:function(){var e=this.props,t=this.context;return"selectable"in e?e.selectable:t.rcTree.selectable}},{key:"renderSwitcher",value:function(e,t){var n=e.prefixCls,a=x()(n+"-switcher",n+"-switcher_"+t,s()({},n+"-switcher-disabled",e.disabled));return k.a.createElement("span",{className:a,onClick:e.disabled?null:this.onExpand})}},{key:"renderCheckbox",value:function(e){var t=e.prefixCls,n=s()({},t+"-checkbox",!0);e.checked?n[t+"-checkbox-checked"]=!0:e.halfChecked&&(n[t+"-checkbox-indeterminate"]=!0);var a=null;return"boolean"!=typeof e.checkable&&(a=e.checkable),e.disabled||e.disableCheckbox?(n[t+"-checkbox-disabled"]=!0,k.a.createElement("span",{className:x()(n)},a)):k.a.createElement("span",{className:x()(n),onClick:this.onCheck},a)}},{key:"renderChildren",value:function(e){var t=this.renderFirst;this.renderFirst=1;var a=!0;!t&&e.expanded&&(a=!1);var o=e.children?n.i(E.a)(e.children):e.children,d=o;if(o&&(Array.isArray(o)&&o.length&&o.every(function(e){return e.type&&e.type.isTreeNode})||o.type&&o.type.isTreeNode)){var c={};e.openTransitionName?c.transitionName=e.openTransitionName:"object"===i()(e.openAnimation)&&(c.animation=r()({},e.openAnimation),a||delete c.animation.appear);var l=x()(e.prefixCls+"-child-tree",s()({},e.prefixCls+"-child-tree-open",e.expanded));d=k.a.createElement(N.default,r()({},c,{showProp:"data-expanded",transitionAppear:a,component:""}),e.expanded?k.a.createElement("ul",{className:l,"data-expanded":e.expanded},k.a.Children.map(o,function(t,n){return e.root.renderTreeNode(t,n,e.pos)},e.root)):null)}return d}},{key:"render",value:function(){var e,t=this,n=this.props,a=n.prefixCls,o=n.expanded?"open":"close",d=o,i=!0,c=n.title,l=this.renderChildren(n);l&&l!==n.children||(l=null,n.loadData&&!n.isLeaf||(i=!1,d="docu"));var u=(e={},s()(e,a+"-iconEle",!0),s()(e,a+"-icon_loading",this.state.dataLoading),s()(e,a+"-icon__"+d,!0),e),p={};n.draggable&&(p.onDragEnter=this.onDragEnter,p.onDragOver=this.onDragOver,p.onDragLeave=this.onDragLeave,p.onDrop=this.onDrop,p.onDragEnd=this.onDragEnd);var f="",h="";n.disabled?f=a+"-treenode-disabled":n.dragOver?h="drag-over":n.dragOverGapTop?h="drag-over-gap-top":n.dragOverGapBottom&&(h="drag-over-gap-bottom");var y=n.filterTreeNode(this)?"filter-node":"";return k.a.createElement("li",r()({},p,{className:x()(n.className,f,h,y)}),i?this.renderSwitcher(n,o):function(){return k.a.createElement("span",{className:a+"-switcher "+a+"-switcher-noop"})}(),n.checkable?this.renderCheckbox(n):null,function(){var e=n.showIcon||n.loadData&&t.state.dataLoading?k.a.createElement("span",{className:x()(u)}):null,s=k.a.createElement("span",{className:a+"-title"},c),i=a+"-node-content-wrapper",l={className:i+" "+i+"-"+(d===o?d:"normal"),onMouseEnter:t.onMouseEnter,onMouseLeave:t.onMouseLeave,onContextMenu:t.onContextMenu};return n.disabled||((n.selected||!n._dropTrigger&&t.state.dragNodeHighlight)&&(l.className+=" "+a+"-node-selected"),l.onClick=function(e){e.preventDefault(),t.isSelectable()&&t.onSelect()},n.draggable&&(l.className+=" draggable",l.draggable=!0,l["aria-grabbed"]=!0,l.onDragStart=t.onDragStart)),k.a.createElement("span",r()({ref:"selectHandle",title:"string"==typeof c?c:""},l),e,s)}(),l)}}]),t}(k.a.Component);D.propTypes={prefixCls:b.a.string,disabled:b.a.bool,disableCheckbox:b.a.bool,expanded:b.a.bool,isLeaf:b.a.bool,root:b.a.object,onSelect:b.a.func},D.contextTypes=S.b,D.defaultProps={title:"---"},D.isTreeNode=1,t.a=D},1374:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(1372),r=n(1373);n.d(t,"TreeNode",function(){return r.a}),a.a.TreeNode=r.a,t.default=a.a},1375:function(e,t,n){"use strict";function a(e){if(!e.getClientRects().length)return{top:0,left:0};var t=e.getBoundingClientRect();if(t.width||t.height){var n=e.ownerDocument,a=n.defaultView,r=n.documentElement;return{top:t.top+a.pageYOffset-r.clientTop,left:t.left+a.pageXOffset-r.clientLeft}}return t}function r(e,t){!function e(n,a,r,o){l.Children.forEach(n,function(n,s){var d=a+"-"+s;r.push(d);var i=[];n.props.children&&n.type&&n.type.isTreeNode&&e(n.props.children,d,i,d),t(n,s,d,n.key||d,i,o)})}(e,0,[])}function o(e,t,n){!function t(a){a.childrenPos.forEach(function(a){var r=e[a];r.disableCheckbox||r.disabled||(r.halfChecked=!1,r.checked=n),t(r)})}(e[t]);!function t(n){if(n.parentPos){var a=e[n.parentPos],r=a.childrenPos.length,o=0;a.childrenPos.forEach(function(t){e[t].disableCheckbox&&(r-=1),!0===e[t].checked?o++:!0===e[t].halfChecked&&(o+=.5)}),o===r?(a.checked=!0,a.halfChecked=!1):o>0?(a.halfChecked=!0,a.checked=!1):(a.checked=!1,a.halfChecked=!1),t(a)}}(e[t])}function s(e){var t=[],n=[],a=[],r=[];return Object.keys(e).forEach(function(o){var s=e[o];s.checked?(n.push(s.key),a.push(s.node),r.push({node:s.node,pos:o})):s.halfChecked&&t.push(s.key)}),{halfCheckedKeys:t,checkedKeys:n,checkedNodes:a,checkedNodesPositions:r}}function d(e,t){return t?{checked:e,halfChecked:t}:e}function i(e,t){return e.every(function(e,n){return e===t[n]})}function c(e,t){if(e===t)return!0;if(null===e||void 0===e||null===t||void 0===t)return!1;if(e.length!==t.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}t.e=a,t.a=r,t.c=o,t.d=s,t.b=d,t.f=i,t.g=c;var l=n(0);n.n(l)},1376:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.AntTreeNode=void 0;var r=n(4),o=a(r),s=n(3),d=a(s),i=n(7),c=a(i),l=n(6),u=a(l),p=n(5),f=a(p),h=n(0),y=a(h),g=n(1374),v=a(g),k=n(611),K=a(k),b=(t.AntTreeNode=function(e){function t(){return(0,d.default)(this,t),(0,u.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return(0,f.default)(t,e),(0,c.default)(t,[{key:"render",value:function(){return y.default.createElement(t,this.props)}}]),t}(y.default.Component),function(e){function t(){return(0,d.default)(this,t),(0,u.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return(0,f.default)(t,e),(0,c.default)(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.className,a=e.checkable;return y.default.createElement(v.default,(0,o.default)({},e,{className:n,checkable:a?y.default.createElement("span",{className:t+"-checkbox-inner"}):a}),this.props.children)}}]),t}(y.default.Component));t.default=b,b.TreeNode=g.TreeNode,b.defaultProps={prefixCls:"ant-tree",checkable:!1,showIcon:!1,openAnimation:K.default}},1377:function(e,t,n){"use strict";n(14),n(1378),n(279)},1378:function(e,t){},1380:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,c,l=(n(610),n(609)),u=a(l),p=(n(283),n(282)),f=a(p),h=(n(608),n(607)),y=a(h),g=(n(35),n(31)),v=a(g),k=(n(136),n(135)),K=a(k),b=(n(1377),n(1376)),m=a(b),x=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),N=n(0),E=a(N),S=n(2),D=a(S),C=n(45),O=n(84),T=n(110),_=m.default.TreeNode,w=(c=i=function(e){function t(){var e,n,a,d;o(this,t);for(var i=arguments.length,c=Array(i),l=0;l<i;l++)c[l]=arguments[l];return n=a=s(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),a.state={expandedKeys:[]},a.handleAddNewNode=function(e){var t=a.props,n=t.dataSource,o=t.selectedKey,s=t.onAddTopNode,d=t.onAddSubNode,i=t.unSavedNewNodeKey,c=n.find(function(e){return e.key===i});if("subNode"===e&&!o)return K.default.error("请选择一个父节点！",3);if(c)return K.default.error("您有未保存的新增节点！",3);if("subNode"===e){d(o);var l=[].concat(r(a.state.expandedKeys));l.push(i),l.push(o),l=(0,O.uniqueArray)(l),a.setState({expandedKeys:l})}else"topNode"===e&&s()},a.handleExpand=function(e){a.setState({expandedKeys:e})},a.handleTreeSelect=function(e){var t=a.props,n=t.dataSource,r=t.onSelect,o=t.unSavedNewNodeKey;if(n.find(function(e){return e.key===o}))return K.default.error("您有未保存的新增节点！",3);var s=n.find(function(t){return t.key===e[0]});s&&r(s)},a.handleSubmit=function(e){e.preventDefault();var t=a.props,n=t.form,r=t.onSubmit;n.validateFields(function(e,t){e||r(t)})},a.handleReset=function(){var e=a.props,t=e.onReset,n=e.form;t?t():n.resetFields()},a.handleDelete=function(){(0,a.props.onDelete)()},d=n,s(a,d)}return d(t,e),x(t,[{key:"getTreeData",value:function(){var e=this.props.dataSource,t=[].concat(r(e)).sort(function(e,t){var n=e.order||0,a=t.order||0;return n||a?a-n:e.text>t.text?1:-1});return(0,T.convertToTree)(t)}},{key:"render",value:function(){var e=this,t=this.state.expandedKeys,n=this.props,a=n.selectedKey,r=n.unSavedNewNodeKey,o=this.getTreeData(),s=!a,d=(0,T.renderNode)(o,function(e,t){var n=e.text,a=e.key,o=e.icon;return o&&(n=E.default.createElement("span",null,E.default.createElement(C.FontIcon,{type:o})," ",e.text)),a===r&&(n=E.default.createElement("span",{style:{color:"red"}},n)),t?E.default.createElement(_,{key:a,title:n},t):E.default.createElement(_,{key:a,title:n})});return E.default.createElement(C.PageContent,null,E.default.createElement(u.default,null,E.default.createElement(y.default,{span:8},E.default.createElement(v.default,{type:"primary",onClick:function(){return e.handleAddNewNode("topNode")}},"添加顶级"),E.default.createElement(m.default,{selectedKeys:[a],expandedKeys:t,onExpand:this.handleExpand,onSelect:this.handleTreeSelect},d)),E.default.createElement(y.default,{span:16},E.default.createElement(v.default,{type:"ghost",onClick:function(){return e.handleAddNewNode("subNode")},disabled:s},"添加子节点"),E.default.createElement(f.default,{placement:"bottom",title:"您确定删除此节点吗？其子节点也将一并被删除！",onConfirm:this.handleDelete},E.default.createElement(v.default,{type:"danger",style:{marginLeft:8},disabled:s},"删除")),this.props.children,E.default.createElement(v.default,{type:"primary",onClick:this.handleSubmit,disabled:s},"保存"),E.default.createElement(v.default,{type:"ghost",style:{marginLeft:8},onClick:this.handleReset,disabled:s},"重置"))))}}]),t}(N.Component),i.propTypes={dataSource:D.default.array.isRequired,selectedKey:D.default.string.isRequired,unSavedNewNodeKey:D.default.string.isRequired,onSelect:D.default.func.isRequired,onDelete:D.default.func.isRequired,onSubmit:D.default.func.isRequired,onAddTopNode:D.default.func.isRequired,onAddSubNode:D.default.func.isRequired,onReset:D.default.func},c);t.default=w}});