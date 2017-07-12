import React, {Component} from 'react';
import {PageContent} from 'zk-tookit/antd';
import {Form, Input, Button, message} from 'antd';
import {ajax} from 'zk-tookit/react';
import OrganizationSelect from '../components/OrganizationSelect';
import validationRule from '../../commons/validation-rule';
import RoleSelect from '../components/RoleSelect';

const FormItem = Form.Item;

export const PAGE_ROUTE = '/system/user/+edit/:id';
@Form.create()
@ajax()
export default class SystemUserEdit extends Component {
    state = {
        loading: false,
        isAdd: true,
        dataSource: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const {loading, isAdd} = this.state;
        const {$ajax, router} = this.props;
        if (loading) {
            return;
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let submitAjax = isAdd ? $ajax.post : $ajax.put;
                const successTip = isAdd ? '添加成功' : '修改成功';
                this.setState({loading: true});
                submitAjax('/system/users', values).then(() => {
                    router.push('/system/user');
                    message.success(successTip, 1.5, () => router.push('/system/user'));
                }).finally(() => {
                    this.setState({loading: false});
                });
            }
        });
    };

    componentWillMount() {
        const {id} = this.props.params;
        if (id === ':id') { // 添加
            this.setState({isAdd: true});
        } else { // 修改
            this.setState({isAdd: false});
            this.props.$ajax.get(`/system/users/${id}`).then(res => {
                this.setState({user: res});
            }).finally(() => this.setState({loading: false}));
        }
    }

    render() {
        const {loading, isAdd, user = {}} = this.state;
        const {getFieldDecorator} = this.props.form;
        const title = isAdd ? '添加用户' : '修改用户';
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        return (
            <PageContent>
                <h1 style={{textAlign: 'center', marginBottom: 16}}>{title}</h1>
                <Form onSubmit={this.handleSubmit}>
                    {!isAdd ? getFieldDecorator('_id', {initialValue: user._id})(<Input type="hidden"/>) : null}
                    <FormItem
                        label="登录名"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('loginName', {
                            initialValue: user.loginName,
                            rules: [
                                {required: true, message: '登录名不能为空！'},
                                validationRule.checkExistLoginName(user.loginName),
                            ],
                        })(
                            <Input placeholder="请输入登录名"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="用户名"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            initialValue: user.name,
                            rules: [{
                                required: true, message: '用户名不能为空！',
                            }],
                        })(
                            <Input placeholder="请输入用户名"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="所属机构"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('org_id', {
                            initialValue: user.org_id,
                            rules: [{
                                required: false, message: '请选择所属机构！',
                            }],
                        })(
                            <OrganizationSelect placeholder="请选择所属机构"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="角色"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('role_id', {
                            initialValue: user.role_id,
                            rules: [{
                                required: false, message: '请选择角色！',
                            }],
                        })(
                            <RoleSelect placeholder="请选择角色"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="电话"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('mobile', {
                            initialValue: user.mobile,
                            rules: [
                                {required: false, message: '电话不能为空！'},
                                validationRule.mobile(),
                            ],
                        })(
                            <Input placeholder="请输入用户名"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="邮箱"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('email', {
                            initialValue: user.email,
                            rules: [
                                {required: false, message: '邮箱不能为空！'},
                                validationRule.email(),
                            ],
                        })(
                            <Input placeholder="请输入用户名"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="职位"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('position', {
                            initialValue: user.position,
                            rules: [
                                {required: false, message: '邮箱不能为空！'},
                            ],
                        })(
                            <Input placeholder="请输入职位"/>
                        )}
                    </FormItem>
                    <FormItem
                        wrapperCol={{span: 14, offset: 6}}
                    >
                        <Button
                            loading={loading}
                            type="primary"
                            style={{marginRight: 10}}
                            htmlType="submit"
                        >
                            {isAdd ? '保存' : '修改'}
                        </Button>
                        <Button
                            type="ghost"
                            onClick={() => this.props.form.resetFields()}
                        >
                            重置
                        </Button>
                    </FormItem>
                </Form>
            </PageContent>
        );
    }
}
