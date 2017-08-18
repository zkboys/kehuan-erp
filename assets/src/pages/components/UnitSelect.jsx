import React, {Component} from 'react';
import {Select} from 'antd';
import _units from '../../../../common/units';

const Option = Select.Option;

export const units = _units;

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
