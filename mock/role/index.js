const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
const hasPermission = function (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  }
  return true
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
const filterAsyncRoutes = function (roles, routes) {
  var temp = []
  routes.forEach(route => {
    var copyRoute = Object.assign({}, route)
    if (hasPermission(roles, copyRoute)) {
      if (copyRoute.children) {
        copyRoute.children = filterAsyncRoutes(roles, copyRoute.children)
      }
      temp.push(copyRoute)
    }
  });
  return temp
}


const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: filterAsyncRoutes(['admin'], routes)
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: filterAsyncRoutes(['editor'], routes)
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: filterAsyncRoutes(['visitor'], routes)
  }
]

module.exports = [
  // mock get all routes form server
  {
    url: '/vue-admin-template/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-admin-template/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-admin-template/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-admin-template/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-admin-template/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
