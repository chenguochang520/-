<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="heightLights(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/Api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    heightLights (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style=" color: red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newval) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newval)
            console.log(res)
            this.list = res.data.data.options
            console.log(newval)
          } catch (error) {
            console.log(error)
          }
        }, 500)
      },
      immediate: true
    }

  },
  filters: {},
  components: {},
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>
</style>
