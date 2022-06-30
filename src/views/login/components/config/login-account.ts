import type { FormRules } from 'element-plus'

export default () => {
  return {
    username: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      { min: 5, message: '用户名不能少于最少5位', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 5, message: '用户名不能少于最少5位', trigger: 'blur' }
    ]
  } as FormRules
}
