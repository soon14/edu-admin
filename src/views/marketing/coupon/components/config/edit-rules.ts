import { FormRules } from 'element-plus'

export const rules: FormRules = {
  goods_id: [{ required: true, message: '请选择关联', trigger: 'blur' }],
  end_time: [{ required: true, message: '请选择时间范围', trigger: 'blur' }]
}
