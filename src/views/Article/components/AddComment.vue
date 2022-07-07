<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    class="add-field"
    ref="field"
  >
    <template #extra>
      <van-button
        type="default"
        :disabled="message.length === 0"
        @click="Onclick"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { getArticleComment } from '@/Api/comment'
export default {
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    art_id: {
      type: [String, Number]

    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async Onclick () {
      try {
        const res = await getArticleComment({ target: this.target, content: this.message, art_id: this.art_id })
        this.$emit('add-comment', res.data.data.new_obj)
        this.message = ''
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.add-field {
  align-items: center;
  button {
    border: none;
  }
}
</style>
