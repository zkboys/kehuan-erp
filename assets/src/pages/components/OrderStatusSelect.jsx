import React, {Component} from 'react';
import {Select} from 'antd';

const Option = Select.Option;
export const orderStatus = [
    {value: '0', label: '审核中'},
    {value: '1', label: '审核通过'},
    {value: '2', label: '驳回'},
    {value: '3', label: '作废'},
    {value: '4', label: '生产中'},
    {value: '5', label: '配送中'},
    {value: '6', label: '已完成'},

];

export default class DomainSelect extends Component {
    state = {};

    render() {
        return (
            <Select
                placeholder="请选择状态"
                {...this.props}
            >
                {
                    orderStatus.map(item => <Option key={item.value}>{item.label}</Option>)
                }
            </Select>
        );
    }
}
