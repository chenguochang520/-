<template>
  <div>
    <van-nav-bar title="登录">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号码"
        :rules="[
          { required: true, message: '' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '手机号码格式不正确',
          },
        ]"
      >
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->
        <MyIcon name="shouji" slot="left-icon" class="toutiao"></MyIcon>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '' },
          { pattern: /^\d{6}$/, message: '验证码不正确' },
        ]"
      >
        <!-- <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i> -->
        <MyIcon name="yanzhengma" slot="left-icon" class="toutiao"></MyIcon>
        <template #button>
          <van-count-down
            :time="time"
            format=" ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            round
            class="yanzhengma"
            native-type="button"
            v-else
            @click="OnSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSms, login } from '@/Api/user.js'

export default {
  created () { },
  data () {
    return {
      mobile: '13911111111', // 手机号
      code: '246810', // 短信验证码
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        this.$store.commit('setuser', res.data.data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    async OnSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        console.log('校验成功')
        try {
          await getSms(this.mobile)
          this.$toast.success('发送成功')
        } catch (error) {
          console.log(error)
          this.$toast.fail('发送失败')
        }
      } catch (error) {
        console.log(error)
        console.log('校验失敗')
        this.$toast.fail('校验失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yanzhengma {
  background-color: #ededed;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
.yzm {
  position: fixed;
  right: 10px;
}
</style>
