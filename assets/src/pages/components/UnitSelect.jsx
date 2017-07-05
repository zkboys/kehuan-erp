import React, {Component} from 'react';
import {Select} from 'antd';

const Option = Select.Option;

export const units = [
    {code: 'm*m', name: '平米(㎡)'},
    {code: 'kg', name: '千克(kg)'},
    {code: 'g', name: '克(g)'},
    {code: 't', name: '顿(t)'},
    {code: 'ge', name: '个'},
    {code: 'box', name: '箱'},
    {code: 'other', name: '其他'},
];

export default class DomainSelect extends Component {
    state = {};

    render() {
        return (
            <Select
                allowClear
                placeholder="请选择单位"
                {...this.props}
            >
                {
                    units.map(item => <Option key={item.code}>{item.name}</Option>)
                }
            </Select>
        );
    }
}
