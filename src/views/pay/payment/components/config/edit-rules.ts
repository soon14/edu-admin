import { FormRules } from 'element-plus'

export const rules: FormRules = {
  account: [
    { required: true, message: '请填写银行卡账号', trigger: 'blur' },
    { pattern: /^[1-9]\d{9,29}$/, message: '银行卡账号不正确', trigger: 'blur' }
  ],
  path: [{ required: true, message: '请填写地址', trigger: 'blur' }],
  bank: [{ required: true, message: '请选择所属银行', trigger: 'blur' }],
  name: [
    { required: true, message: '请填写姓名', trigger: 'blur' },
    {
      pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
      message: '银行卡账号不正确',
      trigger: 'blur'
    }
  ]
}
