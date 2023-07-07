<template>
  <div class="navigation">
    <nav>
      <div
        v-for="link in links"
        :key="`${link.text}`"
        class="nav-item">
        <Button
          :button="link"
          class="nav-link">
        </Button>
      </div>
    </nav>
  </div>
</template>

<script>
// ====================================================================== Import
import Button from '@/components/button'

// ====================================================================== Export
export default {
  name: 'Navbar',

  components: {
    Button
  },

  props: {
    links: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-item {
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
</style>
