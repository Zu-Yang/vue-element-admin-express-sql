const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  filterForm: state => state.table.filterForm,
  addRouters: state => state.permission.addRoutes,
  getAllRouters: state => state.permission.routes
}
export default getters