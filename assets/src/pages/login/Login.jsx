import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as promiseAjax from 'zk-tookit/utils/promise-ajax';
import {init as initStorage} from 'zk-tookit/utils/storage';
import {convertToTree} from 'zk-tookit/utils/tree-utils';
import {setCurrentLoginUser, setMenuTreeData, isMock, getAjaxBaseUrl, getCsrf} from '../../commons';
import './style.less';
import LoginForm from '../components/LoginForm';
import PasswordForm from '../components/PasswordForm';


if (process.env.NODE_ENV === 'development') {
    require('../../mock/index');

    console.log('current mode is debug, mock is started');
}

promiseAjax.init({
    setOptions: (instance) => {
        instance.defaults.baseURL = getAjaxBaseUrl();
        instance.defaults.headers.common['CSRF-Token'] = getCsrf();
    },
    isMock,
});

class Login extends Component {
    state = {
        loading: false,
        errorMessage: '',
        showPasswordForm: false,
        currentLoginUser: {},
    };

    handleLoginSubmit = ({userName, password}) => {
        this.setState({loading: true, errorMessage: ''});
        promiseAjax.post('signin', {userName, password}, {errorTip: false}).then(res => {
            const user = res.user;
            const menus = res.menus;
            const ref = res.ref;
            console.log(user);
            const {
                is_first_login: isFirstLogin,
                _id: id,
                name,
                loginName,
                permissions,
            } = user;

            const currentLoginUser = {
                id,
                name,
                loginName,
                permissions,
                ...user,
            };
            this.setState({currentLoginUser});
            initStorage({
                keyPrefix: currentLoginUser.id,
            });

            if (isFirstLogin) {
                this.setState({menus, password, loading: false, showPasswordForm: true});
            } else {
                this.toHome(menus, ref);
            }
        }).catch(error => {
            const message = this.getAjaxErrorMessage(error);
            this.setState({loading: false, errorMessage: message});
        });
    };

    handlePassSubmit = (values) => {
        const {password: oldPass} = this.state;
        values.oldPass = oldPass;
        promiseAjax.put('/system/pass', values).then(() => {
            const {menus} = this.state;
            this.toHome(menus);
        }).catch(error => {
            const message = this.getAjaxErrorMessage(error);
            this.setState({loading: false, errorMessage: message});
        });
    };

    getAjaxErrorMessage(error) {
        const message = error && error.response && error.response.data && error.response.data.message;
        return message || '未知错误';
    }

    toHome = (menuData, ref = '/') => {
        menuData = menuData.filter(item => item.key);
        const {currentLoginUser} = this.state;
        const menus = menuData.filter(item => item.type === '0');

        // 根据order 排序
        const orderedData = [...menus].sort((a, b) => {
            const aOrder = a.order || 0;
            const bOrder = b.order || 0;

            // 如果order都不存在，根据 text 排序
            if (!aOrder && !bOrder) {
                return a.text > b.text ? 1 : -1;
            }

            return bOrder - aOrder;
        });

        const menuTreeData = convertToTree(orderedData);
        setMenuTreeData(menuTreeData);
        setCurrentLoginUser(currentLoginUser);
        console.log(ref);
        window.location.href = ref;
    };

    render() {
        const {loading, errorMessage, showPasswordForm, password} = this.state;
        return (
            <div styleName="root">
                {
                    showPasswordForm ?
                        <div styleName="box">
                            <h1>修改密码</h1>
                            <h3>您为首次登录，需要修改密码</h3>
                            <PasswordForm
                                hideOldPass
                                oldPass={password}
                                loading={loading}
                                onSubmit={this.handlePassSubmit}
                            />
                            <div styleName="error-message">
                                {errorMessage}
                            </div>
                        </div>
                        :
                        <div styleName="box">
                            <h1>用户登录</h1>
                            <LoginForm loading={loading} onSubmit={this.handleLoginSubmit}/>
                            <div styleName="error-message">
                                {errorMessage}
                            </div>
                        </div>
                }
            </div>
        );
    }
}

ReactDOM.render(<Login />, document.getElementById('main'));
