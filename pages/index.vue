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
  // background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 2000 2000' width='2000' height='2000' opacity='1.0'%3e%3cdefs%3e%3cfilter id='nnnoise-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3e%3cfeTurbulence type='fractalNoise' baseFrequency='0.1' numOctaves='4' seed='15' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3e%3c/feTurbulence%3e%3cfeSpecularLighting surfaceScale='1' specularConstant='1.1' specularExponent='20' lighting-color='%23EEEEEE' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3e%3cfeDistantLight azimuth='3' elevation='79'%3e%3c/feDistantLight%3e%3c/feSpecularLighting%3e%3c/filter%3e%3c/defs%3e%3crect width='2000' height='2000' fill='%23d6d6d6'%3e%3c/rect%3e%3crect width='2000' height='2000' fill='%23eeeeee' filter='url(%23nnnoise-filter)'%3e%3c/rect%3e%3c/svg%3e");
  background-repeat: repeat;
  background-size: cover;
  background-position: center;
}

:deep(.hero-header) {
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
    &.theme__section-heading {
      margin-bottom: toRem(76);
      @include mini {
        margin-bottom: 0;
      }
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
        .text {
          margin-right: toRem(11);
          @include small {
            @include fontSize_Mini;
          }
        }
        &:hover {
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
    .col-4_md-6 {
      &:nth-last-child(1),
      &:nth-last-child(2),
      &:nth-last-child(3) {
        .card {
          border-bottom: none;
        }
      }
      &:nth-last-child(3) {
        .card {
          @include medium {
            border-bottom: solid 0.125rem $color_Secondary;
          }
        }
      }
    }
  }
}

:deep(#section-contributors) {
  margin-bottom: 2.625rem;
  @include mini {
    margin-bottom: 0.5rem;
  }
}
</style>
