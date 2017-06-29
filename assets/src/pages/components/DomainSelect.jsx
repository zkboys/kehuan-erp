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
        // TODO: 获取所有domain
        this.props.$ajax.get('/v1/sys/domain').then(res => {
            res.list.push({
                domainId: '123',
                domainName: '这个文字比较长怎么办',
            });
            this.setState({data: res.list});
        });
    }

    render() {
        const {data} = this.state;
        return (
            <Select {...this.props}>
                {
                    data.map(item => <Option key={item.domainId} value={item.domainId}>{item.domainName}</Option>)
                }
            </Select>
        );
    }
}
