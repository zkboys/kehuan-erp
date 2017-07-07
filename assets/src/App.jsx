import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {message} from 'antd';
import * as promiseAjax from 'zk-tookit/utils/promise-ajax';
import {init as initStorage} from 'zk-tookit/utils/storage';
import './global.less';
import configureStore from './redux/store/configure-store';
import Router from './route/Router';
import handleErrorMessage from './commons/handle-error-message';
import {getCurrentLoginUser, getAjaxBaseUrl, isMock, toLogin, getCsrf} from './commons';

if (process.env.NODE_ENV === 'development') {
    require('./mock/index');

    console.log('current mode is debug, mock is started');
}
const currentLoginUser = getCurrentLoginUser();
if (!currentLoginUser) toLogin();

initStorage({ // 设置存储前缀，用于区分不同用户的数据
    keyPrefix: currentLoginUser && currentLoginUser.id,
});

promiseAjax.init({
    setOptions: (instance) => {
        instance.defaults.baseURL = getAjaxBaseUrl();
        instance.defaults.headers.common['CSRF-Token'] = getCsrf();
    },
    onShowErrorTip: (err, errorTip) => {
        handleErrorMessage(err, errorTip);
    },
    onShowSuccessTip: (response, successTip) => {
        if (successTip !== false) {
            message.success(successTip, 3);
        }
    },
    isMock,
});

const store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('main'));
