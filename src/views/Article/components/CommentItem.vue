<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">{{item.aut_name}}</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | formatTime }}</span>
        <van-button
          size="mini"
          type="default"
          @click="$emit('isReplyShow', item)"
          >回复</van-button
        >
      </p>
    </div>
    <van-loading v-if="isloding" size=" 0.5rem" />
    <van-icon
      v-else
      slot="right-icon"
      :name="item.is_liking ? 'like ' : 'like-o'"
      :color="item.is_liking ? 'red' : ''"
      @click="Onclick"
    >
      {{ item.like_count > 0 ? item.like_count : "赞" }}
    </van-icon>
  </van-cell>
</template>

<script>
import { addlike, dellike } from '@/Api/comment'
export default {
  props: {
    item: {
      type: Object,
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
      if (this.item.is_liking) {
        // 取消点赞
        try {
          await dellike(this.item.com_id)

          // 取消点赞后,数量减少,颜色变红
          this.item.like_count--
          this.item.is_liking = false
        } catch (error) {
          console.log(error)
        }
      } else {
        // 点赞
        try {
          await addlike(this.item.com_id)
          // 点赞后数量增加,颜色变黑
          this.item.like_count++
          this.item.is_liking = true
        } catch (error) {
          console.log(error)
        }
      }
      this.isloding = false
    }
  },
  computed: {},
  watch: {},
  filters: {}
}
</script>

<style scoped lang='less'>
</style>
