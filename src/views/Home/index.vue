<template>
  <div>
    <!-- 顶部搜素栏 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button
          type="info"
          icon="search"
          class="search-btn"
          size="mini"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 滚动导航 -->
    <van-tabs animated click="add" v-model="active">
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <AriticalList :id="item.id"></AriticalList>
      </van-tab>
      <!-- 右侧汉堡图标 -->
      <template #nav-right>
        <div class="manu" @click="isShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="manu1"></div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <!-- <van-cell is-link @click="showPopup"></van-cell> -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanner
        :channels="channels"
        :active="active"
        @changeActive="
          active = $event;
          isShow = false;
        "
        @del-active="active = $event"
      ></ChannelPanner>
    </van-popup>
  </div>
</template>

<script>
import { getMyChannels } from '@/Api/home'
import AriticalList from '@/components/ArticalList.vue'
import ChannelPanner from './components/ChannelPanner.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      channels: [],
      isShow: false,
      active: 0
    }
  },
  methods: {
    // 实现数据的持久化
    // 三种情况
    // 1如果没有登录,则从本地中拿取数据
    // 2如果第一次没有登录,本地没有数据,则从服务器拿数据
    // 3如果是登录状态则从服务器拿
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.users && this.$store.state.users.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          this.channels = res.data.data.channels
        } catch (error) {
          console.log(error)
        }
      }
    },

    add () {
      console.log(this.active)
    }
  },
  computed: {},

  filters: {},
  components: {
    AriticalList, ChannelPanner
  }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/.van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
.manu {
  min-width: 66px;
  height: 82px;
  position: fixed;
  right: 0;
  background-color: rgba(255, 255, 255, 0.9);
  background-color: rgb(225, 16, 16);
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.manu1 {
  min-width: 66px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  background-color: rgb(225, 16, 16);
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh);
  overflow: auto;
}
</style>
