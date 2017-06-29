import {checkAction, actionUtils, actionPage} from 'zk-tookit/redux';
import pageInitState from '../../page-init-state';
import * as frame from './frame';

const syncKeys = ['settings', 'frame']; // 需要同步的数据，对应meta中的sync字段，对应的是reducers中的数据
const utils = actionUtils({pageInitState, syncKeys});

const actions = {
    actionPage,
    utils,
    frame,
};

export default checkAction(actions);
