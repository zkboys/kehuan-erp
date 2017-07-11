import React, {Component} from 'react';
import {Form, Input, Button, message, InputNumber} from 'antd';
import {PageContent, FormItemLayout} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import UnitSelect, {units} from '../components/UnitSelect';

export const PAGE_ROUTE = '/products/+edit/:id';

@ajax()
@Form.create()
export class LayoutComponent extends Component {
    state = {
        loading: false,
        isAdd: true,
        data: {},
    };

    componentWillMount() {
        const {id} = this.props.params;
        const {$ajax, actions, pageTitle} = this.props;
        if (id === ':id') {
            this.setState({isAdd: true});
            actions.setPageTitle(`${pageTitle}-添加产品`);
        } else {
            this.setState({isAdd: false});
            actions.setPageTitle(`${pageTitle}-修改产品`);
            $ajax.get(`/products/${id}`).then(res => {
                this.setState({
                    data: res,
                });
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {isAdd, loading} = this.state;
        const {form, $ajax, router} = this.props;

        if (loading) return;

        form.validateFields((err, values) => {
            if (!err) {
                const submitAjax = isAdd ? $ajax.post : $ajax.put;
                const successTip = isAdd ? '添加成功' : '修改成功';

                this.setState({loading: true});

                submitAjax('/products', values).then(() => {
                    message.success(successTip, 1.5, () => router.push('/products'));
                }).catch(() => {
                    this.setState({loading: false});
                });
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    getSingleUnitPrice() {
        const {data} = this.state;
        const {form: {getFieldValue}} = this.props;
        // 计算单个总价
        let singleUnitPrice;
        const unitPrice = getFieldValue('unitPrice') || data.unitPrice;
        const singleUnit = getFieldValue('singleUnit') || data.singleUnit;
        if (unitPrice && singleUnit) {
            singleUnitPrice = unitPrice * 100 * singleUnit;
        }
        return singleUnitPrice ? singleUnitPrice / 100 : singleUnitPrice;
    }

    render() {
        const {form: {getFieldDecorator, getFieldValue}} = this.props;
        const {loading, isAdd, data = {}} = this.state;
        const labelSpaceCount = 4;
        const tipWidth = 50;

        // 计算单个总价
        let singleUnitPrice = this.getSingleUnitPrice();

        // 获取单位
        const unit = getFieldValue('unit');
        const u = units.find(item => item.code === unit);
        const unitName = u ? u.shortName : '';

        return (
            <PageContent>
                <Form onSubmit={this.handleSubmit}>
                    {!isAdd ? getFieldDecorator('_id', {initialValue: data._id})(<Input type="hidden"/>) : null}
                    <FormItemLayout
                        label="名称"
                        labelSpaceCount={labelSpaceCount}
                        float
                        style={{width: '66%'}}
                        tipWidth={tipWidth}
                    >
                        {getFieldDecorator('name', {
                            initialValue: data.name,
                            rules: [
                                {required: true, message: '请输入名称！'},
                            ],
                        })(
                            <Input placeholder="请输入名称"/>
                        )}
                    </FormItemLayout>
                    <div style={{clear: 'both'}}/>
                    <FormItemLayout
                        label="规格"
                        labelSpaceCount={labelSpaceCount}
                        float
                        style={{width: '33%'}}
                        tipWidth={tipWidth}
                    >
                        {getFieldDecorator('spec', {
                            initialValue: data.spec,
                            rules: [
                                {required: true, message: '请输入规格！'},
                            ],
                        })(
                            <Input placeholder="请输入规格"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="型号"
                        labelSpaceCount={labelSpaceCount}
                        float
                        style={{width: '33%'}}
                        tipWidth={tipWidth}
                    >
                        {getFieldDecorator('model', {
                            initialValue: data.model,
                            rules: [
                                {required: true, message: '请输入型号！'},
                            ],
                        })(
                            <Input placeholder="请输入型号"/>
                        )}
                    </FormItemLayout>

                    <div style={{clear: 'both'}}/>

                    <FormItemLayout
                        label="单位"
                        labelSpaceCount={labelSpaceCount}
                        float
                        style={{width: '33%'}}
                        tipWidth={tipWidth}
                    >
                        {getFieldDecorator('unit', {
                            initialValue: data.unit || 'squareMetre',
                            rules: [
                                {required: true, message: '请选择单位！'},
                            ],
                        })(
                            <UnitSelect/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="单价"
                        labelSpaceCount={labelSpaceCount}
                        float
                        style={{width: '33%'}}
                        tip={`元/${unitName}`}
                        tipWidth={tipWidth}
                    >
                        {getFieldDecorator('unitPrice', {
                            initialValue: data.unitPrice,
                            rules: [
                                {required: true, message: '请输入单价！'},
                            ],
                        })(
                            <InputNumber
                                style={{width: '100%'}}
                                min={0}
                                step={0.01}
                                placeholder="请输入单价"
                            />
                        )}
                    </FormItemLayout>
                    <div style={{clear: 'both'}}/>
                    <FormItemLayout
                        label="单个总量"
                        labelSpaceCount={labelSpaceCount}
                        float
                        style={{width: '33%'}}
                        tip={`${unitName}`}
                        tipWidth={tipWidth}
                    >
                        {getFieldDecorator('singleUnit', {
                            initialValue: data.singleUnit || 1,
                            rules: [
                                {required: true, message: '请输入单个总量！'},
                            ],
                        })(
                            <InputNumber
                                style={{width: '100%'}}
                                min={0}
                                step={0.01}
                                placeholder="请输入单个总量"
                            />
                        )}
                    </FormItemLayout>
                    <FormItemLayout
                        label="单个总价"
                        labelSpaceCount={labelSpaceCount}
                        float
                        style={{width: '33%'}}
                        tip="元"
                        tipWidth={tipWidth}
                    >
                        {getFieldDecorator('singleUnitPrice', {
                            initialValue: singleUnitPrice,
                        })(
                            <Input disabled/>
                        )}
                    </FormItemLayout>

                    <div style={{clear: 'both'}}/>

                    <FormItemLayout
                        label="备注"
                        labelSpaceCount={labelSpaceCount}
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

export function mapStateToProps(state) {
    return {
        ...state.frame,
    };
}
