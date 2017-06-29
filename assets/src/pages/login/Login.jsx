import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as promiseAjax from 'zk-tookit/utils/promise-ajax';
import {init as initStorage} from 'zk-tookit/utils/storage';
import {convertToTree} from 'zk-tookit/utils/tree-utils';
import {setCurrentLoginUser, setMenuTreeData, isMock, getAjaxBaseUrl} from '../../commons';
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
            console.log(res);
            const user = res.user;
            const menus = res.menus;
            const ref = res.ref;
            const {
                is_first_login: isFirstLogin,
                id,
                name,
                loginName,
            } = user;
            const permissions = menus.map(item => {
                if (item.type === '0') return item.key;
                if (item.type === '1') return item.code;
                return null;
            });
            const currentLoginUser = {
                id,
                name,
                loginName,
                permissions,
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
        const menuTreeData = convertToTree(menus);
        setMenuTreeData(menuTreeData);
        setCurrentLoginUser(currentLoginUser);
        window.location.href = ref;
    };

    render() {
        const {loading, errorMessage, showPasswordForm} = this.state;
        return (
            <div styleName="root">
                {
                    showPasswordForm ?
                        <div styleName="box">
                            <h1>修改密码</h1>
                            <h3>您为首次登录，需要修改密码</h3>
                            <PasswordForm
                                hideOldPass
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
