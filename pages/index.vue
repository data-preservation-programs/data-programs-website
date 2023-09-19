<template>
  <div :class="[`page page-${tag}`]">

    <div class="background-noise"></div>
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
.page-index {
  position: relative;
}

.background-noise {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background-image: url("../assets/noise.png");
  background-size: 10rem;
  background-repeat: repeat;
}

:deep(#hero-header) {
  margin-bottom: clamp(toRem(80), vw(225px), toRem(225));
  @include mini {
    margin-bottom: clamp(3rem, 12vw, 6rem);
  }
  @include tiny {
    margin-bottom: toRem(160);
  }
}

:deep(#section-projects) {
  .card-list-block {
    .card {
      @include mini {
        margin: 0 -0.5rem;
        .logo {
          &.filplus-storage {
            height: toRem(59);
          }
        }
      }
    }
  }
}

:deep(#section-about) {
  margin-bottom: 4rem;
  div[data-block-id="col_1"] {
    @include medium {
      margin-bottom: 0 !important;
    }
    @include mini {
      margin-bottom: 1.625rem !important;
    }
  }
  .text-block {
    font-family: $font_Secondary;
    &.theme__section-heading {
      margin-bottom: toRem(76);
      @include mini {
        margin-bottom: 0;
      }
    }
    h2 {
      font-size: clamp(toRem(18), vw(24px), toRem(24));
      line-height: (36, 24);
      font-weight: 600;
      margin-bottom: toRem(55);
    }
    .description {
      p {
        font-family: $font_Secondary;
        font-size: clamp(toRem(16), vw(20px), toRem(20));
        line-height: (30, 20);
        font-weight: 500;
      }
    }
  }
  .image-block {
    @include medium {
      margin-bottom: 2rem;
    }
  }
}

:deep(#section-articles) {
  @include small {
    margin-bottom: 0;
  }
  .text-block {
    @include small {
      align-items: center;
    }
    .heading {
      @include small {
        margin-bottom: toRem(7);
      }
    }
    .button-row {
      display: flex;
      margin-top: 0;
      margin-bottom: 1.25rem;
      @include small {
        margin-bottom: 0;
      }
      .button {
        padding-right: 1.75rem;
        margin-right: -1.75rem;
        .text {
          margin-right: toRem(11);
          @include small {
            @include fontSize_Mini;
          }
        }
        &:hover,
        &:focus-visible {
          &:after {
            transform: translateX(0.75rem);
          }
        }
        @include small {
          &:after {
            width: 1rem;
            height: 0.625rem;
          }
        }
      }
    }
  }
  div[data-block-id="col_2"] {
    .column-content {
      position: relative;
      height: toRem(834);
      @include small {
        height: toRem(544);
      }
    }
  }
  .deck-of-cards-slider {
    position: absolute;
    padding-top: toRem(90);
    width: toRem(1572);
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    @include small {
      padding-top: toRem(39);
      width: toRem(1000);
    }
  }
}

:deep(#section-people) {
  margin-bottom: 1.875rem;
  .card-list-block {
    .col-4_md-6:nth-child(3n+1):nth-last-child(-n+3),
    .col-4_md-6:nth-child(3n+1):nth-last-child(-n+3) ~ .col-4_md-6 {
      .card {
        border-bottom: none;
      }
      @include medium {
        .card {
          @include itemDivider;
        }
        &:nth-child(2n+1):nth-last-child(-n+2),
        &:nth-child(2n+1):nth-last-child(-n+2) ~ .col-4_md-6 {
          .card {
            border-bottom: none;
          }
        }
      }
    }
  }
}

:deep(#section-collaborators) {
  margin-bottom: 2.625rem;
  @include mini {
    margin-bottom: 0.5rem;
  }
}
</style>
