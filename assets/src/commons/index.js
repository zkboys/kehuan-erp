import {session} from 'zk-tookit/utils/storage';
import mockUrls from '../mock/url-config';

export const STOCK_THRESHOLD_COUNT = 100; // 库存提醒阈值

export const isPro = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
export const isRC = process.env.NODE_ENV === 'rc';

export function getAjaxBaseUrl() {
    if (process.env.NODE_ENV === 'development') { // 这种写法，webpack打包production模式代码时，会把这个if分支的代码干掉
        return require('../../local/local-ajax-base-url').default; // 只有div模式才会引用文件
    }
    if (isPro) {
        return '/api/';
    }

    if (isTest) {
        return '/api/';
    }

    if (isRC) {
        return '/api/';
    }
    return '/';
}

// 这里由于App.jsx 中要对storage进行初始化，要用到 currentLoginUser.id 作为 keyPrefix
// 所以不能使用 封装的storage相关方法
export function getCurrentLoginUser() {
    const currentLoginUser = window.sessionStorage.getItem('currentLoginUser');
    return currentLoginUser ? JSON.parse(currentLoginUser) : null;
}

export function setCurrentLoginUser(currentLoginUser) {
    window.sessionStorage.setItem('currentLoginUser', JSON.stringify(currentLoginUser));
}

export function getMenuTreeData() {
    return session.getItem('menuTreeData');
}

export function setMenuTreeData(menuTreeData) {
    session.setItem('menuTreeData', menuTreeData);
}

export function toLogin() {
    return window.location.href = '/login.html';
}

export function isMock(url /* url, data, method, options */) {
    return mockUrls.indexOf(url) > -1 || url.startsWith('/mock');
}

export function hasPermission(code) {
    const currentLoginUser = getCurrentLoginUser() || {};
    const {permissions = []} = currentLoginUser;
    return permissions.includes(code);
}
/**
 * 获取csrf字符串
 * @returns {string}
 */
export function getCsrf() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}
