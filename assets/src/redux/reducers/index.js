import {reducerPage} from 'zk-tookit/redux';
import initialState from '../../page-init-state';
import frame from './frame';

const pageState = reducerPage(initialState);

const reducers = {
    pageState,
    frame,
};

export default reducers;
