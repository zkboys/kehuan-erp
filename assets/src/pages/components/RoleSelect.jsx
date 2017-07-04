import React, {Component} from 'react';
import {Select} from 'antd';
import {ajax} from 'zk-tookit/react';

const Option = Select.Option;

@ajax()
export default class DomainSelect extends Component {
    state = {
        data: [],
    };

    componentWillMount() {
        this.props.$ajax.get('/system/roles/all').then(res => {
            this.setState({data: res});
        });
    }

    render() {
        const {data = []} = this.state;
        return (
            <Select
                allowClear
                placeholder="请选择角色"
                {...this.props}
            >
                {
                    data.map(item => <Option key={item._id}>{item.name}</Option>)
                }
            </Select>
        );
    }
}
