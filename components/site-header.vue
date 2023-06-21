<template>
  <header class="site-header">
    <div class="grid-middle">
      <div class="col-2_mi-3">
        <NuxtLink to="/" class="logo">
          <SiteLogo />
        </NuxtLink>
      </div>
      <div class="col-5_mi-4" data-push-left="off-5">
        <div class="navigation desktop">
          <nav>
            <div
              v-for="link in navigation"
              :key="`${link.text}`"
              class="nav-item">
              <Button
                :button="link"
                class="nav-link">
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'

import SiteLogo from '@/components/svgs/logo'
import Button from '@/components/button'

// ====================================================================== Export
export default {
  name: 'SiteHeader',

  components: {
    SiteLogo,
    Button
  },

  props: {
    header: {
      type: Array,
      required: false,
      default: () => { }
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

  methods: {
    ...mapActions({
      setNavigationOpen: 'global/setNavigationOpen'
    })
  }
}
</script>

<style lang="scss" scoped>
.site-header {
  margin-bottom: 1.625rem;
  padding: toRem(30) 0;
  @include mini {
    padding: toRem(19) 0;
    margin-bottom: 0;
  }
}

.logo {
  display: block;
  transition: 250ms ease;
  &:hover {
    transform: scale(1.08);
  }
  :deep(svg) {
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

.navigation {
  &.desktop {
    @include mini {
      display: none;
    }
  }
}
</style>
