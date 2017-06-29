import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Icon, Button} from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@Form.create()
export default class LoginForm extends Component {
    state = {};

    static propTypes = {
        loading: PropTypes.bool,
        onSubmit: PropTypes.func,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {loading, onSubmit} = this.props;
        if (loading) {
            return;
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (onSubmit) onSubmit(values);
            }
        });
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    render() {
        const {loading} = this.props;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名！'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码！'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem
                    style={{marginBottom: 8}}
                >
                    <Button
                        style={{width: '100%'}}
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
