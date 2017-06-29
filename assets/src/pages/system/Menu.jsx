import React, {Component} from 'react';
import {Form, Input, InputNumber, Select} from 'antd';
import {PageContent, FormItemLayout, FontIconModal} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import {getGenerationsByKey} from 'zk-tookit/utils/tree-utils';
import TreeEdit from '../components/TreeEdit';

const Option = Select.Option;
const UN_SAVED_NEW_NODE_KEY = 'UN_SAVED_NEW_NODE_KEY';

export const PAGE_ROUTE = '/system/menu';

@ajax()
@Form.create()
export default class extends Component {
    state = {
        dataSource: [],
        selectedKey: '',
    };

    componentWillMount() {
        this.getAllMenus();
    }

    getAllMenus() {
        this.props.$ajax.get('/system/menus').then(res => {
            const dataSource = (res || []).filter(item => item.key);

            this.setState({dataSource});
        });
    }

    handleAddNewNode = (parentKey) => {
        const dataSource = [...this.state.dataSource];
        const {setFieldsValue} = this.props.form;
        const newNode = {
            key: UN_SAVED_NEW_NODE_KEY,
            parentKey,
            type: '0',
            text: '新增节点',
            icon: 'fa-lock',
            path: '',
            order: 100, // 越大优先级越高，越靠前
        };
        dataSource.push(newNode);
        setFieldsValue(newNode);
        this.setState({dataSource, selectedKey: UN_SAVED_NEW_NODE_KEY});
    };

    handleTreeSelect = (selectedNode) => {
        if (selectedNode) {
            const {setFieldsValue} = this.props.form;
            if (selectedNode.type === '0') {
                setFieldsValue({
                    key: selectedNode.key,
                    parentKey: selectedNode.parentKey,
                    type: selectedNode.type,
                    text: selectedNode.text,
                    path: selectedNode.path,
                    icon: selectedNode.icon,
                    order: selectedNode.order,
                });
            }
            if (selectedNode.type === '1') {
                setFieldsValue({
                    key: selectedNode.key,
                    parentKey: selectedNode.parentKey,
                    type: selectedNode.type,
                    text: selectedNode.text,
                    code: selectedNode.code,
                });
            }
            this.setState({selectedKey: selectedNode.key});
        }
    };

    handleSubmit = (values) => {
        const {dataSource} = this.state;
        const {$ajax} = this.props;
        const existedNewNode = dataSource.find(item => item.key === UN_SAVED_NEW_NODE_KEY);
        let successTip;
        if (existedNewNode) { // 添加顶级或者子级
            values.key = null;
            successTip = '添加成功！';
            $ajax.post('/system/menus', values, {successTip}).then(res => {
                const savedMenu = res;
                const newData = dataSource.filter(item => item.key !== UN_SAVED_NEW_NODE_KEY);
                newData.push(savedMenu);
                this.setState({
                    dataSource: newData,
                    selectedKey: savedMenu.key,
                });
                this.handleTreeSelect(savedMenu);
            });
        } else {
            successTip = '修改成功！';
            $ajax.put('/system/menus', values, {successTip}).then(() => {
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
            this.props.$ajax.del(`/system/menus/${selectedKey}`, null, {successTip: '删除成功！'}).then(() => {
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
        const {form, form: {getFieldDecorator, getFieldValue, setFieldsValue}} = this.props;
        const {dataSource, selectedKey} = this.state;
        const formItemWidth = 300;
        const disabled = !selectedKey;
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
                            label="类型"
                            labelSpaceCount={2}
                            width={formItemWidth}
                        >
                            {getFieldDecorator('type', {
                                initialValue: '0',
                                rules: [{required: true, message: '请选择类型'}],
                            })(
                                <Select disabled={disabled}>
                                    <Option value="0">菜单</Option>
                                    <Option value="1">功能</Option>
                                </Select>
                            )}
                        </FormItemLayout>
                        <FormItemLayout
                            label="名称"
                            labelSpaceCount={2}
                            width={formItemWidth}
                        >
                            {getFieldDecorator('text', {
                                rules: [{required: true, message: '请输入菜单名称'}],
                            })(
                                <Input placeholder="请输入菜单名称" disabled={disabled}/>
                            )}
                        </FormItemLayout>
                        <FormItemLayout
                            label="编码"
                            labelSpaceCount={2}
                            width={formItemWidth}
                            style={{display: getFieldValue('type') === '1' ? 'block' : 'none'}}
                        >
                            {getFieldDecorator('code', {
                                rules: [{required: getFieldValue('type') === '1', message: '请输入功能编码'}],
                            })(
                                <Input placeholder="请输入功能编码" disabled={disabled}/>
                            )}
                        </FormItemLayout>
                        <div style={{display: getFieldValue('type') === '0' ? 'block' : 'none'}}>
                            <FormItemLayout
                                label="路径"
                                labelSpaceCount={2}
                                width={formItemWidth}
                            >
                                {getFieldDecorator('path', {
                                    rules: [{required: false, message: '请输入菜单路径'}],
                                })(
                                    <Input placeholder="请输入菜单路径" disabled={disabled}/>
                                )}
                            </FormItemLayout>
                            <div>
                                <FormItemLayout
                                    label="图标"
                                    labelSpaceCount={2}
                                    width={formItemWidth - 110}
                                    float
                                >
                                    {getFieldDecorator('icon', {
                                        rules: [{required: false, message: '请输入菜单图标'}],
                                    })(
                                        <Input placeholder="请输入菜单图标" disabled={disabled}/>
                                    )}
                                </FormItemLayout>
                                <div style={{float: 'left', width: 110, textAlign: 'right'}}>
                                    <FontIconModal disabled={disabled} value={getFieldValue('icon')} onSelect={type => setFieldsValue({icon: type})}/>
                                </div>
                                <div style={{clear: 'both'}}/>
                            </div>
                            <FormItemLayout
                                label="排序"
                                labelSpaceCount={2}
                                width={formItemWidth}
                            >
                                {getFieldDecorator('order', {
                                    rules: [{required: false, message: '请输入菜单排序'}],
                                })(
                                    <InputNumber style={{width: '100%'}} step={1} placeholder="请输入整数" disabled={disabled}/>
                                )}
                            </FormItemLayout>
                        </div>
                    </Form>
                </TreeEdit>
            </PageContent>
        );
    }
}
