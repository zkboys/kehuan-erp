webpackJsonp([11,8],{0:function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function o(){if(v){var e="确认中。。。";y.innerHTML=e,y.innerText=e}else{var t="登录中。。。";h.innerHTML=t,h.innerText=t}}function a(){if(v){var e="确认";y.innerHTML=e,y.innerText=e}else{var t="登录";h.innerHTML=t,h.innerText=t}}function i(){var e=document.getElementById("first-login-box"),t=document.getElementById("login-box");t.style.display="none",e.style.display="block",v=!0}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"未知系统错误";if(v){var t=document.getElementById("reset-pass-error");t.innerHTML=e,t.innerText=e}else{var n=document.getElementById("login-error");n.innerHTML=e,n.innerText=e}}function u(){var e=document.getElementById("login-error"),t=document.getElementById("reset-pass-error");e.innerHTML="",e.innerText="",t.innerHTML="",t.innerText=""}function l(){u();var e=k.value,t=w.value;if(!e)return void s("请输入用户名");if(!t)return void s("请输入密码");var n={_csrf:E,name:e,pass:t};o(),b.post("/signin",n).then(function(e){var t=e.user;if(t.is_first_login)return a(),i(),!1;var n=e.refer||"/",r=e.menus||[];p.session.setItem("currentLoginUser",t),p.session.setItem("menus",r),location.href=n})["catch"](function(e){e&&e.body?s(e.body.message||e.body.error&&e.body.error.message):s(),a()})}function c(){u();var e=I.value,t=j.value;if(!e)return void s("请输入新密码");if(!t)return void s("请输入确认新密码");if(e!==t)return void s("两次输入密码不一致");var n={_csrf:E,pass:e,rePass:t};o(),b.put("/first_login",n).then(function(e){var t=e.refer||"/",n=e.menus||[],r=e.user;p.session.setItem("currentLoginUser",r),p.session.setItem("menus",n),location.href=t})["catch"](function(e){e&&e.body?s(e.body.message||e.body.error&&e.body.error.message):s(),a()})}function d(e){13===e.keyCode&&(v?c():l())}function m(e,t,n){e&&(e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on"+t,n):e["on"+t]=n)}n(505);var f=n(164),p=r(f),g=n(108),b=r(g),v=!1,h=document.getElementById("login-btn"),y=document.getElementById("reset-pass-btn"),k=document.getElementById("name"),w=document.getElementById("pass"),I=document.getElementById("new-pass"),j=document.getElementById("re-new-pass"),x=document.querySelector('meta[name="csrf-token"]'),E=x?x.getAttribute("content"):"";m(h,"click",l),m(y,"click",c),m(k,"keydown",d),m(w,"keydown",d),m(I,"keydown",d),m(I,"keydown",d)},108:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=document.querySelector('meta[name="csrf-token"]');return e._csrf=t&&t.getAttribute("content"),e}function a(e){var t=e.status,n=e.statusText;return t>=200&&t<300?e:(401===t&&(window.location.href=b["default"].signInPath),e.json().then(function(e){var r=new Error(n);throw r.body=e,r.type="http",r.status=t,r}))}function i(e){return e.json()}function s(e,t){return t=o(t),e=v+e,t&&(e+="?"+p["default"].stringify(t)),fetch(e,{credentials:"same-origin"}).then(a).then(i)}function u(e,t){return t=o(t),e=v+e,fetch(e,{method:"POST",credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json"},body:(0,m["default"])(t)}).then(a).then(i)}function l(e,t){return t=o(t),e=v+e,fetch(e,{method:"PUT",credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json"},body:(0,m["default"])(t)}).then(a).then(i)}function c(e,t){return t=o(t),e=v+e,fetch(e,{method:"DELETE",credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json"},body:(0,m["default"])(t)}).then(a).then(i)}Object.defineProperty(t,"__esModule",{value:!0});var d=n(162),m=r(d);t.get=s,t.post=u,t.put=l,t.del=c;var f=n(455),p=r(f);n(374);var g=n(254),b=r(g),v=b["default"].apiPath},164:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){t=(0,l["default"])(t),c.setItem(e,t)}function a(e){var t=c.getItem(e);return JSON.parse(t)}function i(e){var t={};return e.forEach(function(e){return t[e]=a(e)}),t}function s(e){e.forEach(function(e){return m(e)})}Object.defineProperty(t,"__esModule",{value:!0}),t.session=t.removeItem=t.clear=void 0;var u=n(162),l=r(u);t.setItem=o,t.getItem=a,t.multiGet=i,t.multiRemove=s;var c=window.localStorage,d=window.sessionStorage,m=(t.clear=c.clear,t.removeItem=c.removeItem);t.session={setItem:function(e,t){t=(0,l["default"])(t),d.setItem(e,t)},getItem:function(e){var t=d.getItem(e);return JSON.parse(t)},clear:d.clear,removeItem:d.removeItem,multiGet:function(e){var t=this,n={};return e.forEach(function(e){return n[e]=t.getItem(e)}),n},multiRemove:function(e){var t=this;e.forEach(function(e){return t.removeItem(e)})}}},254:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(296),a=r(o);t["default"]={apiPath:"/api",signInPath:"/signin","package":a["default"]},e.exports=t["default"]},296:function(e,t){e.exports={name:"assets",version:"1.0.0",description:"A React.js project",author:"wangshubin","private":!0,scripts:{dll:"node build/build-dll.js",route:"node generate-routes.js",dev:"npm run route && node build/dev-server.js",build:"npm run route &&  node build/build.js",unit:"karma start test/unit/karma.conf.js --single-run","unit:watch":"karma start test/unit/karma.conf.js",e2e:"node test/e2e/runner.js",test:"npm run unit && npm run e2e",lint:"eslint --ext .js,.jsx src"},dependencies:{antd:"^2.5.2","babel-core":"^6.0.0","babel-eslint":"^6.1.2","babel-loader":"^6.0.0","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-import":"^1.1.0","babel-plugin-transform-runtime":"^6.0.0","babel-plugin-typecheck":"^3.9.0","babel-preset-es2015":"^6.0.0","babel-preset-react":"^6.11.1","babel-preset-stage-0":"^6.5.0","babel-preset-stage-2":"^6.0.0","babel-register":"^6.0.0","babel-runtime":"^6.0.0",classnames:"^2.2.5","connect-history-api-fallback":"^1.1.0","css-loader":"^0.23.1",eslint:"^3.2.2","eslint-config-airbnb":"^10.0.0","eslint-friendly-formatter":"^2.0.5","eslint-loader":"^1.3.0","eslint-plugin-babel":"^3.3.0","eslint-plugin-html":"^1.3.0","eslint-plugin-import":"^1.8.1","eslint-plugin-jsx-a11y":"^2.1.0","eslint-plugin-markdown":"^1.0.0-beta.2","eslint-plugin-react":"^6.0.0","eslint-tinker":"^0.3.2","eventsource-polyfill":"^0.9.6",express:"^4.13.3","extract-text-webpack-plugin":"^1.0.1","file-loader":"^0.8.4","flux-standard-action":"^0.6.1",history:"^2.1.2","html-webpack-plugin":"^2.8.1","http-proxy-middleware":"^0.12.0","json-loader":"^0.5.4",less:"^2.7.1","less-loader":"^2.2.3",lodash:"^4.14.2","object-assign":"^4.1.0",ora:"^0.2.0","postcss-loader":"^0.9.1","query-string":"^4.2.2",react:"^15.3.0","react-dom":"^15.3.0","react-redux":"^4.4.5","react-router":"^2.6.1",redux:"^3.5.2","redux-actions":"^0.10.1","redux-logger":"^2.6.1","redux-thunk":"^2.1.0","redux-undo":"^0.6.1",shelljs:"^0.6.0","url-loader":"^0.5.7",webpack:"^1.12.2","webpack-dev-middleware":"^1.4.0","webpack-hot-middleware":"^2.6.0","webpack-merge":"^0.8.3","whatwg-fetch":"^1.0.0"},devDependencies:{"babel-plugin-__coverage__":"^11.0.0",chai:"^3.5.0",chromedriver:"^2.21.2","cross-spawn":"^2.1.5",enzyme:"^2.4.1","function-bind":"^1.0.2",karma:"^0.13.15","karma-coverage":"^0.5.5","karma-mocha":"^0.2.2","karma-phantomjs-launcher":"^1.0.0","karma-sinon-chai":"^1.2.0","karma-sourcemap-loader":"^0.3.7","karma-spec-reporter":"0.0.24","karma-webpack":"^1.7.0",mocha:"^2.4.5",nightwatch:"^0.8.18","react-addons-test-utils":"^15.3.2","selenium-server":"2.53.0",sinon:"^1.17.3","sinon-chai":"^2.8.0"}}},505:function(e,t){}});
//# sourceMappingURL=signIn.b127991d5729c0885fbe.js.map