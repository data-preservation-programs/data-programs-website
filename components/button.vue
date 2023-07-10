<template>
  <component
    :is="tag"
    :to="href"
    :href="href"
    :target="target"
    :class="['button', `type__${button.type}`, `theme__${button.theme}`]"
    :disabled="button.disabled">
    <span v-if="button.text" class="text">{{ button.text }}</span>
    <slot />
  </component>
</template>

<script>
export default {
  name: 'Button',

  props: {
    button: {
      /**
       * text
       * type: solid, underline, pill
       * disabled: Bool
       */
      type: Object,
      required: true
    }
  },

  computed: {
    tag () {
      return this.button.url ? this.$GetTagBasedOnUrl(this.button.url) : 'div'
    },
    target () {
      return this.button.target ? this.button.target : this.$GetTargetBasedOnUrl(this.button.url)
    },
    href () {
      const tag = this.$GetTagBasedOnUrl(this.button.url)
      return this.button.url ? tag === 'a' || tag === 'nuxt-link' ? this.button.url : false : false
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .text {
    white-space: nowrap;
  }
}

.type__solid {
  transition: background-color $duration ease;
  background-color: $color_Primary;
  padding: 0 toRem(15);
  color: white;
  border-radius: $borderRadius_Medium;
  &:hover,
  &:focus-visible {
    transition: background-color $duration ease;
    background-color: $color_Secondary;
  }
  &[disabled] {
    background-color: gray;
  }
}

.type__text-only,
.type__nav-link {
  position: relative;
  @include cta;
  padding: 0.75rem 0;
  padding-left: 1rem;
  .text {
    display: inline-block;
    @include cta;
  }
  &:after {
    content: '';
    display: inline-block;
    position: relative;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='24' height='14' viewBox='0 0 24 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16 0C16 0.742 16.733 1.85 17.475 2.78C18.429 3.98 19.569 5.027 20.876 5.826C21.856 6.425 23.044 7 24 7M24 7C23.044 7 21.855 7.575 20.876 8.174C19.569 8.974 18.429 10.021 17.475 11.219C16.733 12.15 16 13.26 16 14M24 7H0' stroke='%231A1A1A' stroke-width='2'/%3e%3c/svg%3e ");
    background-repeat: no-repeat;
    background-size: 24px 14px;
    background-position: center right;
    width: 0;
    height: 0.875rem;
    transition: 250ms ease;
  }
  &:hover,
  &:focus-visible {
    &:after {
      width: 2.375rem;
    }
  }
}

.type__project-cta {
  padding: 0 toRem(13);
  border: solid 2px $color_Secondary;
  border-radius: 0.3125rem;
  transition: 250ms ease;
  @include medium {
    border: solid 1.5px $color_Secondary;
  }
  .text {
    @include cta;
    transition: 250ms ease;
  }
  &:hover,
  &:focus-visible {
    background-color: $color_Secondary;
    .text {
      color: $mercury;
    }
  }
  &.theme__dark {
    background-color: $color_Secondary;
    &:before {
      content: '';
      position: absolute;
      left: -5px;
      top: -5px;
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      border-radius: toRem(7);
      border: solid 1px $color_Secondary;
      opacity: 0;
      transition: inherit;
    }
    .text {
      color: $mercury;
    }
    &:hover,
    &:focus-visible {
      background-color: $color_Primary;
      &:before {
        opacity: 1;
      }
      .text {
        color: $color_Secondary;
      }
    }
  }
}

.type__text-only {
  &.theme__regular {
    &:after {
      width: 24px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='24' height='14' viewBox='0 0 24 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16 0C16 0.742 16.733 1.85 17.475 2.78C18.429 3.98 19.569 5.027 20.876 5.826C21.856 6.425 23.044 7 24 7M24 7C23.044 7 21.855 7.575 20.876 8.174C19.569 8.974 18.429 10.021 17.475 11.219C16.733 12.15 16 13.26 16 14M24 7H0' stroke='%231A1A1A'/%3e%3c/svg%3e ");
      @include mini {
        background-size: 1rem 0.5rem;
        background-position: center;
      }
    }
    .text {
      font-family: $font_Secondary;
      @include fontSize_Regular;
      @include fontWeight_Medium;
      letter-spacing: 0.04em;
      line-height: leading(24, 18);
      @include mini {
        @include fontSize_Tiny;
      }
    }
  }
  &.theme__strong {
    &:after {
      width: 30px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='30' height='18' viewBox='0 0 30 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M20 0C20 0.954 20.9163 2.37857 21.8438 3.57429C23.0363 5.11714 24.4612 6.46329 26.095 7.49057C27.32 8.26071 28.805 9 30 9M30 9C28.805 9 27.3187 9.73929 26.095 10.5094C24.4612 11.538 23.0363 12.8841 21.8438 14.4244C20.9163 15.6214 20 17.0486 20 18M30 9H0' stroke='%231A1A1A' stroke-width='2'/%3e%3c/svg%3e ");
      @include mini {
        background-size: 1rem 0.5rem;
        background-position: center;
      }
    }
    .text {
      font-family: $font_Secondary;
      @include fontSize_Medium;
      @include fontWeight_Bold;
      letter-spacing: 0.03em;
      line-height: leading(33, 20);
      @include mini {
        @include fontSize_Tiny;
      }
    }
  }
}
</style>
