<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="$router.go(-1)"
        autofocus
        @focus="isSearch = false"
      />
    </form>

    <!-- 当输入框中没有值时搜索历史显示当输入框中有值时显示搜索建议按下enter键时显示搜索结果 -->
    <SearchHistery v-if="searchText === ''" @search="onSearch"></SearchHistery>
    <template v-else>
      <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
      <!-- 将搜索事件传给搜索建议实现点击搜索建议实现搜索 -->
      <SearchSuggestions
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggestions>
    </template>
  </div>
</template>

<script>
import SearchHistery from './component/SearchHistery.vue'
import SearchSuggestions from './component/SearchSuggestions.vue'
import SearchResult from './component/SearchResult.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false
    }
  },
  methods: {
    onSearch (str) {
      this.isSearch = !this.isSearch
      this.searchText = str
      this.$store.commit('setSearchHistery', str)
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchSuggestions, SearchHistery, SearchResult }
}
</script>

<style scoped lang='less'>
</style>
