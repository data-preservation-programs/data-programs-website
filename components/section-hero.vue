<template>
  <div class="section-hero-header">

    <div class="grid">
      <div class="col-7_mi-8_ti-9">
        <div class="statement-of-intent">
          {{ headerData.statement.toUpperCase() }}
        </div>
      </div>
    </div>

    <div class="typeface-container">
      <template v-for="(pattern, j) in [rows, mini]">
        <div
          v-for="(row, i) in pattern"
          :key="`row-${i}-${j}`"
          :class="['data-programs-typeface', { reverse: row.reverse }, { 'large': j === 0 }, { 'mini': j === 1 }]"
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
      </template>
    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import ProgramTypeface from '@/components/svgs/programs'
import DataTypeface from '@/components/svgs/data'

// ====================================================================== Export
export default {
  name: 'SectionHero',

  components: {
    ProgramTypeface,
    DataTypeface
  },

  data () {
    return {
      rows: [
        { offset: -118, fill: ['data'], reverse: true, transparent: ['programs'] },
        { offset: 40, fill: ['programs'], reverse: true },
        { offset: -20 },
        { offset: -107, reverse: true },
        { offset: 40, reverse: true },
        { offset: -20 },
        { offset: -107, reverse: true },
        { offset: 40, reverse: true }
      ],
      mini: [
        { offset: 14, reverse: true, transparent: ['programs'] },
        { offset: 176, transparent: ['data'] },
        { offset: -76, reverse: true, fill: ['data'] },
        { offset: 83, reverse: true, fill: ['programs'] },
        { offset: 56 },
        { offset: -26, reverse: true },
        { offset: 56 },
        { offset: -26, reverse: true },
        { offset: 56 },
        { offset: -26, reverse: true },
        { offset: 56 },
        { offset: -26, reverse: true },
        { offset: 56 },
        { offset: -26, reverse: true }
      ]
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    headerData () {
      return this.header ? this.header : this.siteContent.general.header
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.section-hero-header {
  position: relative;
  width: 100%;
}

.statement-of-intent {
  position: relative;
  padding: toRem(30) 0;
  @include h5;
  z-index: 2;
  @include mini {
    padding-top: 0.125rem;
    padding-right: 1.5rem;
  }
}

.typeface-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

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
