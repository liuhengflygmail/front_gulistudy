import request from '@/utils/request'

export default {
  // 1、获取讲师列表（多条件分页查询）
  // current当前页   limit每页记录数 teacherQuery 条件对象
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象,后端使用RequestBody获取数据
      // data表示把对象转换成json进行传递到接口里面
      data: teacherQuery
    })
  },
  // 2、根据id删除讲师
  removeById(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  // 添加讲师
  saveTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  //根据id查询讲师
  getTeacherById(id) {
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  // 修改讲师信息
  updateTeacherInfo(teacher) {
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: `post`,
      data: teacher
    })
  }
}
