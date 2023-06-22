<template>
  <div>
    <div
      v-for="(row, i) in pattern"
      :key="`row-${i}`"
      :class="['data-programs-typeface', { reverse: row.reverse }, { large }, { mini }]"
      :style="{ transform: `translateX(${row.offset}px)` }">

      <DataTypeface
        :class="[
          'typeface',
          'data',
          { fill: Array.isArray(row.fill) && row.fill.includes('data') },
          { transparent: Array.isArray(row.transparent) && row.transparent.includes('data') }
        ]" />

      <ProgramTypeface
        :class="[
          'typeface',
          'programs',
          { fill: Array.isArray(row.fill) && row.fill.includes('programs') },
          { transparent: Array.isArray(row.transparent) && row.transparent.includes('programs') }
        ]" />

    </div>
  </div>
</template>

<script>
import ProgramTypeface from '@/components/svgs/programs'
import DataTypeface from '@/components/svgs/data'

export default {
  name: 'TypefacePattern',

  components: {
    ProgramTypeface,
    DataTypeface
  },

  props: {
    pattern: {
      type: Array,
      required: true,
      default: () => []
    },
    mini: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    large () {
      return !this.mini
    }
  }
}
</script>

<style lang="scss" scoped>
.data-programs-typeface {
  display: flex;
  width: toRem(1492);
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  &.large {
    @include mini {
      display: none;
    }
  }
  &.reverse {
    flex-direction: row-reverse;
  }
  &:first-child {
    padding-top: 0;
  }
}

.data-programs-typeface {
  &.mini {
    display: none;
    width: toRem(570);
    padding: toRem(7) 0;
    @include mini {
      display: flex;
    }
    .typeface {
      &.data {
        width: toRem(178);
        height: toRem(55);
      }
      &.programs {
        width: toRem(365);
        height: toRem(55);
      }
    }
  }
}

.typeface {
  :deep(path) {
    fill: transparent;
  }
  &.fill {
    :deep(path) {
      fill: $color_Secondary;
    }
  }
  &.transparent {
    opacity: 0;
  }
}
</style>
