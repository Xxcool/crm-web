/**
 * Created by lijinfeng on 2019/1/16.
 */
const getters = {
  userInfo: state => state.app.userInfo,
  sidebar: state => state.app.sidebar,
  permissions: state => state.app.permissions,
  purview: state => state.app.purview,
  menu: state => state.app.menu,
  activeNav: state => state.app.activeNav,
  visitedViews: state => state.tagsBar.visitedViews,
  cachedViews: state => state.tagsBar.cachedViews,
}
export default getters
