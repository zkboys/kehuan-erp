import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, InputNumber} from 'antd';
import {PageContent, FormItemLayout} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import UnitSelect, {units} from '../components/UnitSelect';

@ajax()
@Form.create()
export default class MaterialEdit extends Component {
    state = {
        loading: false,
    };

    static propTypes = {
        data: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {loading} = this.state;
        const {form, onSubmit} = this.props;

        if (loading) return;

        form.validateFields((err, values) => {
            if (!err) {
                onSubmit(values);
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {form: {getFieldDecorator, getFieldValue}, data = {}} = this.props;
        const {loading} = this.state;
        const isAdd = !(data && data._id);
        const labelSpaceCount = 3;
        const tipWidth = 50;

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
                        style={{width: '50%'}}
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

                    <FormItemLayout
                        label="规格"
                        labelSpaceCount={labelSpaceCount}
                        float
                        style={{width: '50%'}}
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
                        label="单位"
                        labelSpaceCount={labelSpaceCount}
                        float
                        style={{width: '50%'}}
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
                        style={{width: '50%'}}
                        tip={`元/${unitName || '㎡'}`}
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
                        label="备注"
                        labelSpaceCount={labelSpaceCount}
                        style={{width: '100%'}}
                    >
                        {getFieldDecorator('remark', {
                            initialValue: data.remark,
                            rules: [
                                {required: false, message: '请输入备注！'},
                            ],
                        })(
                            <Input
                                style={{height: 100}}
                                type="textarea"
                                placeholder="请输入备注"
                            />
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        labelSpaceCount={labelSpaceCount}
                    >
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
                    </FormItemLayout>
                </Form>
            </PageContent>
        );
    }
}
