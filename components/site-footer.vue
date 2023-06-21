<template>
  <footer class="site-footer">
    <div class="grid-noGutter">

      <div class="col-12">
        <div class="divider"></div>
      </div>

      <div class="col-4">
        <div class="site-footer-logo">
          <NuxtLink to="/" class="logo">
            <SiteFooterLogo />
          </NuxtLink>
        </div>
      </div>

      <div class="col-5" data-push-left="off-3">
        <div class="footer-links">
          <div
            v-for="link in links"
            :key="`${link.text}`"
            class="footer-item">
            <Button
              :button="link"
              class="link">
            </Button>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="copyright-container">
          <div class="before">
            {{ copyright.before }}
          </div>
          <div class="after">
            <Button
              v-for="link in copyright.after"
              :key="link.text"
              :button="link" />
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import SiteFooterLogo from '@/components/svgs/site-logo-footer'
import Button from '@/components/button'

export default {
  name: 'SiteFooter',

  components: {
    Button,
    SiteFooterLogo
  },

  props: {
    footer: {
      type: Array,
      required: false,
      default: () => { }
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    footerData () {
      return this.footer ? this.footer : this.siteContent.general.footer
    },
    links () {
      return this.footerData.links
    },
    copyright () {
      return this.footerData.copyright
    }
  },

  methods: {
    getButtonIcon (network) {
      let tag
      switch (network) {
        case 'linkedin': tag = 'IconLinkedIn'; break
        case 'twitter': tag = 'IconTwitter'; break
        case 'facebook': tag = 'IconFacebook'; break
        case 'youtube': tag = 'IconYoutube'; break
        default: tag = 'div'; break
      }
      return tag
    },
    getTag (url) {
      return url ? this.$GetTagBasedOnUrl(url) : 'div'
    },
    getTarget (url) {
      return url ? this.$GetTargetBasedOnUrl(url) : false
    },
    getTo (url) {
      return url ? this.$GetTagBasedOnUrl(url) === 'nuxt-link' ? url : false : false
    },
    getHref (url) {
      return url ? this.$GetTagBasedOnUrl(url) === 'a' ? url : false : false
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.site-footer {
  position: relative;
  background-color: $color_Primary;
}

.divider {
  width: 100%;
  @include sectionDivider;
}

.site-footer-logo {
  padding: 1.875rem 0;
  transition: 250ms ease;
  &:hover {
    transform: scale(1.08);
  }
}

.footer-item {
  display: flex;
  justify-content: flex-end;
  &:not(:last-child) {
    @include itemDivider;
  }
  &:last-child {
    @include sectionDivider;
  }
}

.copyright-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 1.375rem;
  padding-bottom: 2rem;
  .before {
    @include fontWeight_Medium;
    line-height: leading(36, 16);
  }
  .after {
    :deep(.button) {
      &:not(:last-child) {
        margin-right: toRem(55);
      }
      .text {
        @include fontWeight_Medium;
        line-height: leading(36, 16);
      }
    }
  }
}
</style>
