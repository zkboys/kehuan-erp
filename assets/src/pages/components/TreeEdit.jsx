import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button, Tree, message, Popconfirm} from 'antd';
import {PageContent, FontIcon} from 'zk-tookit/antd';
import {uniqueArray} from 'zk-tookit/utils';
import {
    renderNode,
    convertToTree,
} from 'zk-tookit/utils/tree-utils';

const TreeNode = Tree.TreeNode;

export default class TreeEdit extends Component {
    state = {
        expandedKeys: [],
    };

    static propTypes = {
        dataSource: PropTypes.array.isRequired,
        selectedKey: PropTypes.string.isRequired,
        unSavedNewNodeKey: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onAddTopNode: PropTypes.func.isRequired,
        onAddSubNode: PropTypes.func.isRequired,
    };

    handleAddNewNode = (type) => {
        const {dataSource, selectedKey, onAddTopNode, onAddSubNode, unSavedNewNodeKey} = this.props;

        const hasUnSavedNewNode = dataSource.find(item => item.key === unSavedNewNodeKey);
        // 未选中父节点，不添加子节点
        if (type === 'subNode' && (!selectedKey)) {
            return message.error('请选择一个父节点！', 3);
        }

        // 有新添加的节点未保存
        if (hasUnSavedNewNode) {
            return message.error('您有未保存的新增节点！', 3);
        }

        if (type === 'subNode') {
            onAddSubNode(selectedKey);

            let expandedKeys = [...this.state.expandedKeys];
            expandedKeys.push(unSavedNewNodeKey);
            expandedKeys.push(selectedKey);
            expandedKeys = uniqueArray(expandedKeys);

            this.setState({expandedKeys});
        } else if (type === 'topNode') {
            onAddTopNode();
        }
    };

    handleExpand = (expandedKeys) => {
        this.setState({expandedKeys});
    };

    getTreeData() {
        const {dataSource} = this.props;
        // 根据order 排序
        const orderedData = [...dataSource].sort((a, b) => {
            const aOrder = a.order || 0;
            const bOrder = b.order || 0;

            // 如果order都不存在，根据 text 排序
            if (!aOrder && !bOrder) {
                return a.text > b.text ? 1 : -1;
            }

            return bOrder - aOrder;
        });
        return convertToTree(orderedData);
    }

    handleTreeSelect = (selectedKeys) => {
        const {dataSource, onSelect, unSavedNewNodeKey} = this.props;

        const hasUnSavedNewNode = dataSource.find(item => item.key === unSavedNewNodeKey);
        // 有新添加的节点未保存
        if (hasUnSavedNewNode) {
            return message.error('您有未保存的新增节点！', 3);
        }
        const selectedNode = dataSource.find(item => item.key === selectedKeys[0]);
        if (selectedNode) {
            onSelect(selectedNode);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {form, onSubmit} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                onSubmit(values);
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    handleDelete = () => {
        const {onDelete} = this.props;
        onDelete();
    };

    render() {
        const {expandedKeys} = this.state;
        const {selectedKey, unSavedNewNodeKey} = this.props;
        const treeData = this.getTreeData();
        const disabled = !selectedKey;
        const treeNode = renderNode(treeData, (item, children) => {
            let text = item.text;
            const key = item.key;
            const icon = item.icon;

            if (icon) {
                text = <span><FontIcon type={icon}/> {item.text}</span>;
            }

            if (key === unSavedNewNodeKey) {
                text = <span style={{color: 'red'}}>{text}</span>;
            }

            if (children) {
                return (
                    <TreeNode key={key} title={text}>
                        {children}
                    </TreeNode>
                );
            }
            return <TreeNode key={key} title={text}/>;
        });
        return (
            <PageContent>
                <Row>
                    <Col span={8}>
                        <Button type="primary" onClick={() => this.handleAddNewNode('topNode')}>添加顶级</Button>
                        <Tree
                            selectedKeys={[selectedKey]}
                            expandedKeys={expandedKeys}
                            onExpand={this.handleExpand}
                            onSelect={this.handleTreeSelect}
                        >
                            {treeNode}
                        </Tree>
                    </Col>
                    <Col span={16}>
                        <Button type="ghost" onClick={() => this.handleAddNewNode('subNode')} disabled={disabled}>添加子节点</Button>
                        <Popconfirm placement="bottom" title="您确定删除此节点吗？其子节点也将一并被删除！" onConfirm={this.handleDelete}>
                            <Button type="danger" style={{marginLeft: 8}} disabled={disabled}>删除</Button>
                        </Popconfirm>
                        {this.props.children}
                        <Button type="primary" onClick={this.handleSubmit} disabled={disabled}>保存</Button>
                        <Button type="ghost" style={{marginLeft: 8}} onClick={this.handleReset} disabled={disabled}>重置</Button>
                    </Col>
                </Row>
            </PageContent>
        );
    }
}
