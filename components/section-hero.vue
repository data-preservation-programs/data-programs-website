<template>
  <div class="section-hero-header">

    <div class="grid">
      <div class="col-7">
        <div class="statement-of-intent">
          {{ headerData.statement.toUpperCase() }}
        </div>
      </div>
    </div>

    <div class="typeface-container">
      <div
        v-for="(row, i) in rows"
        :key="`row-${i}`"
        :class="['data-programs-typeface', { reverse: row.reverse }]"
        :style="{ transform: `translateX(${row.offset}px)` }">

        <DataTypeface :class="['typeface', { fill: Array.isArray(row.fill) && row.fill.includes('data') }]" />

        <ProgramTypeface v-if="i !== 0" :class="['typeface', { fill: Array.isArray(row.fill) && row.fill.includes('programs') }]" />

      </div>
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
        {
          offset: -118,
          fill: ['data'],
          reverse: true
        },
        {
          offset: 40,
          fill: ['programs'],
          reverse: true
        },
        {
          offset: -20
        },
        {
          offset: -107,
          reverse: true
        },
        {
          offset: 40,
          reverse: true
        },
        {
          offset: -20
        },
        {
          offset: -107,
          reverse: true
        },
        {
          offset: 40,
          reverse: true
        }
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
}

.typeface-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.data-programs-typeface {
  display: flex;
  width: toRem(1492);
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  &.reverse {
    flex-direction: row-reverse;
  }
  &:first-child {
    padding-top: 0;
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
}
</style>
