import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {PageContent} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import PasswordForm from '../components/PasswordForm';

export const PAGE_ROUTE = '/system/pass';

@ajax()
export default class Password extends Component {
    state = {
        loading: false,
    };

    componentDidMount() {

    }

    handleSubmit = (values) => {
        console.log(values);
        const {$ajax} = this.props;

        this.setState({loading: true});
        // TODO: 后端对接
        $ajax.put('/system/pass', values, {errorTip: '保存密码失败'}).then(res => {
            console.log(res);
        }).finally(() => {
            this.setState({loading: false});
        });
    };

    render() {
        const {loading} = this.state;
        return (
            <PageContent>
                <Row>
                    <Col span={12} offset={6}>
                        <PasswordForm loading={loading} onSubmit={this.handleSubmit}/>
                    </Col>
                </Row>
            </PageContent>
        );
    }
}
