import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'antd';
import {InputClear, FormItemLayout} from 'zk-react/antd';

class QueryItem extends Component {
    static defaultProps = {
        items: [],
        onSubmit: () => {
        },
    };
    static propTypes = {
        onSubmit: PropTypes.func,
        items: PropTypes.array,
        layout: PropTypes.string,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {onSubmit} = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                onSubmit(values);
            }
        });
    };

    getPlaceholder(item) {
        const {type = 'input', label, placeholder} = item;
        if (placeholder) return placeholder;

        if (type === 'input') {
            return `请输入${label}!`;
        }
    }

    getFormElement(item) {
        const {form} = this.props;
        const {type = 'input'} = item;
        const placeholder = this.getPlaceholder(item);

        if (type === 'input') return <InputClear form={form} placeholder={placeholder}/>;
    }

    getFormItem(item) {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        const {field, decorator} = item;
        return (
            <FormItemLayout key={item.field} float {...item}>
                {getFieldDecorator(field, decorator)(this.getFormElement(item))}
            </FormItemLayout>
        );
    }

    render() {
        const {items, showSearchButton = true, showResetButton = true} = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                {
                    /*
                     * items 中元素为数组，则数组中所有表单元素占一行
                     *       如果不是数组，则独自占一行
                     * 查询按钮，拼接到最后一行
                     * */
                    items.map((data, index) => {
                        if (!Array.isArray(data)) {
                            data = [data];
                        }
                        return (
                            <div key={index}>
                                {
                                    data.map(item => {
                                        return this.getFormItem(item);
                                    })
                                }
                                {
                                    index === items.length - 1 && (showSearchButton || showResetButton) ?
                                        <div>
                                            {
                                                showSearchButton ?
                                                    <Button
                                                        style={{marginLeft: 8, marginBottom: 16}}
                                                        type="primary"
                                                        size="large"
                                                        htmlType="submit"
                                                    >
                                                        查询
                                                    </Button>
                                                    : null
                                            }
                                            {
                                                showResetButton ?
                                                    <Button
                                                        style={{marginLeft: 8, marginBottom: 16}}
                                                        type="ghost"
                                                        size="large"
                                                        onClick={() => this.props.form.resetFields()}
                                                    >
                                                        重置
                                                    </Button>
                                                    : null
                                            }
                                        </div>
                                        : null
                                }
                                <div style={{clear: 'both'}}/>
                            </div>
                        );
                    })
                }
            </Form>
        );
    }
}
export default Form.create()(QueryItem);
