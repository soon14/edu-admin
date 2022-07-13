import { FormRules } from 'element-plus'

export const rules: FormRules = {
  title: [{ required: true, message: '请填写标题', trigger: 'blur' }]
}
