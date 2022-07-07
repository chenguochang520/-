<template>
  <van-button
    :loading="isajax"
    :disabled="isajax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="value ? '' : 'plus'"
    :plain="value"
    @click="onClick"
    >{{ value ? "已关注" : "关注" }}
  </van-button>
</template>

<script>
import { addUser, deluser } from '@/Api/article'
export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [String, Number],
      required: true
    }
  },
  created () { },
  data () {
    return {
      isajax: false
    }
  },
  methods: {
    async onClick () {
      this.isajax = true
      // 判断是否为关注状态,若为关注状态,则取消关注
      if (this.value) {
        try {
          const res = await deluser(this.target)
          console.log(res)
          this.$emit('input', !this.value)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const res = await addUser(this.target)
          console.log(res)
          this.$emit('input', !this.value)
        } catch (error) {
          console.log(error)
        }
      }
      this.isajax = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
