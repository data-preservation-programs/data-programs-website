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
        v-for="(pattern, i) in [rows, tiny]"
        :key="`pattern-${i}`"
        :pattern="pattern"
        :tiny="i === 1" />
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
        { offset: -3, fill: ['data'], reverse: true, transparent: ['programs'] },
        { offset: 3, fill: ['programs'], reverse: true },
        { offset: -1 },
        { offset: -7.5, reverse: true },
        { offset: 4, reverse: true },
        { offset: -1 },
        { offset: -7.5, reverse: true },
        { offset: 4, reverse: true }
      ],
      tiny: [
        { offset: 4, reverse: true, transparent: ['programs'] },
        { offset: 36, transparent: ['data'] },
        { offset: -12, reverse: true, fill: ['data'] },
        { offset: 12, reverse: true, fill: ['programs'] },
        { offset: 11, reverse: true },
        { offset: -4.5, reverse: true },
        { offset: 10, reverse: true },
        { offset: -4.5, reverse: true },
        { offset: 10 },
        { offset: -4.5, reverse: true },
        { offset: 10 },
        { offset: -4.5, reverse: true },
        { offset: 10 },
        { offset: -4.5, reverse: true }
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
  @include tiny {
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
  @include small {
    margin-top: 1rem;
  }
  @include customMaxMQ (toRem(507)) {
    margin-top: 3rem;
  }
  @include tiny  {
    margin-top: 0;
  }
}

</style>
