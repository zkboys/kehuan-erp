import React, {Component} from 'react';
import {Modal} from 'antd';
import {ListPage} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {formatCurrency} from 'zk-tookit/utils';
import {units} from '../components/UnitSelect';
import {hasPermission, STOCK_THRESHOLD_COUNT} from '../../commons';


@ajax()
export default class extends Component {
    state = {
        total: 0,
        dataSource: [],
        selectedRowKeys: [],
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
            {
                type: 'input',
                field: 'spec',
                label: '规格',
                labelSpaceCount: 2,
                width: 200,
                placeholder: '请输入规格',
            },
            {
                type: 'input',
                field: 'model',
                label: '型号',
                labelSpaceCount: 2,
                width: 200,
                placeholder: '请输入型号',
            },
        ],
    ];

    columns = [
        {title: '名称', dataIndex: 'name', key: 'name'},
        {title: '规格', dataIndex: 'spec', key: 'spec'},
        {title: '型号', dataIndex: 'model', key: 'model'},
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
            title: '单个总量',
            dataIndex: 'singleUnit',
            key: 'singleUnit',
            render(text, record) {
                const u = units.find(item => item.code === record.unit);
                if (u) return `${text}${u.shortName}`;
                return text;
            },
        },
        {
            title: '单个总价',
            dataIndex: 'singleUnitPrice',
            key: 'singleUnitPrice',
            render(text) {
                return `${formatCurrency(text)}`;
            },
        },
        {
            title: '库存总数',
            dataIndex: 'stockCount',
            key: 'stockCount',
            render(text) {
                if (text < STOCK_THRESHOLD_COUNT) {
                    return <span style={{color: 'red'}}>{text}</span>;
                }
                return text;
            },
        },
        {
            title: '库存总量',
            dataIndex: 'stockTotal',
            key: 'stockTotal',
            render(text, record) {
                if (!text) return '';
                let result = text;
                const u = units.find(item => item.code === record.unit);
                if (u) result = `${text}${u.shortName}`;
                if (record.stockCount < STOCK_THRESHOLD_COUNT) {
                    return <span style={{color: 'red'}}>{result}</span>;
                }
                return result;
            },
        },
        {title: '备注', dataIndex: 'remark', key: 'remark'},
    ];

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

    handleSearch = (params) => {
        return this.props.$ajax.get('/products', params)
            .then(res => {
                this.setState({
                    total: res.totalCount,
                    dataSource: res.results,
                });
            });
    };

    handleOk = () => {
        const {onOk} = this.props;
        const {selectedRowKeys} = this.state;
        onOk(selectedRowKeys);
        this.setState({selectedRowKeys: []});
    };

    render() {
        const {total, dataSource, selectedRowKeys} = this.state;
        const {visible, onCancel} = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Modal
                title="选择产品"
                visible={visible}
                onOk={this.handleOk}
                onCancel={onCancel}
                width="80%"
            >
                <ListPage
                    hasPermission={hasPermission}
                    queryItems={this.queryItems}
                    showSearchButton
                    showResetButton={false}
                    columns={this.columns}
                    onSearch={this.handleSearch}
                    dataSource={dataSource}
                    rowKey={record => record._id}
                    rowSelection={rowSelection}
                    total={total}
                />
            </Modal>
        );
    }
}
