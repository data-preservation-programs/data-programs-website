<template>
  <header :class="['site-header', { 'nav-panel-open': navigationOpen }]">

    <!-- ============================================================ Mobile -->
    <div :class="['mobile-background-panel', {'open': navigationOpen }]">

      <div class="grid">
        <div class="col-12">
          <div class="mobile-nav">
            <Navbar :links="navigation" class="mobile" />
          </div>
        </div>
      </div>

      <div class="typeface-container">
        <TypefacePattern
          :pattern="pattern"
          :mini="true" />
      </div>

    </div>

    <!-- =========================================================== Desktop -->
    <div class="grid main-content">

      <div class="col-2_sm-3">
        <NuxtLink to="/" class="logo">
          <SiteLogo />
        </NuxtLink>
      </div>

      <div class="col-5_sm-3" data-push-left="off-5_sm-6">

        <Navbar :links="navigation" class="desktop" />

        <div class="nav-toggle-wrapper">
          <Button
            :button="{ text: '' }"
            @click.native="toggleNav">
            <div :class="['hamburger', { open: navigationOpen }]">
              <div class="bottom">
              </div>
            </div>
          </Button>
        </div>

      </div>

    </div>
  </header>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'
import Throttle from 'lodash/throttle'

import SiteLogo from '@/components/svgs/logo'
import Navbar from '@/components/navbar'
import Button from '@/components/button'
import TypefacePattern from '@/components/typeface-pattern'

// =================================================================== Functions
const navResizeHandler = (instance) => {
  if (!window.matchMedia('(max-width: 53.125rem)').matches) {
    if (instance.navigationOpen) {
      instance.setNavigationOpen(false)
    }
  }
}

// ====================================================================== Export
export default {
  name: 'SiteHeader',

  components: {
    SiteLogo,
    Navbar,
    Button,
    TypefacePattern
  },

  props: {
    header: {
      type: Array,
      required: false,
      default: () => { }
    }
  },

  data () {
    return {
      resize: false,
      pattern: [
        { offset: -76, reverse: true, fill: ['data'] },
        { offset: 82, reverse: true, fill: ['programs'] },
        { offset: 56 },
        { offset: -26, reverse: true }
      ]
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      navigationOpen: 'global/navigationOpen'
    }),
    headerData () {
      return this.header ? this.header : this.siteContent.general.header
    },
    navigation () {
      return this.headerData.nav
    }
  },

  watch: {
    navigationOpen (val) {
      if (val) {
        document.body.classList.add('no-scroll')
        window.scrollTo(0, 0)
      } else {
        document.body.classList.remove('no-scroll')
      }
    }
  },

  mounted () {
    this.resize = Throttle(() => { navResizeHandler(this) }, 10)
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    ...mapActions({
      setNavigationOpen: 'global/setNavigationOpen'
    }),
    toggleNav () {
      if (this.navigationOpen) {
        this.setNavigationOpen(false)
      } else {
        this.setNavigationOpen(true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.site-header {
  position: relative;
  margin-bottom: 1.625rem;
  padding: toRem(30) 0;
  @include mini {
    padding: toRem(19) 0;
    margin-bottom: 0;
  }
  &.nav-panel-open {
    z-index: 1000;
    .main-content {
      z-index: 1001;
    }
    .logo {
      :deep(path) {
        &:not(.letter) {
          stroke: $color_Primary;
        }
        &.letter {
          fill: $color_Primary;
        }
      }
    }
  }
}

.main-content {
  position: relative;
}

.logo {
  display: block;
  width: fit-content;
  transition: 250ms ease;
  &:hover,
  &:focus-visible {
    transform: scale(1.08);
  }
  :deep(svg) {
    path {
      transition: 250ms ease;
    }
    @include mini {
      width: toRem(75);
      height: toRem(75);
    }
  }
}

.nav-item {
  display: flex;
  justify-content: flex-end;
  &:not(:last-child) {
    @include itemDivider;
  }
  &:last-child {
    @include sectionDivider;
  }
}

:deep(.navigation) {
  &.desktop {
    @include small {
      display: none;
    }
  }
}

// /////////////////////////////////////////////////////////////////// Hamburger
.nav-toggle-wrapper {
  display: none;
  position: relative;
  justify-content: flex-end;
  @include small {
    display: flex;
  }
  :deep(.button) {
    padding: toRem(5);
  }
}

.hamburger {
  position: relative;
  width: toRem(26);
  height: toRem(18);
  &:before,
  &:after,
  .bottom {
    position: absolute;
    width: 100%;
    left: 0;
    transition: 250ms ease;
  }
  &:before,
  &:after {
    content: '';
    border-bottom: solid toRem(2) $color_Secondary;
  }
  &:before {
    top: 0;
  }
  &:after {
    top: 50%;
  }
  .bottom {
    top: 100%;
    border-bottom: solid toRem(5) $color_Secondary;
  }
  &.open {
    &:before {
      width: toRem(20);
      border-bottom: solid toRem(2) $color_Primary;
      transform: translate(2px, 4.5px) rotate(45deg);
      @include mini {
        transform: translate(2px, 4px) rotate(45deg);
      }
    }
    &:after {
      width: toRem(20);
      border-bottom: solid toRem(2) $color_Primary;
      transform: translate(2px, -4.5px) rotate(-45deg);
      @include mini {
        transform: translate(2px, -4px) rotate(-45deg);
      }
    }
    .bottom {
      width: 0;
      border-bottom: solid toRem(5) $color_Primary;
    }
  }
}

// ////////////////////////////////////////////////////////////////////// Mobile
.mobile-nav {
  padding-top: toRem(200);
  @include mini {
    padding-top: toRem(162);
  }
}

.mobile-background-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $color_Secondary;
  transition: opacity 250ms ease, transform 250ms ease, visibility 250ms ease;
  visibility: hidden;
  transform: scale(1.1);
  opacity: 0;
  &.open {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
  :deep(.navigation) {
    color: $color_Primary;
    .nav-item {
      border-color: $color_Primary;
      &:last-child {
        border-bottom: solid toRem(10) $color_Primary;
      }
    }
    .nav-link {
      .text {
        @include fontSize_Regular; // 18px
        line-height: leading(33, 18);
      }
      &:after {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='24' height='14' viewBox='0 0 24 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16 0C16 0.742 16.733 1.85 17.475 2.78C18.429 3.98 19.569 5.027 20.876 5.826C21.856 6.425 23.044 7 24 7M24 7C23.044 7 21.855 7.575 20.876 8.174C19.569 8.974 18.429 10.021 17.475 11.219C16.733 12.15 16 13.26 16 14M24 7H0' stroke='%23EEEEEE' stroke-width='2'/%3e%3c/svg%3e ");
      }
    }
  }
}

.typeface-container {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  :deep(path) {
    stroke: $color_Primary;
  }
  :deep(.typeface) {
    &.fill {
      path {
        fill: $color_Primary;
      }
    }
  }
  :deep(.data-programs-typeface) {
    &.mini {
      @include small {
        display: flex !important;
      }
    }
  }
}
</style>
