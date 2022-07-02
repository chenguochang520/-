<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isdelete">
        <span @click="$store.commit('delAllHistery')">全部删除</span
        >&nbsp;&nbsp;&nbsp;
        <span @click="isdelete = false">完成</span>
      </template>
      <van-icon name="delete" @click="isdelete = true" v-else />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in SearchHistery"
      :key="index"
      @click="$emit('search', item)"
    >
      <van-icon
        name="close"
        v-if="isdelete"
        @click.stop="$store.commit('delHistery', index)"
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isdelete: false
    }
  },
  computed: {
    ...mapState(['SearchHistery'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
