import React, {Component} from 'react';
import {Row, Col, Form, Input, Card, Button, Tree, Switch} from 'antd';
import {PageContent, FormItemLayout} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {
    renderNode,
    convertToTree,
    getCheckedKeys,
} from 'zk-tookit/utils/tree-utils';

const TreeNode = Tree.TreeNode;

export const PAGE_ROUTE = '/system/role/+edit/:id';

@ajax()
@Form.create()
export default class SystemRoleEdit extends Component {
    state = {
        loading: false,
        isAdd: true,
        treeData: [],
        checkedKeys: [],
        expandedKeys: [],
        role: {},
    };

    componentWillMount() {
        const {id} = this.props.params;
        const {$ajax} = this.props;
        if (id === ':id') {
            this.setState({isAdd: true});
        } else {
            this.setState({isAdd: false});
            $ajax.get(`/system/roles/${id}`).then(res => {
                console.log(res);
                this.setState({
                    role: res,
                    checkedKeys: res.permissions,
                    expandedKeys: res.permissions, // TODO: 展开收起有问题
                });
            });
        }

        this.props.$ajax.get('/system/menus').then(res => {
            const treeData = convertToTree(res);
            this.setState({treeData});
        });
    }

    handleCheck = (checkedKeys, e) => {
        const checked = e.checked;
        const checkNodeKey = e.node.props.eventKey;
        const {treeData} = this.state;
        // Tree 要使用 checkStrictly 属性
        const allKeys = getCheckedKeys(treeData, checkedKeys, checked, checkNodeKey);
        this.setState({checkedKeys: allKeys});
    };

    handleExpand = (expandedKeys) => {
        // TODO: 展开收起有问题
        this.setState({expandedKeys});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {isAdd, loading} = this.state;
        const {form, $ajax, router} = this.props;
        if (loading) return;
        form.validateFields((err, values) => {
            if (!err) {
                values.permissions = this.state.checkedKeys;
                let submitAjax = isAdd ? $ajax.post : $ajax.put;
                this.setState({loading: true});
                submitAjax('/system/roles', values).then(() => {
                    router.push('/system/role');
                }).finally(() => {
                    this.setState({loading: false});
                });
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
        const {isAdd, role} = this.state;
        this.setState({checkedKeys: isAdd ? [] : role.resourceList});
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {loading, isAdd, role = {}} = this.state;
        const title = isAdd ? '添加角色' : '修改角色';

        const {treeData, checkedKeys, expandedKeys} = this.state;

        const treeNode = renderNode(treeData, (item, children) => {
            if (children) {
                return (
                    <TreeNode key={item.key} title={item.text}>
                        {children}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={item.text}/>;
        });

        const labelSpaceCount = 4;
        return (
            <PageContent>
                <h1 style={{textAlign: 'center'}}>{title}</h1>
                <Row>
                    <Col span={12} style={{padding: 16}}>
                        <Card title="基本信息">
                            <Form onSubmit={this.handleSubmit}>
                                {!isAdd ? getFieldDecorator('_id', {initialValue: role._id})(<Input type="hidden"/>) : null}
                                <FormItemLayout
                                    label="角色名"
                                    labelSpaceCount={labelSpaceCount}
                                    style={{maxWidth: 300}}
                                >
                                    {getFieldDecorator('name', {
                                        initialValue: role.name,
                                        rules: [
                                            {required: true, message: '请输入角色名！'},
                                        ],
                                    })(
                                        <Input placeholder="请输入角色名"/>
                                    )}
                                </FormItemLayout>
                                <FormItemLayout
                                    label="状态"
                                    labelSpaceCount={labelSpaceCount}
                                    style={{maxWidth: 300}}
                                >
                                    {getFieldDecorator('status', {
                                        initialValue: role.status === '0',
                                        valuePropName: 'checked',
                                        rules: [
                                            {required: true, message: '请选择状态！'},
                                        ],
                                    })(
                                        <Switch checkedChildren="启用" unCheckedChildren="停用"/>
                                    )}
                                </FormItemLayout>

                                <FormItemLayout
                                    label="描述"
                                    labelSpaceCount={labelSpaceCount}
                                    style={{maxWidth: 300}}
                                >
                                    {getFieldDecorator('description', {
                                        initialValue: role.description,
                                        rules: [],
                                    })(
                                        <Input placeholder="请输入描述"/>
                                    )}
                                </FormItemLayout>

                                <div>
                                    <Button
                                        style={{marginRight: 8}}
                                        loading={loading}
                                        type="primary"
                                        onClick={this.handleSubmit}
                                    >
                                        提交
                                    </Button>
                                    <Button
                                        type="ghost"
                                        onClick={this.handleReset}
                                    >
                                        重置
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={12} style={{padding: 16}}>
                        <Card title="选择权限">
                            <Tree
                                selectable={false}
                                checkable
                                checkStrictly
                                checkedKeys={{checked: checkedKeys}}
                                expandedKeys={expandedKeys}
                                onExpand={this.handleExpand}
                                onCheck={this.handleCheck}
                            >
                                {treeNode}
                            </Tree>
                        </Card>
                    </Col>
                </Row>
            </PageContent>
        );
    }
}
