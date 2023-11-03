// Just a mock data

const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: 'Layout',
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/table',
    component: 'Layout',
    redirect: '/table/tableEdit',
    name: 'Table',
    meta: {
      title: 'Table',
      icon: 'table'
    },
    children: [{
      path: 'tableEdit',
      name: 'TableEdit',
      component: () => import('@/views/table/tableEdit'),
      meta: {
        title: 'table 编辑',
      }
    },
    {
      path: 'tableExample',
      name: 'TableExample',
      component: () => import('@/views/table/tableExample'),
      meta: {
        title: 'table 综合范例',
      }
    },
    ]
  },
  {
    path: '/form',
    component: 'Layout',
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: '表单相关',
        icon: 'form'
      }
    }]
  },
  {
    path: '/nested',
    component: 'Layout',
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '路由嵌套',
      icon: 'nested'
    },
    children: [{
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: {
        title: 'Menu1'
      },
      children: [{
        path: 'menu1-1',
        component: () => import('@/views/nested/menu1/menu1-1'),
        name: 'Menu1-1',
        meta: {
          title: 'Menu1-1'
        }
      },
      {
        path: 'menu1-2',
        component: () => import('@/views/nested/menu1/menu1-2'),
        name: 'Menu1-2',
        meta: {
          title: 'Menu1-2'
        },
        children: [{
          path: 'menu1-2-1',
          component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
          name: 'Menu1-2-1',
          meta: {
            title: 'Menu1-2-1'
          }
        },
        {
          path: 'menu1-2-2',
          component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
          name: 'Menu1-2-2',
          meta: {
            title: 'Menu1-2-2'
          }
        }
        ]
      },
      {
        path: 'menu1-3',
        component: () => import('@/views/nested/menu1/menu1-3'),
        name: 'Menu1-3',
        meta: {
          title: 'Menu1-3'
        }
      }
      ]
    },
    {
      path: 'menu2',
      component: () => import('@/views/nested/menu2/index'),
      name: 'Menu2',
      meta: {
        title: 'menu2'
      }
    }
    ]
  },
  {
    path: '/charts',
    component: 'Layout',
    redirect: '/charts/barAnimationDelay',
    name: 'Charts',
    meta: {
      title: '图表',
      icon: 'chart'
    },
    children: [{
      path: 'barAnimationDelay',
      name: 'BarAnimationDelay',
      component: () => import('@/views/charts/barAnimationDelay'),
      meta: {
        title: '条形图动画延迟',
      }
    },
    {
      path: 'dynamicData',
      name: 'DynamicData',
      component: () => import('@/views/charts/dynamicData'),
      meta: {
        title: '动态数据',
      }
    },
    {
      path: 'keyframeAnimation',
      name: 'KeyframeAnimation',
      component: () => import('@/views/charts/keyframeAnimation'),
      meta: {
        title: '关键帧描边动画',
      }
    },
    ]
  },
  {
    path: '/editor',
    component: 'Layout',
    name: 'Editor',
    redirect: '/editor/wangEditor',
    meta: {
      title: 'WEB 编辑器',
      icon: 'edit',
    },
    children: [{
      path: 'wangEditor',
      name: 'WangEditor',
      component: () => import('@/views/editor/wangEditor'),
      meta: {
        title: 'wangEditor',
      },
    },
    {
      path: 'jsonEditor',
      name: 'JsonEditor',
      component: () => import('@/views/editor/jsonEditor'),
      meta: {
        title: 'jsonEditor',
      },
    },
    {
      path: 'vueCodemirror',
      name: 'VueCodemirror',
      component: () => import('@/views/editor/vueCodemirror'),
      meta: {
        title: 'vueCodemirror',
      },
    },
    ]
  },
  {
    path: '/excel',
    component: 'Layout',
    redirect: '/excel/exportExcel',
    meta: {
      title: 'Excel',
      icon: 'excel',
    },
    children: [{
      path: 'exportExcel',
      name: 'ExportExcel',
      component: () => import('@/views/excel/exportExcel'),
      meta: {
        title: '导出 Excel',
      },
    },
    {
      path: 'uploadExcel',
      name: 'UploadExcel',
      component: () => import('@/views/excel/uploadExcel'),
      meta: {
        title: '上传 Excel',
      },
    },
    {
      path: 'excelToJSON',
      name: 'ExcelToJSON',
      component: () => import('@/views/excel/excelToJSON'),
      meta: {
        title: 'Excel to JSON',
      },
    },
    ]
  },
  {
    path: '/components',
    component: 'Layout',
    redirect: '/components/drag-transition',
    meta: {
      title: '组件',
      icon: 'component',
    },
    children: [{
      path: 'drag-transition',
      name: 'DragTransition',
      component: () => import('@/views/components-demo/drag-example/drag-transition'),
      meta: {
        title: 'transition 拖拽',
      },
    },
    {
      path: 'drag-multiple-lists',
      name: 'DragMultipleLists',
      component: () => import('@/views/components-demo/drag-example/drag-multiple-lists'),
      meta: {
        title: 'lists 拖拽',
      },
    },
    {
      path: 'drag-table',
      name: 'DragTable',
      component: () => import('@/views/components-demo/drag-example/drag-table'),
      meta: {
        title: 'table 拖拽',
      },
    }
    ]
  },
  {
    path: '/external-link',
    component: 'Layout',
    children: [{
      path: 'https://github.com/Zu-Yang/vue-element-admin',
      meta: {
        title: '外链',
        icon: 'link'
      }
    }]
  }
]

const asyncRoutes = [
  {
    path: '/permission',
    component: 'Layout',
    redirect: '/permission/page-permissions',
    name: 'Permission',
    // alwaysShow: true, // will always show the root menu
    meta: {
      title: '权限测试',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page-permissions',
        component: () => import('@/views/permission/PagePermissions'),
        name: 'PagePermissions',
        meta: {
          title: '页面权限测试',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'role-permissions',
        component: () => import('@/views/permission/RolePermission'),
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      },
      {
        path: 'editor-page',
        component: () => import('@/views/permission/EditorPpage'),
        name: 'EditorPpage',
        meta: {
          title: 'editor-page',
          roles: ['editor'] // editor 角色才能看见此页面
        }
      },
      {
        path: 'admin-page',
        component: () => import('@/views/permission/AdminPage'),
        name: 'AdminPage',
        meta: {
          title: 'admin-page',
          roles: ['admin'] // admin 角色才能看见此页面
        }
      },
      {
        path: 'no-roles',
        component: () => import('@/views/permission/NoRoles'),
        name: 'NoRoles',
        meta: {
          title: 'no-roles',
          // roles: [] // 无 roles , admin 和e ditor 都能访问
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]


module.exports = {
  constantRoutes,
  asyncRoutes
}
