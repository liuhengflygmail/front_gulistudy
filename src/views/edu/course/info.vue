.<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <!-- 所属分类 TODO -->

      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数" />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" placeholder="" />
      </el-form-item>

      <!-- 课程封面 TODO -->

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元" /> 元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from '@/api/teacher/course.js'

export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        title: '',
        subjectId: '',
        teacherId: '',
        subjectParentId: '',
        lessonNum: 0,
        description: '',
        cover: '',
        price: 0
      },
      teacherList: [] // 封装所有的讲师
    }
  },
  created() {
    // 初始化所有讲师
    this.getListTeacher()
  },
  methods: {
    saveOrUpdate() {
      course.addCourseInfo(this.courseInfo).then(resp => {
        // 提示
        this.$message({
          message: '添加课程信息成功',
          type: 'success'
        })
        console.log(resp)
        // 跳转到第二步，并带着这个课程生成的id
        this.$router.push({ path: '/course/chapter/' + resp.data.courseId })
      })
    },
    // 查询所有讲师
    getListTeacher() {
      course.getListTeacher()
        .then(response => {
          this.teacherList = response.data.items
          console.log(this.teacherList)
        })
    }
  }
}
</script>
