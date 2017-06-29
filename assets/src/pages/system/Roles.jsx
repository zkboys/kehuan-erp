import React, {Component} from 'react';
import {Operator, ListPage} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';

export const PAGE_ROUTE = '/system/role';

@ajax()
export default class extends Component {
    state = {
        total: 0,
        dataSource: [],
    };

    queryItems = [
        [
            {
                type: 'input',
                field: 'name',
                label: '角色名',
                labelSpaceCount: 3,
                width: 200,
                placeholder: '请输入角色名',
            },
        ],
    ];

    toolItems = [
        {
            type: 'primary',
            text: '添加',
            permission: 'ROLE_ADD',
            onClick: () => {
                this.props.router.push('/system/role/+edit/:id');
            },
        },
    ];

    columns = [
        {title: '角色名称', dataIndex: 'name', key: 'name'},
        {title: '描述', dataIndex: 'description', key: 'description'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {_id: id, name} = record;
                const successTip = `删除“${name}”成功！`;
                const items = [
                    {
                        label: '修改',
                        permission: 'CODE-MODIFY',
                        onClick: () => {
                            this.props.router.push(`/system/role/+edit/${id}`);
                        },
                    },
                    {
                        label: '删除',
                        permission: '',
                        confirm: {
                            title: `您确定要删除“${name}”？`,
                            onConfirm: () => {
                                this.props.$ajax.del(`/system/roles/${id}`, null, {successTip}).then(() => {
                                    const dataSource = this.state.dataSource.filter(item => item._id !== id);
                                    this.setState({
                                        dataSource,
                                    });
                                });
                            },
                        },
                    },
                ];

                return (<Operator items={items} hasPermission={() => true}/>);
            },
        },
    ];

    handleSearch = (params) => {
        return this.props.$ajax.get('/system/roles', params)
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
                queryItems={this.queryItems}
                showSearchButton
                showResetButton={false}
                toolItems={this.toolItems}
                columns={this.columns}
                onSearch={this.handleSearch}
                dataSource={dataSource}
                rowKey={record => record._id}
                total={total}
            />
        );
    }
}
