import React, {Component} from 'react';
import {Modal} from 'antd';
import {Operator, ListPage} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {formatCurrency} from 'zk-tookit/utils';
import {hasPermission} from '../../commons';
import Edit from './Edit';
import {units} from '../components/UnitSelect';

export const PAGE_ROUTE = '/materials';

@ajax()
export default class MaterialList extends Component {
    state = {
        total: 0,
        dataSource: [],
        modalVisible: false,
        params: {},
        modalData: {},
    };

    queryItems = [
        [
            {
                type: 'input',
                field: 'name',
                label: '名称',
                labelSpaceCount: 2,
                width: 200,
                placeholder: '请输入名称',
            },
        ],
    ];

    toolItems = [
        {
            type: 'primary',
            text: '添加',
            icon: 'fa-plus',
            permission: 'MATERIAL_ADD',
            onClick: () => {
                this.setState({
                    modalVisible: true,
                    modalData: {},
                });
            },
        },
    ];

    columns = [
        {title: '名称', dataIndex: 'name', key: 'name'},
        {title: '规格', dataIndex: 'spec', key: 'spec'},
        {
            title: '单位',
            dataIndex: 'unit',
            key: 'unit',
            render(text) {
                const u = units.find(item => item.code === text);
                if (u) return u.name;
                return text;
            },
        },
        {
            title: '单价',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            render(text, record) {
                const u = units.find(item => item.code === record.unit);
                if (u) return `${formatCurrency(text)}/${u.shortName}`;
                return text;
            },
        },
        {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
            render(text, record) {
                const u = units.find(item => item.code === record.unit);
                if (u) return `${text} ${u.shortName}`;
                return text;
            },
        },
        {title: '备注', dataIndex: 'remark', key: 'remark'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {_id: id, name} = record;
                const successTip = `删除“${name}”成功！`;
                const items = [
                    {
                        label: '编辑',
                        permission: 'MATERIAL_UPDATE',
                        onClick: () => {
                            this.setState({
                                modalVisible: true,
                                modalData: record,
                            });
                        },
                    },
                    {
                        label: '删除',
                        permission: 'MATERIAL_DELETE',
                        confirm: {
                            title: `您确定要删除“${name}”？`,
                            onConfirm: () => {
                                this.props.$ajax.del(`/materials/${id}`, null, {successTip}).then(() => {
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
        this.setState({params});
        return this.props.$ajax.get('/materials', params)
            .then(res => {
                this.setState({
                    total: res.totalCount,
                    dataSource: res.results,
                });
            });
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

    handleModalSubmit = (values) => {
        const {$ajax} = this.props;
        const isAdd = !values._id;
        const submitAjax = isAdd ? $ajax.post : $ajax.put;
        const successTip = isAdd ? '添加成功' : '修改成功';

        this.setState({loading: true});

        submitAjax('/materials', values, {successTip}).then(() => {
            this.handleCancel();
            const params = {...this.state.params};
            params.pageNum = 1;
            this.handleSearch(params);
        });
    };

    render() {
        const {
            total,
            dataSource,
            modalVisible,
            modalData,
        } = this.state;
        const modalTitle = modalData && modalData._id ? '修改原料' : '添加原料';
        return (
            <div>
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
                <Modal
                    width={600}
                    title={modalTitle}
                    visible={modalVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Edit data={modalData} onSubmit={this.handleModalSubmit}/>
                </Modal>
            </div>
        );
    }
}
