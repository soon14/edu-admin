import { FormRules } from 'element-plus'

export const rules: FormRules = {
  price: [
    { required: true, message: '必须填写金额', trigger: 'blur' },
    { min: 0.1, message: '金额不能小于0.10元', trigger: 'blur' }
  ],
  cash_id: [{ required: true, message: '必须选择提现账号', trigger: 'blur' }]
}
