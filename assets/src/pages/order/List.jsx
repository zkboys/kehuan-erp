import React, {Component} from 'react';
import {Operator, ListPage} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {hasPermission} from '../../commons';

export const PAGE_ROUTE = '/orders';

@ajax()
export default class OrderList extends Component {
    state = {
        total: 0,
        dataSource: [],
    };

    queryItems = [
        [
            {
                type: 'input',
                field: 'name',
                label: '名称',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入名称',
            },
        ],
    ];

    toolItems = [
        {
            type: 'primary',
            text: '添加',
            permission: 'ORDER_ADD',
            onClick: () => {
                this.props.router.push('/orders/+edit/:id');
            },
        },
    ];

    columns = [
        {title: '发起人', dataIndex: 'sendUserId', key: 'sendUserId'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {_id: id, name} = record;
                const successTip = `删除“${name}”成功！`;
                const items = [
                    {
                        label: '修改',
                        permission: 'ORDER_UPDATE',
                        onClick: () => {
                            this.props.router.push(`/orders/+edit/${id}`);
                        },
                    },
                    {
                        label: '删除',
                        permission: 'ORDER_DELETE',
                        confirm: {
                            title: `您确定要删除“${name}”？`,
                            onConfirm: () => {
                                this.props.$ajax.del(`/orders/${id}`, null, {successTip}).then(() => {
                                    const dataSource = this.state.dataSource.filter(item => item._id !== id);
                                    this.setState({
                                        dataSource,
                                    });
                                });
                            },
                        },
                    },
                ];

                return (<Operator items={items} hasPermission={hasPermission}/>);
            },
        },
    ];

    handleSearch = (params) => {
        return this.props.$ajax.get('/orders', params)
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
                hasPermission={hasPermission}
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
