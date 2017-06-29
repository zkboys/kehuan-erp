import React, {Component} from 'react';
import {message} from 'antd';
import {Operator, ListPage, EditableCell} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';

export const PAGE_ROUTE = '/system/domain';

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
                label: '域名',
                labelSpaceCount: 3,
                width: 200,
                placeholder: '请输入域名',
            },
        ],
    ];

    toolItems = [
        {
            type: 'primary',
            text: '添加',
            permission: 'SYSTEM_ADD', // TODO 权限code
            onClick: () => {
                const dataSource = [...this.state.dataSource];
                if (dataSource.find(item => item.isNewAdd)) {
                    return message.error('每次只能新增一条记录！');
                }
                const newData = {
                    id: `${new Date().getTime()}`,
                    isNewAdd: true,
                    name: '域名',
                    defaultShowEdit: true,
                };
                dataSource.unshift(newData);
                this.setState({dataSource});
            },
        },
    ];

    columns = [
        {
            title: '域名',
            dataIndex: 'name',
            key: 'name',
            width: '60%',
            render: (text, record) => {
                return (
                    <EditableCell
                        type="input"
                        field="name"
                        placeholder="请输入域名"
                        text={text}
                        decorator={{
                            rules: [
                                {required: true, message: '域名不能为空!'},
                            ],
                        }}
                        defaultShowEdit={record.defaultShowEdit}
                        onSubmit={(value) => {
                            if (record.isNewAdd) {
                                // TODO: 添加操作
                                this.props.$ajax.post('/mock/users', value).then(() => {
                                    console.log('添加：', value);
                                    this.props.$ajax.get('/mock/users');
                                });
                            } else {
                                // TODO: 修改操作
                                this.props.$ajax.put('/mock/users', value).then(() => {
                                    console.log('修改：', value);
                                    this.props.$ajax.get('/mock/users');
                                });
                            }
                        }}
                    />
                );
            },
        },
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const items = [
                    {
                        label: '删除',
                        permission: '',
                        confirm: {
                            title: `您确定要删除“${record.name}”？`,
                            onConfirm: () => {
                                // TODO 发请求，进行删除
                                this.props.$ajax.del('/mock/users', record).then((res) => {
                                    this.props.$ajax.get('/mock/users');
                                    console.log('删除', res);
                                });
                                const dataSource = this.state.dataSource.filter(item => item.id !== record.id);
                                this.setState({
                                    dataSource,
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
        console.log(params);
        // TODO 请求后端
        return this.props.$ajax.get('/mock/users', params)
            .then(data => {
                this.setState({
                    total: data.total,
                    dataSource: data.list,
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
                total={total}
            />
        );
    }
}
