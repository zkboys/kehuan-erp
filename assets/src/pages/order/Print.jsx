import React, {Component} from 'react';
import {Table} from 'antd';
import moment from 'moment';
import {ajax} from 'zk-tookit/react';
import {units} from '../components/UnitSelect';
import {orderStatus} from '../components/OrderStatusSelect';

export const PAGE_ROUTE = '/orders/:id/print';

@ajax()
export default class Print extends Component {
    state = {
        data: {},
    };

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
            title: '数量',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: '总量',
            dataIndex: 'total',
            key: 'total',
            render: (text, record) => {
                const {singleUnit, count = 0} = record;
                const value = singleUnit * 10000 * count; // 避免js精度问题
                const u = units.find(item => item.code === record.unit);
                if (u) return `${value / 10000}${u.shortName}`;
                return value;
            },
        },
    ];

    componentWillMount() {
        const {id} = this.props.params;
        this.props.$ajax.get(`/orders/${id}`).then(res => {
            this.setState({data: res});
            setTimeout(() => {
                const printHtml = document.getElementById('frame-content').innerHTML;
                window.document.body.innerHTML = printHtml;
                window.print();
            });
        });
    }

    componentDidMount() {
        const {actions} = this.props;
        actions.hidePageHeader();
        actions.hideSideBar();
    }

    render() {
        const {data} = this.state;
        const dataSource = data.products || [];
        const spanStyle = {display: 'inline-block', padding: '8px 16px'};
        const labelStyle = {display: 'inline-block', width: 60, textAlign: 'right'};
        const valueStyle = {display: 'inline-block', width: 120, textAlign: 'left'};
        const status = orderStatus.find(item => item.value === data.status);
        const statusLabel = status ? status.label : '未知状态';


        return (
            <div>
                <div style={{textAlign: 'left'}}>
                    <span style={spanStyle}>
                        <span style={labelStyle}>订单编号：</span>
                        <span style={valueStyle}>{data.orderNum}</span>
                    </span>
                    <span style={spanStyle}>
                        <span style={labelStyle}>订单状态：</span>
                        <span style={valueStyle}>{statusLabel}</span>
                    </span>
                </div>
                <div style={{textAlign: 'left'}}>
                    <span style={spanStyle}>
                        <span style={labelStyle}>出货日期：</span>
                        <span style={valueStyle}>{moment(data.deliveryTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </span>
                    <span style={spanStyle}>
                        <span style={labelStyle}>发起部门：</span>
                        <span style={valueStyle}>{data.sendOrgName}</span>
                    </span>
                    <span style={spanStyle}>
                        <span style={labelStyle}>发起人：</span>
                        <span style={valueStyle}>{data.sendUserName}</span>
                    </span>
                </div>
                <Table
                    size="small"
                    style={{marginBottom: 16}}
                    dataSource={dataSource}
                    columns={this.columns}
                    rowKey={record => record._id}
                    pagination={false}
                />
            </div>
        );
    }
}

export const mapStateToProps = (state) => ({...state.frame});
