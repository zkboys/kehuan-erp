import React, {Component} from 'react';
import {Select} from 'antd';

const Option = Select.Option;

export const units = [
    {code: 'squareMetre', name: '平米(㎡)', shortName: '㎡'},
    {code: 'gen', name: '根', shortName: '根'},
    {code: 'zhang', name: '张', shortName: '张'},
    {code: 'kg', name: '千克(kg)', shortName: 'kg'},
    {code: 'g', name: '克(g)', shortName: 'g'},
    {code: 't', name: '吨(t)', shortName: 't'},
    {code: 'ge', name: '个', shortName: '个'},
    {code: 'box', name: '箱', shortName: '箱'},
    {code: 'package', name: '包', shortName: '包'},
    {code: 'reel', name: '卷', shortName: '卷'},
    {code: 'bundle', name: '捆', shortName: '捆'},
    {code: 'other', name: '其他', shortName: '其他'},
];

export default class DomainSelect extends Component {
    state = {};

    render() {
        return (
            <Select
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
