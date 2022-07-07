
<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @isReplyShow="$emit('isReplyShow', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from '@/views/Article/components/CommentItem.vue'

import { getComment } from '@/Api/comment'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    },
    source: {
      type: [String, Number],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getcomment()
  },
  data () {
    return {
      params: {
        type: this.type,
        source: this.source,
        offset: null,
        limit: 5
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getcomment () {
      try {
        const res = await getComment(this.params)
        if (res.data.data.results.length === 0) {
          this.finished = true
        }

        this.$emit('comment_count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        this.params.offset = res.data.data.last_id
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getcomment()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
