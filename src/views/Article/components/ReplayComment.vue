<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-divider>全部回复</van-divider>
    <CommentItem
      :item="item"
      v-for="(item, index) in list"
      :key="index"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="foot">
      <van-button
        plain
        type="primary"
        round
        size="large"
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>
    <van-popup
      v-model="isAddCommentShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <AddComment
        v-if="isAddCommentShow"
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
        comment.reply_count++
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import { getComment } from '@/Api/comment'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () { this.getComment() },
  data () {
    return {
      object: {
        type: 'c',
        source: this.comment.com_id,
        offset: null,
        limit: 99999
      },
      isAddCommentShow: false,
      list: []
    }
  },
  methods: {
    async getComment () {
      try {
        const res = await getComment(this.object)
        this.list = res.data.data.results
        console.log(res)
      } catch (error) {

      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 96px;
}
.comment1 {
  margin-bottom: 110px;
}
.foot {
  height: 110px;
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 0 30px;
  background-color: pink;
  text-align: center;
}
</style>
