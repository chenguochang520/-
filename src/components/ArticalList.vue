<template>
  <!-- 下拉刷新 -->
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" ref="pullrefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 滑到底刷新 -->
      <van-cell-group>
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-cell-group>
      <!-- 滑到底刷新 -->
    </van-list>
  </van-pull-refresh>
</template>

<script>
// 局部引入

import { getArticleList } from '@/Api/home'
import ArticleItem from './ArticleItem.vue'
//
let ele = null
let scrollTop = 0
export default {
  name: 'ArticleList',
  // todo 父组件为home
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () { this.getArticleList() },
  mounted () {
    ele = this.$refs.pullrefresh.$el
    ele.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    // !获取移动标签数据
    async getArticleList () {
      try {
        if (this.refreshing) {
          this.articleList = []
          this.refreshing = false
        }
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        if (res.data.data.pre_timestamp === null) {
          // 当数据加载完成时,不在触发到底加载事件,若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
          this.finished = true
        }
        this.timestamp = res.data.data.pre_timestamp
        // 将再次请求回来的数据添加到原来数据的下面,防止数据覆盖
        this.articleList.push(...res.data.data.results)
        // 当数据加载完毕后将加载事件关闭
        this.loading = false
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    // !滚动到底刷新
    onLoad () {
      // 当滚动条到最底部时,会触发onload事件并将loding值赋值为true
      this.getArticleList()
    },
    //! 下拉刷新函数方法
    onRefresh () {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.timestamp = Date.now()
      this.onLoad()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
