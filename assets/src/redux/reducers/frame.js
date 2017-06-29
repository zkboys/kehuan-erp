import {handleActions} from 'redux-actions';
import {handleAsyncReducer, actionTypes as systemTypes} from 'zk-tookit/redux';
import {convertToTree, getNodeByPropertyAndValue, getTopNodeByNode} from 'zk-tookit/utils/tree-utils';
import {uniqueArray} from 'zk-tookit/utils';
import {session} from 'zk-tookit/utils/storage';
import * as types from '../action-types';

let initialState = {
    menuTreeData: [],
    sideBarMenuTreeData: [],
    currentTopMenuNode: {},
    currentSideBarMenuNode: {},
    menuOpenKeys: [],
    sideBarCollapsed: false,
    breadcrumbs: [],
    pageTitle: '',
    showPageHeader: true,
    showSideBar: true,
    sideBarMinWidth: 60,
    sideBarWidth: 200,
    fullPageLoading: false,
};

export default handleActions({
    [types.SHOW_FULL_PAGE_LOADING](state) {
        return {
            ...state,
            fullPageLoading: true,
        };
    },
    [types.HIDE_FULL_PAGE_LOADING](state) {
        return {
            ...state,
            fullPageLoading: false,
        };
    },
    [systemTypes.GET_STATE_FROM_STORAGE](state, action) {
        const {payload = {}} = action;
        const {frame} = payload;
        if (frame) {
            const {sideBarWidth = 200, sideBarCollapsed = false} = frame;
            return {
                ...state,
                sideBarWidth,
                sideBarCollapsed,
            };
        }
        return {
            ...state,
        };
    },
    [types.GET_SYSTEM_MENUS]: handleAsyncReducer({
        always(state, /* action */) {
            return state;
        },
        pending(state, /* action */) {
            return state;
        },
        resolve(state, action) {
            const {payload} = action;
            let menuTreeData = state.menuTreeData;

            if (payload && payload.length) {
                const menus = payload.filter(item => item.type === '0');
                menuTreeData = convertToTree(menus);
            }
            session.setItem('menuTreeData', menuTreeData);

            return {
                ...state,
                menuTreeData,
            };
        },
        reject(state, /* action */) {
            return state;
        },
        complete(state, /* action */) {
            return state;
        },
    }),
    [types.SET_SYSTEM_MENUS_STATUS_BY_URL](state) {
        const menuTreeData = session.getItem('menuTreeData') || [];
        let currentSideBarMenuNode = {};
        let currentTopMenuNode = {};
        let menuOpenKeys = [...state.menuOpenKeys];
        let breadcrumbs = [];
        let pageTitle = '';

        if (menuTreeData) {
            let path = location.pathname;
            if (path.indexOf('/+') > -1) {
                path = path.substring(0, path.indexOf('/+'));
            }
            // TODO: 如果菜单节点的path 配置时就 携带参数， 只通过pathname无法匹配到菜单
            // TODO: 如果path=/user/:id,这种 通过pathname无法匹配到菜单
            currentSideBarMenuNode = getNodeByPropertyAndValue(menuTreeData, 'path', path);

            // 顶级节点有可能设置了某个子节点的path，会导致定位到顶级，而不是具体的菜单节点
            if (currentSideBarMenuNode && !currentSideBarMenuNode.parentKey) {
                currentSideBarMenuNode = getNodeByPropertyAndValue(currentSideBarMenuNode.children, 'path', path);
            }
            if (currentSideBarMenuNode) {
                pageTitle = currentSideBarMenuNode.text;
                const parentNodes = currentSideBarMenuNode.parentNodes;
                currentTopMenuNode = getTopNodeByNode(menuTreeData, currentSideBarMenuNode);

                // 保持其他打开的菜单
                menuOpenKeys = menuOpenKeys.concat(currentSideBarMenuNode.parentKeys);
                // 关闭其他菜单
                // menuOpenKeys = [...currentSideBarMenuNode.parentKeys];

                menuOpenKeys = uniqueArray(menuOpenKeys);
                if (parentNodes && parentNodes.length) {
                    breadcrumbs = parentNodes.concat(currentSideBarMenuNode);
                    breadcrumbs.unshift({
                        key: 'home-key',
                        text: '首页',
                        path: '/',
                        icon: 'fa-home',
                    });
                }
            }
        }
        return {
            ...state,
            menuTreeData,
            currentTopMenuNode,
            currentSideBarMenuNode,
            menuOpenKeys,
            breadcrumbs,
            pageTitle,
            showPageHeader: true,
            showSideBar: true,
        };
    },
    [types.SET_SYSTEM_MENU_OPEN_KEYS](state, action) {
        const {payload} = action;
        return {
            ...state,
            menuOpenKeys: payload,
        };
    },
    [types.TOGGLE_SIDE_BAR](state) {
        let {sideBarCollapsed} = state;
        return {
            ...state,
            sideBarCollapsed: !sideBarCollapsed,
        };
    },
    [types.SET_PAGE_TITLE](state, action) {
        const {payload} = action;
        return {
            ...state,
            pageTitle: payload,
        };
    },
    [types.SET_PAGE_BREADCRUMBS](state, action) {
        const {payload = []} = action;
        return {
            ...state,
            breadcrumbs: payload,
        };
    },
    [types.HIDE_PAGE_HEADER](state) {
        return {
            ...state,
            showPageHeader: false,
        };
    },
    [types.SHOW_PAGE_HEADER](state) {
        return {
            ...state,
            showPageHeader: true,
        };
    },
    [types.SHOW_SIDE_BAR](state) {
        return {
            ...state,
            showSideBar: true,
        };
    },
    [types.HIDE_SIDE_BAR](state) {
        return {
            ...state,
            showSideBar: false,
        };
    },
    [types.SET_SIDE_BAR_WIDTH](state, action) {
        let sideBarWidth = action.payload;
        return {
            ...state,
            sideBarWidth,
        };
    },
}, initialState);
