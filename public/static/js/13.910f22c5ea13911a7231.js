webpackJsonp([13],{1384:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.PAGE_ROUTE=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0),c=function(e){return e&&e.__esModule?e:{default:e}}(i),f=n(63),l=(t.PAGE_ROUTE="/system/setting",function(e){function t(){var e,n,u,a;o(this,t);for(var i=arguments.length,c=Array(i),f=0;f<i;f++)c[f]=arguments[f];return n=u=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),u.state={},a=n,r(u,a)}return u(t,e),a(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return c.default.createElement(f.PageContent,null,"Setting_page")}}]),t}(i.Component));t.default=l}});