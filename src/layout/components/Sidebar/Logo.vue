<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <a v-if="collapse" key="collapse" href="javascript:;" class="sidebar-logo-link">
        <!--<img v-if="logo" :src="logo" class="sidebar-logo">-->
        <!--<h1 v-else class="sidebar-title">{{ title }} </h1>-->
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      </a>
      <a v-else key="expand" href="javascript:;" class="sidebar-logo-link" to="/">
        <!--<img v-if="logo" :src="logo" class="sidebar-logo">-->
        <!--<h1 class="sidebar-title">{{ title }} </h1>-->

        <div>
          <span class="sidebar-title">{{ title }} </span>
          <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        </div>
      </a>
    </transition>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'

import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',

  components: {
    Hamburger
  },
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      title: '系统管理',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },

  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "@/styles/variables.scss";
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;

  height: 53px;
  line-height: 40px;

  background: #ffffff;
  text-align: center;
  overflow: hidden;
  background: url('~@/assets/img/sidebar/leftbar_cdzkyy.png') no-repeat 0 bottom;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: $menuActiveText;
      font-weight: bold;
      line-height: 40px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      float: left;
      margin-left: 20px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}

  .hamburger-container{
    float: right;
  }
</style>
