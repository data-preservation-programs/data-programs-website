<template>
  <footer class="site-footer">
    <div class="grid-noGutter">

      <div class="col-12">
        <div class="divider"></div>
      </div>

      <div class="col-6_sm-12">
        <div class="site-footer-logo">
          <div class="statement-of-intent">
            {{ headerData.statement.toUpperCase() }}
          </div>
          <NuxtLink to="/" class="nuxt-link">
            <SiteFooterLogo />
          </NuxtLink>
        </div>
      </div>

      <div class="col-5_sm-12" data-push-left="off-1_sm-0">
        <div class="footer-links">
          <div
            v-for="link in links"
            :key="`${link.text}`"
            class="footer-item">
            <Button
              v-if="!link.hasOwnProperty('socials')"
              :button="link"
              class="link">
            </Button>
            <template v-else>
              <Button
                v-for="social in link.socials"
                :key="social.icon"
                :button="{ url: social.url }"
                class="link social">
                <component :is="getSocialIcon(social.icon)" />
              </Button>
            </template>
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
import SlackIcon from '@/components/svgs/slack-icon'
import GithubIcon from '@/components/svgs/github-icon'

export default {
  name: 'SiteFooter',

  components: {
    Button,
    SiteFooterLogo,
    SlackIcon,
    GithubIcon
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
    },
    headerData () {
      return this.siteContent.general.header
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
    },
    getSocialIcon (icon) {
      if (icon === 'slack') { return 'SlackIcon' }
      if (icon === 'github') { return 'GithubIcon' }
      return 'div'
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.site-footer {
  position: relative;
}

.divider {
  width: 100%;
  @include sectionDivider;
}

.site-footer-logo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  @include small {
    padding: toRem(19) 0;
    @include sectionDivider;
  }
  .nuxt-link {
    display: block;
    width: fit-content;
    transition: 250ms ease;
    &:hover {
      transform: scale(1.08);
    }
  }
}

.statement-of-intent {
  padding: toRem(23) 0;
  @include fontSize_Regular;
  @include fontWeight_Semibold;
  line-height: leading(27, 18);
  letter-spacing: 0.05em;
  @include small {
    padding: 0;
    margin-bottom: toRem(53);
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
  :deep(.text) {
    font-size: 1rem;
    line-height: leading(24, 16);
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

.link {
  &.social {
    padding: 0.75rem 0;
    padding-left: 1.375rem;
  }
}
</style>
