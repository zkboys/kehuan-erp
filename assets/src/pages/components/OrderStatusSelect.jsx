import React, {Component} from 'react';
import {Select} from 'antd';
import orderStatus from '../../../../common/order-status';

const Option = Select.Option;

export orderStatus from '../../../../common/order-status';

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
