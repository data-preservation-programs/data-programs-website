<template>
  <div :class="[`page page-${tag}`]">

    <SiteHeader />
    <BlockBuilder :sections="sections" />
    <SiteFooter />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SettingsData from '@/content/config/settings.json'
import IndexPageData from '@/content/core/index.json'

import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import BlockBuilder from '@/components/blocks/block-builder'

export default {
  name: 'PageIndex',

  components: {
    SiteHeader,
    SiteFooter,
    BlockBuilder
  },

  data () {
    return {
      tag: 'index'
    }
  },

  async fetch ({ store, $content }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'settings', data: SettingsData })
    await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageData () {
      return this.siteContent[this.tag]
    },
    sections () {
      return this.pageData.page_content
    },
    header () {
      return this.pageData.header
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
:deep(.hero-header) {
  margin-bottom: toRem(276);
}

:deep(.section-about) {
  margin-bottom: 4rem;
  .text-block {
    &.theme__section-heading {
      margin-bottom: toRem(76);
    }
    .description {
      p {
        @include h4;
        margin-bottom: toRem(28);
        &:first-child {
          @include fontWeight_Semibold;
        }
      }
    }
  }
}

:deep(.section-articles) {
  .deck-of-cards-slider {
    padding-top: toRem(90);
    width: toRem(1572);
    transform: translateX(calc(#{math.div($containerWidth, 2)} - 50vw - 66px));
  }
}
</style>
