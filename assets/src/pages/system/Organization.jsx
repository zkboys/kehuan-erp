import React, {Component} from 'react';
import {Form, Input, InputNumber} from 'antd';
import {PageContent, FormItemLayout} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {getGenerationsByKey} from 'zk-tookit/utils/tree-utils';
import TreeEdit from '../components/TreeEdit';

const UN_SAVED_NEW_NODE_KEY = 'UN_SAVED_NEW_NODE_KEY';

export const PAGE_ROUTE = '/system/organization';

@Form.create()
@ajax()
export default class extends Component {
    state = {
        dataSource: [],
        selectedKey: '',
    };

    componentWillMount() {
        this.props.$ajax.get('/system/organizations').then(res => {
            const dataSource = (res || []).map(item => ({key: item._id, parentKey: item.parentId, text: item.name, ...item}));
            console.log(dataSource);
            this.setState({dataSource});
        });
    }

    handleAddNewNode = (parentKey) => {
        const dataSource = [...this.state.dataSource];
        const {setFieldsValue} = this.props.form;
        const newNode = {
            key: UN_SAVED_NEW_NODE_KEY,
            parentKey,
            text: '新增节点',
            order: 100, // 越大优先级越高，越靠前
        };
        dataSource.push(newNode);
        setFieldsValue(newNode);
        this.setState({dataSource, selectedKey: UN_SAVED_NEW_NODE_KEY});
    };

    handleTreeSelect = (selectedNode) => {
        if (selectedNode) {
            console.log(selectedNode);
            const {setFieldsValue} = this.props.form;
            setFieldsValue({
                key: selectedNode.key,
                parentKey: selectedNode.parentKey,
                text: selectedNode.name,
                description: selectedNode.description,
                order: selectedNode.order,
            });
            this.setState({selectedKey: selectedNode.key});
        }
    };

    handleSubmit = (values) => {
        const {dataSource} = this.state;
        const {$ajax} = this.props;
        const existedNewNode = dataSource.find(item => item.key === UN_SAVED_NEW_NODE_KEY);
        let successTip;
        values.name = values.text;
        if (existedNewNode) { // 添加顶级或者子级
            values.key = null;
            values.parentId = values.parentKey;
            successTip = '添加成功！';
            $ajax.post('/system/organizations', values, {successTip}).then(res => {
                const savedNode = res;
                const newData = dataSource.filter(item => item.key !== UN_SAVED_NEW_NODE_KEY);
                savedNode.text = savedNode.name;
                savedNode.key = savedNode._id;
                savedNode.parentKey = savedNode.parentId;
                newData.push(savedNode);
                this.setState({
                    dataSource: newData,
                    selectedKey: savedNode.key,
                });
                this.handleTreeSelect(savedNode);
            });
        } else {
            successTip = '修改成功！';
            $ajax.put('/system/organizations', values, {successTip}).then(() => {
                const newData = dataSource.filter(item => item.key !== values.key);
                newData.push(values);
                this.setState({
                    dataSource: newData,
                    selectedKey: values.key,
                });
                this.handleTreeSelect(values);
            });
        }
    };

    handleDelete = () => {
        const {dataSource, selectedKey} = this.state;
        if (selectedKey === UN_SAVED_NEW_NODE_KEY) {
            const newData = dataSource.filter(item => item.key !== UN_SAVED_NEW_NODE_KEY);
            this.setState({dataSource: newData});
            this.props.form.resetFields();
            this.setState({selectedKey: ''});
        } else {
            this.props.$ajax.del(`/system/organizations/${selectedKey}`, null, {successTip: '删除成功！'}).then(() => {
                this.props.form.resetFields();
                const deletedNods = getGenerationsByKey(dataSource, selectedKey);
                const deletedNodKeys = deletedNods.map(item => item.key);
                const newData = dataSource.filter(item => !deletedNodKeys.includes(item.key));
                this.setState({
                    dataSource: newData,
                    selectedKey: '',
                });
            });
        }
    };

    render() {
        const {form, form: {getFieldDecorator}} = this.props;
        const {dataSource, selectedKey} = this.state;
        const formItemWidth = 300;
        const disabled = !selectedKey;
        const labelSpaceCount = 3;

        return (
            <PageContent>
                <TreeEdit
                    form={form}
                    dataSource={dataSource}
                    selectedKey={selectedKey}
                    unSavedNewNodeKey={UN_SAVED_NEW_NODE_KEY}
                    onSelect={this.handleTreeSelect}
                    onDelete={this.handleDelete}
                    onSubmit={this.handleSubmit}
                    onAddTopNode={this.handleAddNewNode}
                    onAddSubNode={this.handleAddNewNode}
                >
                    <Form onSubmit={this.handleSubmit} style={{marginTop: 12}}>
                        {getFieldDecorator('key')(<Input type="hidden"/>)}
                        {getFieldDecorator('parentKey')(<Input type="hidden"/>)}
                        <FormItemLayout
                            label="名称"
                            labelSpaceCount={labelSpaceCount}
                            width={formItemWidth}
                        >
                            {getFieldDecorator('text', {
                                rules: [{required: true, message: '请输入名称！'}],
                            })(
                                <Input placeholder="请输入名称" disabled={disabled}/>
                            )}
                        </FormItemLayout>
                        <FormItemLayout
                            label="描述"
                            labelSpaceCount={labelSpaceCount}
                            width={formItemWidth}
                        >
                            {getFieldDecorator('description', {
                                rules: [{required: false, message: '请输入描述！'}],
                            })(
                                <Input type="textarea" placeholder="请输入描述" disabled={disabled}/>
                            )}
                        </FormItemLayout>
                        <FormItemLayout
                            label="排序"
                            labelSpaceCount={labelSpaceCount}
                            width={formItemWidth}
                        >
                            {getFieldDecorator('order', {
                                rules: [{required: false, message: '请输入菜单排序'}],
                            })(
                                <InputNumber style={{width: '100%'}} step={1} placeholder="请输入整数" disabled={disabled}/>
                            )}
                        </FormItemLayout>
                    </Form>
                </TreeEdit>
            </PageContent>
        );
    }
}
