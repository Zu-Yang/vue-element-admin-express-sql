// import { login, logout, getInfo } from '@/api/user' // mock接口
// import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { getToken, setToken, removeToken } from '@/utils/local-server/auth'
import { register, userNameCheck, login, getUserInfo, logout } from '@/api/local-server/user' // express + sql 接口
import { encryptByRSA } from '@/utils/local-server/jsencrypt' // 封装的加密和解密逻辑



const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
    intro: '', // 介绍
    roles: []
  }
}

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  intro: '', // 介绍
  roles: []
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, intro) => {
    state.intro = intro
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // change roles
  async changeRoles({ commit, dispatch }, roles) {
    const token = roles + '-token'

    commit('SET_TOKEN', token)
    setToken(token)
    resetRouter()

    const userInfo = await dispatch('getInfo')

    // 没有root的情况 vuex 就会默认拼接当前 module：user作为key 去查找对应的方法
    //  root: true，开通跨 module 调用权限。解决此类型错误：unknown local action type: generateRoutes, global type: user/generateRoutes 
    const accessibleRoutes = await dispatch('permission/generateRoutes', userInfo.roles, { root: true })

    router.addRoutes(accessibleRoutes)
  },

  // user login (原登录逻辑)
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  /* 本地服务器登录逻辑 */
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    const parmas = {
      userName,
      password: encryptByRSA(password) // 对需要加密的数据进行加密
    }
    return new Promise((resolve, reject) => {
      login(parmas).then(res => {
        if (res.code === 200) {
          commit('SET_TOKEN', res.token)
          setToken(res.token)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // user register
  register(store, userInfo) {
    const { userName, password } = userInfo
    const parmas = {
      userName,
      password: encryptByRSA(password) // 对需要加密的数据进行加密
    }
    return new Promise((resolve, reject) => {
      register(parmas).then(res => {
        console.log(parmas);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // verify username
  userNameCheck(store, userInfo) {
    return new Promise((resolve, reject) => {
      userNameCheck(userInfo).then(res => {
        if (res.code === 0) {
          reject(res)
        } else {
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { roles, userName, avatar, intro } = data

        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', intro)
        commit('SET_ROLES', JSON.parse(roles))

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        commit('SET_ROLES', [])
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

