
<template>
  <van-loading v-if="isloding" size=".53333rem" />

  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    :class="{ 'van-icon-star': is_collected }"
    @click="Onclick"
  />
</template>

<script>
import { addcollected, delcollected } from '@/Api/article'
export default {
  name: 'CollectArtical',
  props: {
    is_collected: {
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
      isloding: false
    }
  },
  methods: {
    async Onclick () {
      this.isloding = true
      if (this.is_collected) {
        try {
          // const target = this.$router.params
          // console.log(target)
          const res = await delcollected(this.target)
          this.$emit('update:is_collected', !this.is_collected)
          console.log(res)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          // const target = this.$router.params
          const res = await addcollected(this.target)
          this.$emit('update:is_collected', !this.is_collected)
          console.log(res)
        } catch (error) {
          console.log(error)
        }
      }
      this.isloding = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-icon {
  font-size: 40px;
  /deep/ .van-icon-star {
    color: #e22829;
  }
}
</style>
