<template>
  <div class="section-hero-header">

    <div class="grid">
      <div class="col-7_sm-8_ti-9">
        <div
          class="statement-of-intent"
          v-html="headerData.statement.toUpperCase()">
        </div>
      </div>
    </div>

    <div class="typeface-container">
      <TypefacePattern
        v-for="(pattern, i) in [rows, mini]"
        :key="`pattern-${i}`"
        :pattern="pattern"
        :mini="i === 1" />
    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import TypefacePattern from '@/components/typeface-pattern'

// ====================================================================== Export
export default {
  name: 'SectionHero',

  components: {
    TypefacePattern
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
  @include customMaxMQ ($containerWidth + 4rem) {
    padding-top: 0;
  }
  @include medium {
    @include fontSize_Medium; // 20
  }
  @include mini {
    @include fontSize_Small; // 16
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

</style>
