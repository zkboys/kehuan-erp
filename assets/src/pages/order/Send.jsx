import React, {Component} from 'react';
import {Form, Input, InputNumber, Button, message, DatePicker, Table} from 'antd';
import {PageContent, FormItemLayout, Operator} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {units} from '../components/UnitSelect';
import ProductSelect from '../components/ProductSelect';

export const PAGE_ROUTE = '/orders/send';

@ajax()
@Form.create()
export default class OrderSend extends Component {
    state = {
        loading: false,
        data: {},
        dataSource: [],
        organizations: [],
        showProductSelect: false,
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
        {
            title: '数量',
            dataIndex: 'count',
            key: 'count',
            render: (text, record) => {
                return (
                    <InputNumber
                        value={text}
                        onChange={value => {
                            const dataSource = [...this.state.dataSource];
                            const data = dataSource.find(item => item._id === record._id);
                            data.count = value;
                            this.setState({dataSource});
                            this.setTotalPrice(dataSource);
                        }}
                    />
                );
            },
        },
        {
            title: '总量',
            dataIndex: 'total',
            key: 'total',
            render: (text, record) => {
                const {singleUnit, count = 0} = record;
                const value = singleUnit * count;
                const u = units.find(item => item.code === record.unit);
                if (u) return `${value}${u.shortName}`;
                return value;
            },
        },
        {
            title: '总价',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => {
                const {singleUnit, unitPrice, count = 0} = record;
                const value = singleUnit * count * unitPrice;
                return `${value}元`;
            },
        },
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {_id: id, name} = record;
                const items = [
                    {
                        label: '移除',
                        permission: 'PRODUCT_DELETE',
                        confirm: {
                            title: `您确定要移除“${name}”？`,
                            onConfirm: () => {
                                const dataSource = this.state.dataSource.filter(item => item._id !== id);
                                this.setState({
                                    dataSource,
                                });
                                this.setTotalPrice(dataSource);
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

    setTotalPrice(dataSource) {
        const totalPrice = dataSource.reduce((previous, current) => {
            const {singleUnit, count, unitPrice} = current;
            return previous + (singleUnit * count * unitPrice);
        }, 0);
        this.props.form.setFieldsValue({totalPrice});
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

                values.products.forEach(item => {
                    const {singleUnit, count, unitPrice} = item;
                    item.totalPrice = singleUnit * count * unitPrice;
                    item.total = singleUnit * count;
                });
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
        this.setState({showProductSelect: true});
    };

    handleProductSelectOk = (productKeys = []) => {
        this.setState({showProductSelect: false});
        if (productKeys && productKeys.length) {
            this.props.$ajax.get('products/ids', {ids: productKeys.join(',')}).then(res => {
                const dataSource = res.map(item => ({count: 1, ...item}));
                this.setState({dataSource});
                this.setTotalPrice(dataSource);
            });
        }
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
        const {loading, data = {}, dataSource, showProductSelect} = this.state;
        const currentLoginUserId = $currentLoginUser.id;
        const currentOrgId = $currentLoginUser.org_id;
        const parentOrg = this.getParentOrg(currentOrgId) || {};
        // receiveOrgId 默认为上级部门 parentOrg
        const labelSpaceCount = 4;
        return (
            <PageContent>
                <div style={{marginBottom: 8}}>
                    <Button type="primary" onClick={this.handleAddProduct}>选择产品</Button>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Table
                        size="small"
                        style={{marginBottom: 16}}
                        dataSource={dataSource}
                        columns={this.columns}
                        rowKey={record => record._id}
                        pagination={false}
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
                <ProductSelect
                    visible={showProductSelect}
                    onOk={this.handleProductSelectOk}
                    onCancel={() => this.setState({showProductSelect: false})}
                />
            </PageContent>
        );
    }
}
