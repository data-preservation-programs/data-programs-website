<template>
  <header class="site-header">
    <div class="grid-middle">
      <div class="col-2">
        <NuxtLink to="/" class="logo">
          <SiteLogo />
        </NuxtLink>
      </div>
      <div class="col-5" data-push-left="off-5">
        <div class="navigation">
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
}

.logo {
  display: block;
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
</style>
