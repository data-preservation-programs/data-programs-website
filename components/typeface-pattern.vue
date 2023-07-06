<template>
  <div>
    <div
      v-for="(row, i) in pattern"
      :key="`row-${i}`"
      :class="['data-programs-typeface', { reverse: row.reverse }, { large }, { tiny }]"
      :style="{ transform: `translateX(${row.offset}vw)` }">

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
    tiny: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    large () {
      return !this.tiny
    }
  }
}
</script>

<style lang="scss" scoped>
.data-programs-typeface {
  position: relative;
  display: flex;
  // width: 100%;
  width: 101.75vw;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  :first-child {
    margin-right: clamp(toRem(27), vw(40px), 2.5rem);
  }
  &.large {
    @include tiny {
      display: none;
    }
  }
  &.reverse {
    flex-direction: row-reverse;
    :last-child {
      margin-right: clamp(toRem(27), vw(40px), 2.5rem);
    }
    :first-child {
      margin-right: 0;
    }
  }
  &:first-child {
    padding-top: 0;
  }
  @include mini {
    padding-top: 0.5rem;
  }
}

.data-programs-typeface {
  &.tiny {
    display: none;
    width: toRem(570);
    padding: toRem(7) 0;
    @include tiny {
      display: flex;
    }
    .typeface {
      &.data {
        // width: toRem(178);
        // height: toRem(62);
      }
      &.programs {
        // width: toRem(365);
        // height: toRem(62);
      }
    }
  }
}

.typeface {
  max-height: clamp(55px, vw(145px), toRem(145));
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
