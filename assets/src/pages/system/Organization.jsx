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
        // TODO: 获取所有org
        this.props.$ajax.get('/v1/sys/org/domain/1').then(res => {
            console.log(res);
            const list = res.organizationList || [];
            const dataSource = list.map(item => {
                return {
                    key: item.code,
                    parentKey: item.parentCode,
                    text: item.name,
                };
            });
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
            const {setFieldsValue} = this.props.form;
            setFieldsValue({
                key: selectedNode.key,
                parentKey: selectedNode.parentKey,
                domainId: selectedNode.domainId,
                text: selectedNode.text,
                order: selectedNode.order,
            });
            this.setState({selectedKey: selectedNode.key});
        }
    };

    handleSubmit = (values) => {
        const {dataSource} = this.state;
        const existedNewNode = dataSource.find(item => item.key === UN_SAVED_NEW_NODE_KEY);
        if (existedNewNode) { // 添加顶级或者子级
            this.props.$ajax.post('/v1/sys/org', values).then(res => {
                // TODO: 处理数据key，页面上数据替换成真实的key
                console.log(res);
            });
        } else {
            console.log('update:', values);
            this.props.$ajax.put('/v1/sys/org', values).then(res => {
                console.log(res);
            });
        }

        // values.key = `${new Date().getTime()}`;
        // const savedMenu = values;
        // if (existedNewNode) { // 添加顶级 添加子级
        //     newData = dataSource.filter(item => item.key !== UN_SAVED_NEW_NODE_KEY);
        //     newData.push(savedMenu);
        //     this.setState({
        //         dataSource: newData,
        //         selectedKey: savedMenu.key,
        //     });
        //     t
    };

    handleDelete = () => {
        const {dataSource, selectedKey} = this.state;
        if (selectedKey === UN_SAVED_NEW_NODE_KEY) {
            const newData = dataSource.filter(item => item.key !== UN_SAVED_NEW_NODE_KEY);
            this.setState({dataSource: newData});
            this.props.form.resetFields();
            this.setState({selectedKey: ''});
        } else {
            this.props.$ajax.del(`/v1/sys/org/${selectedKey}`, null, {successTip: '删除成功！'}).then(() => {
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
