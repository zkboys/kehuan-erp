import React, {Component} from 'react';
import {Button} from 'antd';
import {Link} from 'react-router';
import {Operator, ListPage} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {formatCurrency, mosaicUrl} from 'zk-tookit/utils';
import moment from 'moment';
import {hasPermission, getAjaxBaseUrl} from '../../commons';
import {orderStatus} from '../components/OrderStatusSelect';

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
                field: 'orderNum',
                label: '订单编号',
                labelSpaceCount: 4,
                width: 250,
                placeholder: '请输入订单编号',
            },
            {
                type: 'select',
                field: 'status',
                label: '订单状态',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请选择订单状态',
                elementProps: {
                    options: orderStatus,
                },
            },
            {
                type: 'data-range',
                label: '出货日期',
                field: 'date',
                placeholder: ['开始时间', '结束时间'],
                width: 300,
                labelSpaceCount: 4,
            },
        ],
    ];

    toolItems = [
        {
            type: 'primary',
            text: '发起订单',
            permission: 'ORDER_ADD',
            onClick: () => {
                this.props.router.push('/orders/send');
            },
        },
        {
            permission: 'ORDER_EXPORT',
            getComponent: () => {
                const {params} = this.state;
                const url = mosaicUrl(`${getAjaxBaseUrl()}/orders/excel`, params);
                return (
                    <a href={url}>
                        <Button type="ghost">导出Excel</Button>
                    </a>
                );
            },
        },
    ];

    columns = [
        {
            title: '订单编号',
            width: 120,
            dataIndex: 'orderNum',
            render(text, record) {
                return <Link to={`/orders/send/+edit/${record._id}?detail=true`}>{text}</Link>;
            },
        },
        {
            title: '订单总价',
            width: 100,
            dataIndex: 'totalPrice',
            render(text) {
                if (text) return formatCurrency(text);
                return text;
            },
        },
        {
            title: '优惠金额',
            width: 100,
            dataIndex: 'discount',
            render(text) {
                if (text) return formatCurrency(text);
                return text;
            },
        },
        {
            title: '优惠后总价',
            width: 100,
            dataIndex: 'afterDiscountTotalPrice',
            render(text) {
                if (text) return formatCurrency(text);
                return text;
            },
        },
        {title: '发起人', width: 80, dataIndex: 'sendUserName'},
        {title: '发起部门', width: 150, dataIndex: 'sendOrgName'},
        {title: '接收部门', width: 150, dataIndex: 'receiveOrgName'},
        // {title: '接收人', width: 80, dataIndex: 'receiveUserName'},
        {
            title: '下单日期',
            width: 150,
            dataIndex: 'sendTime',
            render(text) {
                if (text) return moment(text).format('YYYY-MM-DD HH:mm:ss');
                return text;
            },
        },
        {
            title: '出货日期',
            width: 150,
            dataIndex: 'deliveryTime',
            render(text) {
                if (text) return moment(text).format('YYYY-MM-DD HH:mm:ss');
                return text;
            },
        },
        // {title: '产品列表', dataIndex: 'products', key: 'products'},
        {title: '驳回原因', width: 150, dataIndex: 'rejectReason'},
        {title: '作废原因', width: 150, dataIndex: 'destroyReason'},
        // {title: '操作历史', dataIndex: 'operatorHistory', key: 'operatorHistory'},
        {title: '备注', dataIndex: 'remark'},
        {
            title: '状态',
            width: 80,
            fixed: 'right',
            dataIndex: 'status',
            render(text) {
                const status = orderStatus.find(item => item.value === text);
                if (status) return status.label;
                return '';
            },
        },
        {
            title: '操作',
            width: 200,
            fixed: 'right',
            key: 'operator',
            render: (text, record) => {
                const pass = {
                    label: '审核通过',
                    permission: 'ORDER_PASS',
                    confirm: {
                        title: '您确定要审核通过此订单？',
                        onConfirm: () => {
                            this.props.$ajax.put('/orders/pass', {id: record._id}, {successTip: '通过成功！'}).then(() => {
                                this.handleSearch(this.state.params);
                            });
                        },
                    },
                };
                const reject = {
                    type: 'prompt',
                    label: '驳回',
                    permission: 'ORDER_REJECT',
                    title: '驳回原因',
                    okText: '驳回',
                    inputProps: {
                        rows: 3,
                        placeholder: '请输入驳回原因',
                    },
                    decorator: {
                        rules: [
                            {required: true, message: '请输入驳回原因！'},
                        ],
                    },
                    onConfirm: value => {
                        const params = {id: record._id, rejectReason: value};
                        this.props.$ajax.put('/orders/reject', params, {successTip: '驳回成功！'}).then(() => {
                            this.handleSearch(this.state.params);
                        });
                    },
                };
                const destroy = {
                    type: 'prompt',
                    label: '作废',
                    permission: 'ORDER_DESTROY',
                    title: '作废原因',
                    okText: '作废',
                    inputProps: {
                        rows: 3,
                        placeholder: '请输入作废原因',
                    },
                    decorator: {
                        rules: [
                            {required: true, message: '请输入作废原因！'},
                        ],
                    },
                    onConfirm: value => {
                        const params = {id: record._id, destroyReason: value};
                        this.props.$ajax.put('/orders/destroy', params, {successTip: '作废成功！'}).then(() => {
                            this.handleSearch(this.state.params);
                        });
                    },
                };
                const update = {
                    label: '重新发起',
                    permission: 'ORDER_UPDATE',
                    onClick: () => {
                        this.props.router.push(`/orders/send/+edit/${record._id}`);
                    },
                };

                const complete = {
                    label: '完成',
                    permission: 'ORDER_COMPLETE',
                    confirm: {
                        title: '您确定要完成此订单？',
                        onConfirm: () => {
                            this.props.$ajax.put('/orders/complete', {id: record._id}, {successTip: '订单已完成！'}).then(() => {
                                this.handleSearch(this.state.params);
                            });
                        },
                    },
                };


                const {status, receiveOrgId, sendOrgId} = record;
                const currentLoginUser = this.props.$currentLoginUser || {};
                const currentLoginUserOrgId = currentLoginUser.org_id;
                let items = [];
                // 待审核
                if (status === '0' && receiveOrgId === currentLoginUserOrgId) {
                    items = [
                        pass,
                        complete,
                        reject,
                        destroy,
                    ];
                }
                // 审核通过
                if (status === '1' && receiveOrgId === currentLoginUserOrgId) {
                    items = [
                        complete,
                        reject,
                        destroy,
                    ];
                }
                // 驳回
                if (status === '2' && sendOrgId === currentLoginUserOrgId) {
                    items = [
                        update,
                        destroy,
                    ];
                }
                return (<Operator items={items} hasPermission={hasPermission}/>);
            }
            ,
        },
    ];

    handleSearch = (params = {}) => {
        const {date} = params;
        if (date && date.length) {
            params.startDate = date[0].format('YYYY-MM-DD');
            params.endDate = date[1].format('YYYY-MM-DD');
        } else {
            Reflect.deleteProperty(params, 'startDate');
            Reflect.deleteProperty(params, 'endDate');
        }
        this.setState({params});
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
                    tableProps={{
                        scroll: {
                            x: 2200,
                        },
                    }}
                />
            </div>
        );
    }
}
