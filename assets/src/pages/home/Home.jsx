import React, {Component} from 'react';
import {PageContent} from 'zk-tookit/antd';
import './style.less';

export class LayoutComponent extends Component {
    state = {};

    componentWillReceiveProps(/* nextProps */) {
    }

    handleGetMenus = () => {
        const {actions} = this.props;
        actions.getSystemMenus(() => {
            setTimeout(() => {
                actions.setSystemMenusStatusByUrl();
            });
        });
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.hidePageHeader();
        actions.hideSideBar();
    }

    render() {
        // TODO 首页内容
        return (
            <PageContent styleName="root">
                欢迎使用
            </PageContent>
        );
    }
}

export function mapStateToProps(state) {
    return {
        ...state.frame,
    };
}
