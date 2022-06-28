<template>
  <div>
    <!-- 登录状态开始 -->
    <div class="header login" v-if="users && users.token">
      <div class="up">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userinfo.photo"
          />
          <span>{{userinfo.name}}</span>
        </div>
        <button>编辑资料</button>
      </div>
      <ul class="list">
        <li>
          <p>{{userinfo.art_count}}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{userinfo.like_count}}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{userinfo.fans_count}}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{userinfo.follow_count}}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 登录状态结束 -->
    <!-- 非登录状态开始 -->
    <div
      class="header notlogin"
      v-else
      @click="$router.push({ name: 'login' })"
    >
      <div class="moble">
        <img src="../../assets/素材/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <!-- 非登录状态结束 -->
    <!-- 收藏与历史记录开始 -->
    <van-grid column-num="2">
      <van-grid-item icon="photo-o" text="收藏">
        <template #icon>
          <MyIcon name="shoucang"></MyIcon>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <!-- <i class="toutiao toutiao-lishi"></i> -->
          <MyIcon name="lishi"></MyIcon>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 收藏与历史记录结束 -->
    <!-- 单元格 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <!-- 退出按钮 -->
    <van-button type="default" block v-if="users && users.token" @click="lagout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import MyIcon from '@/components/MyIcon.vue'
import { mapState } from 'vuex'
import { getUserInfo } from '@/Api/user'
export default {
  name: 'my',
  async created () {
    try {
      const res = await getUserInfo()
      console.log('res', res)
      this.userinfo = res.data.data
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      userinfo: {}
    }
  },
  methods: {
    async lagout () {
      try {
        await this.$dialog.confirm({

          message: '确定退出吗'

        })
        this.$store.commit('setuser', {})
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState(['users'])
  },
  watch: {},
  filters: {},
  components: { MyIcon }
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background: rgba(50, 150, 250, 0.8) url("../../assets/素材/banner.png")
    no-repeat center/cover;
  // opacity: 0.7;
}
.notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    margin-bottom: 15px;
  }
  p {
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
}
.login {
  padding: 116px 32px 0;

  .up {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 55px;
    button {
      width: 116px;
      // height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .list {
    display: flex;
    text-align: center;
    li {
      flex: 1;
      p {
        color: #fff;
        font-weight: 400px;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
  /deep/.van-grid-item__text {
    font-size: 28px;
  }
}
.van-cell-group {
  margin: 9px 0;
}
.van-button__text {
  color: #d86262;
}
</style>
