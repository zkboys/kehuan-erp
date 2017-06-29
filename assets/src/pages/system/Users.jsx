import React, {Component} from 'react';
import {Operator, ListPage} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {hasPermission} from '../../commons';

export const PAGE_ROUTE = '/system/user';

@ajax()
export default class extends Component {
    state = {
        total: 0,
        dataSource: [],
        roles: [],
    };

    queryItems = [
        [
            {
                type: 'input',
                field: 'loginName',
                label: '登录名',
                labelSpaceCount: 3,
                width: 200,
                placeholder: '请输入登录名',
            },
            {
                type: 'input',
                field: 'name',
                label: '用户名',
                labelSpaceCount: 3,
                width: 200,
                placeholder: '请输入用户名',
            },
            {
                type: 'input',
                field: 'mobile',
                label: '电话',
                labelSpaceCount: 3,
                width: 200,
                placeholder: '请输入电话',
            },
        ],
    ];

    toolItems = [
        {
            type: 'primary',
            text: '添加',
            permission: 'USER_ADD',
            onClick: () => {
                this.props.router.push('/system/user/+edit/:id');
            },
        },
    ];

    columns = [
        {title: '用户名', dataIndex: 'name', key: 'name'},
        {title: '登录名', dataIndex: 'loginName', key: 'loginName'},
        {title: '所属机构', dataIndex: 'org_key', key: 'org_key'},
        {title: '电话', dataIndex: 'mobile', key: 'mobile'},
        {title: '邮箱', dataIndex: 'email', key: 'email'},
        {title: '性别', dataIndex: 'gender', key: 'gender'},
        {title: '职位', dataIndex: 'position', key: 'position'},
        {
            title: '角色',
            dataIndex: 'role_id',
            key: 'role_id',
            render: (text) => {
                const {roles} = this.state;
                const role = roles.find(item => item._id === text);
                if (role) return role.name;
                return '未选择角色';
            },
        },
        {title: '状态', dataIndex: 'is_locked', key: 'is_locked'},
        {title: '备注', dataIndex: 'remark', key: 'remark'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {_id: id, name} = record;
                const userNameTip = `“${name}”`;
                const items = [
                    {
                        label: '修改',
                        permission: 'USER_MODIFY',
                        onClick: () => {
                            this.props.router.push(`/system/user/+edit/${id}`);
                        },
                    },
                    {
                        label: '删除',
                        permission: 'USER_DELETE',
                        confirm: {
                            title: `您确定要删除${userNameTip}？`,
                            onConfirm: () => {
                                this.props.$ajax.del(`/system/users/${id}`, null, {successTip: `删除${userNameTip}成功！`}).then(() => {
                                    const dataSource = this.state.dataSource.filter(item => item._id !== id);
                                    this.setState({
                                        dataSource,
                                    });
                                });
                            },
                        },
                    },
                    {
                        label: '重置密码',
                        permission: 'USER_RESET_PASS',
                        confirm: {
                            title: `您确定要重置${userNameTip}的密码？`,
                            onConfirm: () => {
                                this.props.$ajax.put(
                                    '/system/users/reset_pass',
                                    {id},
                                    {successTip: `重置${userNameTip}的密码成功！`}
                                ).then(() => {
                                });
                            },
                        },
                    },
                ];

                return (<Operator items={items} hasPermission={() => true}/>);
            },
        },
    ];

    componentWillMount() {
        this.props.$ajax.get('/system/roles/all').then(res => {
            this.setState({roles: res});
        });
    }

    handleSearch = (params) => {
        return this.props.$ajax.get('/system/users', params)
            .then(res => {
                this.setState({
                    total: res.totalCount,
                    dataSource: res.results,
                });
            });
    };

    render() {
        const {total, dataSource} = this.state;
        return (
            <ListPage
                dataFilter={data => data}
                queryItems={this.queryItems}
                showSearchButton
                showResetButton={false}
                toolItems={this.toolItems}
                columns={this.columns}
                onSearch={this.handleSearch}
                total={total}
                dataSource={dataSource}
                rowKey={(record) => record._id}
                showPagination
                hasPermission={hasPermission}
            />
        );
    }
}
