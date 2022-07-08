
    <template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="profile.photo"
        width="0.9rem"
        height="0.9rem"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="profile.name"
      @click="isNameShow = true"
      is-link
    />
    <van-cell
      title="性别"
      :value="profile.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      :value="profile.birthday"
      @click="isbirthdayShow = true"
      is-link
    />
    <!-- 修改昵称 -->
    <van-popup position="bottom" style="height: 100%" v-model="isNameShow">
      <van-nav-bar
        title="标题"
        left-text="取消"
        right-text="保存"
        left-arrow
        @click-left="onNameCancle"
        @click-right="onNameSave"
      />
      <van-field
        :value="profile.name"
        @input="name = $event"
        rows="2"
        autosize
        label=""
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <!-- 修改出生日期 -->
    <van-popup position="bottom" v-model="isbirthdayShow">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 修改头像  -->
    <input
      style="display: none"
      type="file"
      ref="file"
      accept="image/jpg, image/png, image/jpeg, image/gif"
      @change="onChange"
    />
    <van-popup position="bottom" style="height: 100%" v-model="isAvatarShow">
      <UpdataAvatar
      v-if="isAvatarShow"
        :imgURL.sync="imageURL"
        @close="isAvatarShow = false"
      ></UpdataAvatar>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/Api/user'
import UpdataAvatar from './comoonent/UpdataAvatar.vue'
export default {
  async created () {
    try {
      const res = await getUserProfile()
      this.profile = res.data.data
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      profile: {},
      isNameShow: false,
      name: '',
      isbirthdayShow: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
      birthday1: '',
      isAvatarShow: false,
      imageURL: ''
    }
  },
  methods: {
    onNameCancle () {
      this.isNameShow = false
    },
    async onNameSave () {
      this.profile.name = this.name
      console.log(this.profile)
      await this.save()
      this.isNameShow = false
    },
    async save () {
      try {
        const res = await updateUserProfile(this.profile)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    onConfirm () {
      this.profile.birthday = this.birthday1
      this.save(this.profile)
      this.isbirthdayShow = false
    },
    onChange () {
      const url = window.URL.createObjectURL(this.$refs.file.files[0])
      console.log(url)
      this.imageURL = url
      this.profile.photo = this.imageURL
      this.isAvatarShow = true
    }
  },
  computed: {
    currentDate: {
      get () {
        const res = new Date(this.profile.birthday)
        return res
      },
      set (newval) {
        this.birthday1 = newval.getFullYear() + '-' + newval.getMonth() + '-' + newval.getDate()
      }
    }
  },
  watch: {

  },
  filters: {},
  components: { UpdataAvatar }
}
</script>

<style scoped lang='less'>
</style>
