webpackJsonp([10],{1351:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.PAGE_ROUTE=void 0;var s=(r(35),r(31)),i=n(s),l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=r(0),f=n(u),p=r(1402),y=n(p);r(614);var d=(t.PAGE_ROUTE="/error/403",function(e){function t(){var e,r,n,c;o(this,t);for(var s=arguments.length,i=Array(s),l=0;l<s;l++)i[l]=arguments[l];return r=n=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),n.state={remainSecond:9},c=r,a(n,c)}return c(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this;this.si=setInterval(function(){var t=e.state.remainSecond;t--,t<=0&&(e.clear(),e.props.router.goBack()),e.setState({remainSecond:t})},1e3)}},{key:"componentWillUnmount",value:function(){this.clear()}},{key:"clear",value:function(){this.si&&clearInterval(this.si)}},{key:"render",value:function(){var e=this.state.remainSecond;return f.default.createElement("div",{className:"src-pages-error-style-error-page"},f.default.createElement("img",{src:y.default,alt:"401图片"}),f.default.createElement("p",{className:"src-pages-error-style-error-text"},"非常抱歉，您没权访问此页面！"),f.default.createElement("p",{className:"src-pages-error-style-error-text src-pages-error-style-error-sub-text"},e," 秒后返回上一个页面..."),f.default.createElement(i.default,{type:"primary",className:"src-pages-error-style-error-btn",onClick:this.props.router.goBack},"马上返回"))}}]),t}(u.Component));t.default=d},1402:function(e,t,r){e.exports=r.p+"static/image/403-ce4ae602.png"}});