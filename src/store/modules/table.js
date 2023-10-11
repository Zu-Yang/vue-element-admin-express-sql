const state = {
  filterForm: {
    page: 1,
    limit: 10,
    orderNo: undefined, // 单号
    timestamp: undefined, // 下单时间
    isUrgent: undefined, // 是否加急
    express: undefined, // 配送快递
    keywords: undefined // 关键字
  },
}

const mutations = {
  CHANGE_FILTERFORM(state, data) {
    state.filterForm = Object.assign({}, data)
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
