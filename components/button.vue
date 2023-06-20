<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="target"
    :class="[`button type__${button.type}`]"
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
    to () {
      return this.button.url ? this.$GetTagBasedOnUrl(this.button.url) === 'nuxt-link' ? this.button.url : false : false
    },
    href () {
      return this.button.url ? this.$GetTagBasedOnUrl(this.button.url) === 'a' ? this.button.url : false : false
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
}

.type__solid {
  transition: background-color $duration ease;
  background-color: $color_Primary;
  padding: 0 toRem(15);
  color: white;
  border-radius: $borderRadius_Medium;
  &:hover {
    transition: background-color $duration ease;
    background-color: $color_Secondary;
  }
  &[disabled] {
    background-color: gray;
  }
}

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
  &:hover {
    &:after {
      width: 2.375rem;
    }
  }
}
</style>
