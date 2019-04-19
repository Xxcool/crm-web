import request from "../../../utils/request";

export default {
  add(data) {
    return request({
      url: "/api/sys/role/add",
      method: "post",
      data
    })
  },
  save(data) {
    return request({
      url: data.id ? "/api/sys/role/update" : "/api/sys/role/add",
      method: "post",
      data
    })
  },
  update(data) {
    return request({
      url: "/api/sys/role/update",
      method: "post",
      data
    })
  },
  del(id) {
    return request({
      url: "/api/sys/role/del/" + id
    })
  },
  findById(id) {
    return request({
      url: "/api/sys/role/" + id
    })
  },
  findListById(id) {
    return request({
      url: "/api/sys/role/user-role/" + id
    })
  },
  list(data) {
    return request({
      url: "/api/sys/role/list",
      method: "post",
      data
    })
  },
  getRoleMenuTree(id) {
    return request({
      url: "/api/sys/menu/role-menu-tree/" + id
    });
  },
  updateRoleMenu(id, menuIds) {
    return request({
      url: "/api/sys/role/update-role-menu/" + id + "?ids=" + menuIds.join(",")
    })
  },
  selectAll() {
    return request({
      url: "/api/sys/role/selectAll",
      method: "post"
    })
  }
}
