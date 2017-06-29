import React, {Component} from 'react';
import {TreeSelect} from 'antd';
import {ajax} from 'zk-tookit/react';
import {
    renderNode,
    convertToTree,
} from 'zk-tookit/utils/tree-utils';

const TreeNode = TreeSelect.TreeNode;

@ajax()
export default class DomainSelect extends Component {
    state = {
        treeData: [],
    };

    componentWillMount() {
        // TODO: 获取所有org
        this.props.$ajax.get('/system/organizations').then(res => {
            console.log(res);
            const list = res.organizationList || [];
            const data = list.map(item => {
                return {
                    key: item.code,
                    parentKey: item.parentCode,
                    text: item.name,
                };
            });
            const treeData = convertToTree(data);
            this.setState({treeData});
        });
    }

    render() {
        const {treeData} = this.state;
        const treeNode = renderNode(treeData, (item, children) => {
            let text = item.text;
            const key = item.key;
            if (children) {
                return (
                    <TreeNode key={key} value={key} title={text}>
                        {children}
                    </TreeNode>
                );
            }
            return <TreeNode key={key} value={key} title={text}/>;
        });
        return (
            <TreeSelect
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                placeholder="请选择所属机构"
                allowClear
                treeDefaultExpandAll
                {...this.props}
            >
                {treeNode}
            </TreeSelect>
        );
    }
}
