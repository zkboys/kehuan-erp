import React, {Component} from 'react';
import {Link} from 'react-router';
import {Operator, ListPage} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {formatCurrency} from 'zk-tookit/utils';
import moment from 'moment';
import {hasPermission} from '../../commons';
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

    /*
     status: {type: String}, // 订单状态： 0 审核中 1 审核通过 2 驳回 3 作废 4 生产中 5 配送中 6 已完成
     totalPrice: {type: Number}, // 订单总价
     sendUserId: {type: String}, // 发起人
     sendOrgId: {type: String}, // 发起部门
     receiveOrgId: {type: String}, // 接收部门
     receiveUserId: {type: String}, // 接收人，如果没有指定接收人，就直接到部门，部门下所有人员都可见
     sendTime: {type: Date}, // 下单日期
     deliveryTime: {type: Date}, // 出货日期
     products: {type: Array}, // 产品列表
     remark: {type: String}, // 备注
     rejectReason: {type: String}, // 驳回原因
     destroyReason: {type: String}, // 作废原因
     operatorHistory: {type: Array}, // 操作历史 receiveOrgId receiveOrgId status 是操作历史中最后信息
     });
     * */
    columns = [
        {
            title: '订单编号',
            width: 120,
            dataIndex: 'orderNum',
            render(text) {
                return <Link to="/orders/detail/:id">{text}</Link>;
            },
        },
        {
            title: '订单总价',
            width: 100,
            dataIndex: 'totalPrice',
            render(text) {
                return formatCurrency(text);
            },
        },
        {title: '发起人', width: 80, dataIndex: 'sendUserName'},
        {title: '发起部门', width: 150, dataIndex: 'sendOrgName'},
        {title: '接收部门', width: 150, dataIndex: 'receiveOrgName'},
        {title: '接收人', width: 80, dataIndex: 'receiveUserName'},
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
            width: 60,
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
                            this.props.$ajax.put('/orders/pass', {id: record._id}).then(() => {
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
                        // TODO
                        console.log(value);
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
                        // TODO
                        console.log(value);
                    },
                };
                const update = {
                    label: '修改',
                    permission: 'ORDER_UPDATE',
                    onClick: value => {
                        // TODO
                        console.log(value);
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
                        reject,
                        destroy,
                    ];
                }
                // 审核通过
                if (status === '1' && receiveOrgId === currentLoginUserOrgId) {
                    items = [
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

    handleSearch = (params) => {
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
                        x: 1800,
                    },
                }}
            />
        );
    }
}
