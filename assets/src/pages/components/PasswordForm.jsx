import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Icon, Button} from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@Form.create()
export default class LoginForm extends Component {
    state = {
        confirmDirty: false,
    };

    static propTypes = {
        loading: PropTypes.bool,
        onSubmit: PropTypes.func,
        oldPass: PropTypes.string,
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

    handleReNewPassConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    checkNewPass = (rule, reNewPass, callback) => {
        // 这个校验规则是加在reNewPass上的
        if (!reNewPass) return callback();

        const form = this.props.form;
        const newPass = form.getFieldValue('newPass');
        const oldPass = form.getFieldValue('oldPass');

        if (reNewPass && reNewPass !== newPass) {
            return callback('您两次输入的新密码不一致!');
        }
        if (reNewPass && reNewPass === oldPass) {
            return callback('新密码不与能原密码相同!');
        }
        if (reNewPass && reNewPass === oldPass) {
            return callback('确认新密码不能与默认密码相同!');
        }
        callback();
    };

    checkReNewPass = (rule, newPass, callback) => {
        if (!newPass) return callback();

        const form = this.props.form;
        const {confirmDirty} = this.state;
        const oldPass = form.getFieldValue('oldPass');

        if (confirmDirty) {
            form.validateFields(['reNewPass'], {force: true});
        }
        if (newPass === oldPass) {
            return callback('新密码不能原密码相同!');
        }
        if (newPass === oldPass) {
            return callback('新密码不能与默认密码相同!');
        }

        callback();
    };

    handleReset = () => {
        this.props.form.resetFields();
        this.props.form.validateFields();
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    render() {
        const {loading, hideOldPass, oldPass} = this.props;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        // Only show error after a field is touched.
        const oldPassError = isFieldTouched('oldPass') && getFieldError('oldPass');
        const newPassError = isFieldTouched('newPass') && getFieldError('newPass');
        const reNewPassError = isFieldTouched('reNewPass') && getFieldError('reNewPass');
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    style={{display: hideOldPass ? 'none' : 'block'}}
                    validateStatus={oldPassError ? 'error' : ''}
                    help={oldPassError || ''}
                >
                    {getFieldDecorator('oldPass', {
                        initialValue: oldPass,
                        rules: [{required: true, message: '原密码不能为空！'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                            type="password"
                            placeholder="原密码"
                        />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={newPassError ? 'error' : ''}
                    help={newPassError || ''}
                >
                    {getFieldDecorator('newPass', {
                        rules: [{required: true, message: '请输入新密码！'}, {
                            validator: this.checkReNewPass,
                        }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                            type="password"
                            placeholder="新密码"
                        />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={reNewPassError ? 'error' : ''}
                    help={reNewPassError || ''}
                >
                    {getFieldDecorator('reNewPass', {
                        rules: [{required: true, message: '请再次输入您的新密码！'}, {
                            validator: this.checkNewPass,
                        }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                            type="password"
                            placeholder="确认新密码"
                            onBlur={this.handleReNewPassConfirmBlur}
                        />
                    )}
                </FormItem>
                <FormItem
                    style={{marginBottom: 8}}
                >
                    <Button
                        style={{marginRight: 8}}
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        保存
                    </Button>
                    <Button
                        loading={loading}
                        type="ghost"
                        onClick={this.handleReset}
                    >
                        重置
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
