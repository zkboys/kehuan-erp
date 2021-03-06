export default [
    {
        key: 'base-information',
        text: '系统用户管理',
        icon: 'fa-users',
        path: '',
    },
    {
        key: 'common0001',
        parentKey: 'base-information',
        text: '组织管理',
        icon: 'fa-user',
        path: '/system/organization',
    },
    {
        key: 'common001',
        parentKey: 'base-information',
        text: '用户管理',
        icon: 'fa-user',
        path: '/system/user',
    },
    {
        key: 'common004',
        parentKey: 'base-information',
        text: '角色管理',
        icon: 'fa-lock',
        path: '/system/role',
    },
    {
        key: 'common005',
        parentKey: 'base-information',
        text: '菜单&权限',
        icon: 'fa-lock',
        path: '/system/menu',
    },
    {
        key: 'common006',
        parentKey: 'base-information',
        text: 'domain管理',
        icon: 'fa-lock',
        path: '/system/domain',
    },
    {
        key: 'system',
        text: '系统',
        icon: 'fa-th-list',
        order: 1,
        functions: [],
    },
    {
        key: 'system-004002',
        parentKey: 'system',
        text: '修改密码',
        icon: 'fa-lock',
        path: '/system/pass',
        order: 1,
        functions: [],
    },
    {
        key: 'system-002',
        parentKey: 'system',
        text: '系统设置',
        icon: 'fa-cog',
        path: '/system/setting',
        order: 1,
        functions: [],
    },
    {
        key: 'system-004001',
        parentKey: 'system',
        text: '修改个人信息',
        icon: 'fa-users',
        path: '/system/profile',
        order: 1,
        functions: [],
    },
];
