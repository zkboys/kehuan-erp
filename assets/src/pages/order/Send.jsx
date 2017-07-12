import React, {Component} from 'react';
import {Form, Input, Button, message, DatePicker, Table} from 'antd';
import {PageContent, FormItemLayout, Operator} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {units} from '../components/UnitSelect';

export const PAGE_ROUTE = '/orders/send';

@ajax()
@Form.create()
export default class OrderSend extends Component {
    state = {
        loading: false,
        data: {},
        dataSource: [],
        organizations: [],
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
            title: '单价',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            render(text, record) {
                const u = units.find(item => item.code === record.unit);
                if (u) return `${text}元/${u.shortName}`;
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
                return `${text}元`;
            },
        },
        {title: '数量', dataIndex: 'count', key: 'count'},
        {title: '总量', dataIndex: 'total', key: 'total'},
        {title: '总价', dataIndex: 'totalPrice', key: 'totalPrice'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {_id: id, name} = record;
                const successTip = `删除“${name}”成功！`;
                const items = [
                    {
                        label: '删除',
                        permission: 'PRODUCT_DELETE',
                        confirm: {
                            title: `您确定要删除“${name}”？`,
                            onConfirm: () => {
                                this.props.$ajax.del(`/products/${id}`, null, {successTip}).then(() => {
                                    const dataSource = this.state.dataSource.filter(item => item._id !== id);
                                    this.setState({
                                        dataSource,
                                    });
                                });
                            },
                        },
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    componentWillMount() {
        this.props.$ajax.get('/system/organizations').then(res => {
            const list = res || [];
            this.setState({organizations: list});
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {loading, dataSource} = this.state;
        const {form, $ajax, router} = this.props;

        if (loading) return;

        form.validateFields((err, values) => {
            if (!err) {
                values.sendTime = new Date();
                values.products = dataSource;

                const successTip = '订单发起成功';

                this.setState({loading: true});

                $ajax.post('/orders', values).then(() => {
                    message.success(successTip, 1.5, () => router.push('/orders'));
                }).catch(() => {
                    this.setState({loading: false});
                });
            }
        });
    };

    handleAddProduct = () => {
        console.log('handleAddProduct');
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    getParentOrg(orgId) {
        const {organizations} = this.state;
        const org = organizations.find(item => item._id === orgId);
        if (org) {
            const parentOrg = organizations.find(item => item._id === org.parentId);
            if (parentOrg) return parentOrg;
            return org;
        }
    }

    render() {
        const {form: {getFieldDecorator}, $currentLoginUser} = this.props;
        const {loading, data = {}, dataSource} = this.state;
        const currentLoginUserId = $currentLoginUser.id;
        const currentOrgId = $currentLoginUser.org_id;
        const parentOrg = this.getParentOrg(currentOrgId) || {};

        const labelSpaceCount = 4;

        /*
         status: {type: String}, // 订单状态： 0 审核中 1 审核通过 2 驳回 3 作废 4 生产中 5 配送中 6 已完成
         totalPrice: {type: Number}, // 订单总价
         sendUserId: {type: String}, // 发起人
         sendOrgId: {type: String}, // 发起部门
         receiveOrgId: {type: String}, // 接收部门
         receiveUserId: {type: String}, // 接收人，如果没有指定接收人，就直接到部门，部门下所有人员都可见
         deliveryTime: {type: String}, // 出货日期
         remark: {type: String},
         sendTime: {type: String}, // 下单日期

         products: {type: Array}, // 产品列表

         rejectReason: {type: String}, // 驳回原因
         destroyReason: {type: String}, // 作废原因
         operatorHistory: {type: Array}, // 操作历史 recei
         * */
        return (
            <PageContent>
                <div style={{marginBottom: 8}}>
                    <Button type="primary" onClick={this.handleAddProduct}>添加产品</Button>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Table
                        size="small"
                        style={{marginBottom: 16}}
                        dataSource={dataSource}
                        columns={this.columns}
                    />
                    {getFieldDecorator('status', {initialValue: 0})(<Input type="hidden"/>)}
                    {getFieldDecorator('sendUserId', {initialValue: currentLoginUserId})(<Input type="hidden"/>)}
                    {getFieldDecorator('sendOrgId', {initialValue: currentOrgId})(<Input type="hidden"/>)}
                    {getFieldDecorator('receiveOrgId', {initialValue: parentOrg._id})(<Input type="hidden"/>)}
                    <FormItemLayout
                        label="订单总价"
                        labelSpaceCount={labelSpaceCount}
                        float
                        tip="元"
                        tipWidth={50}
                        style={{width: 300}}
                    >
                        {getFieldDecorator('totalPrice', {
                            initialValue: data.totalPrice,
                        })(
                            <Input disabled/>
                        )}
                    </FormItemLayout>
                    <FormItemLayout
                        label="出货日期"
                        labelSpaceCount={labelSpaceCount}
                        float
                        style={{width: 300}}
                    >
                        {getFieldDecorator('deliveryTime', {
                            initialValue: data.deliveryTime,
                            rules: [
                                {required: true, message: '请选择出货日期'},
                            ],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width: '100%'}}/>
                        )}
                    </FormItemLayout>

                    <div style={{clear: 'both'}}/>

                    <FormItemLayout
                        label="接收部门"
                        labelSpaceCount={labelSpaceCount}
                        style={{width: 600}}
                    >
                        {getFieldDecorator('receiveOrgName', {
                            initialValue: parentOrg.name,
                        })(
                            <Input disabled/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="备注"
                        labelSpaceCount={labelSpaceCount}
                        style={{width: 600}}
                    >
                        {getFieldDecorator('remark', {
                            initialValue: data.remark,
                        })(
                            <Input style={{height: 100}} type="textarea" placeholder="请输入备注"/>
                        )}
                    </FormItemLayout>

                    <div style={{paddingLeft: (labelSpaceCount + 2) * 12}}>
                        <Button
                            style={{marginRight: 8}}
                            loading={loading}
                            type="primary"
                            onClick={this.handleSubmit}
                        >
                            提交
                        </Button>
                        <Button
                            type="ghost"
                            onClick={this.handleReset}
                        >
                            重置
                        </Button>
                    </div>
                </Form>
            </PageContent>
        );
    }
}
