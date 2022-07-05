import { defineComponent } from 'vue'
import { ElForm } from 'element-plus'
export default defineComponent({
  name: 'PageSearch',
  components: { ElForm },
  setup(props, { slots }) {
    // const slots = useSlots()
    // console.log(slots)
    return () => {
      return <el-form>{slots.default!()}</el-form>
    }
  }
})
