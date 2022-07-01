<template>
  <div>
    <div class="my">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          size="small"
          plain
          type="danger"
          round
          @click="isCloseShown = !isCloseShown"
          >{{ isCloseShown ? "完成" : "编辑" }}</van-button
        >
      </div>
      <div class="tab">
        <van-row type="flex">
          <van-col
            span="6"
            v-for="(item, index) in channels"
            :key="item.id"
            :style="{ color: active === index ? 'red' : '' }"
            @click="Onclick(index)"
            >{{ item.name }}
            <van-icon name="close" v-if="index !== 0" v-show="isCloseShown" />
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="my">
      <div class="title">
        <h3>频道推荐</h3>
      </div>
      <div class="tab">
        <van-row type="flex">
          <van-col
            span="6"
            v-for="(item, index) in alllist"
            :key="index"
            @click="add(item.id)"
          >
            <span>+</span> {{ item.name }}</van-col
          >
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannel } from '@/Api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanner',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()

      this.alllist = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
      console.log(res)
    } catch (error) {

    }
  },
  data () {
    return {
      alllist: [],
      isCloseShown: false
    }
  },
  methods: {
    add (id) {
      const index = this.alllist.findIndex(item => item.id === id)
      this.channels.push(this.alllist[index])
      this.alllist.splice(index, 1)
    },
    Onclick (index) {
      if (this.isCloseShown) {
        // 删除
        // 推荐不能删除
        if (index === 0) return
        if (index < this.active) {
          this.$emit('del-active', this.active - 1)
        }
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.alllist.push(obj)
      } else {
        // 跳转
        this.$emit('changeActive', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      async handler (newval) {
        if (this.$store.state.users && this.$store.state.users.token) {
          console.log(newval)
          const arr = []
          newval.forEach(function (item, index) {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChannel(arr)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        } else {
          setItem(CHANNELS, newval)
        }
      }
    },
    deep: true
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my {
  .title {
    padding-left: 24px;
    padding-right: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 52px;
    margin-bottom: 48px;
    h3 {
      font-size: 32px;
      font-weight: normal;
      line-height: 36px;
      color: #333333;
    }
    .van-button {
      width: 102px;
      height: 46px;
      font-size: 20px;
    }
  }
  .tab {
    .van-row {
      .van-col {
        width: 160px;
        height: 86px;
        margin-left: 22px;
        margin-bottom: 30px;
        background-color: #f4f5f6;
        border-radius: 6px;
        font-size: 28px;
        font-weight: normal;
        line-height: 36px;
        color: #222222;
        text-align: center;
        line-height: 86px;
        position: relative;
        .van-icon-close {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(50%, -50%);
        }
      }
    }
  }
}
</style>
