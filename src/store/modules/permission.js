import { asyncRoutes, constantRoutes } from "@/router";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// 判断路由 route.meta.roles 权限是否匹配当前 roles 权限 
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
// 返回与权限匹配的路由表
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


const state = {
  routes: [], // 全部可访问的路由
  addRoutes: [] // 新增的路由
}
const mutations = {
  SET_ROUTES(state, addRoutes) {
    state.routes = constantRoutes.concat(addRoutes)
    state.addRoutes = addRoutes
  }
}
const actions = {
  /* 生成匹配的路由 */
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      const accessibleRoutes = filterAsyncRoutes(roles, asyncRoutes)
      commit('SET_ROUTES', accessibleRoutes)
      resolve(accessibleRoutes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}