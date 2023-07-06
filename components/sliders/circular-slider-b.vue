<template>
  <div :class="['slider-container', { stacked }]">
    <div :class="`grid-noGutter${reverseGrid ? '-reverse' : ''}`">

      <div
        :class="beforeCols.num"
        :data-push-left="beforeCols.push_left"
        :data-push-right="beforeCols.push_right">
        <div class="panel-before">
          <div class="slider-view">
            <div
              ref="rowContainer"
              v-hammer:swipe.horizontal="onSwipe"
              class="slider-row-container">
              <div
                class="slider-row">

                <div
                  v-for="(item, index) in collection"
                  :key="index"
                  :style="getSlideStyles(index)"
                  class="slide">

                  <slot
                    :name="`column-${index}`"
                    :classlist="slotClasslist(index)">
                  </slot>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        :class="afterCols.num"
        :data-push-left="afterCols.push_left"
        :data-push-right="afterCols.push_right">
        <div class="panel-after">

          <div class="title-matter">
            <slot name="title-matter" :slide="currentSlide"></slot>
          </div>

          <div class="slider-controls">
            <div class="slide-selector">

              <div @click="onClick(1)">
                <slot name="icon-previous"></slot>
              </div>

              <div @click="onClick(-1)">
                <slot name="icon-next"></slot>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
// =================================================================== Functions
const handleSliderResize = (instance) => {
  matchBreakpointDisplayAmount(instance)
  if (instance.$refs.rowContainer) {
    const columnWidth = instance.$refs.rowContainer.clientWidth / instance.display
    instance.columnWidth = columnWidth
  }
}

const matchBreakpointDisplayAmount = (instance) => {
  let reset = true
  for (const breakpoint in instance.visibleColumns) {
    if (window.matchMedia(`(max-width: ${breakpoint})`).matches) {
      if (reset) { reset = false }
      if (instance.display !== instance.visibleColumns[breakpoint]) {
        instance.display = instance.visibleColumns[breakpoint]
      }
    }
  }
  if (reset) {
    if (instance.display !== instance.visibleColumns.default) {
      instance.display = instance.visibleColumns.default
    }
  }
}

// ====================================================================== Export
export default {
  name: 'CircularSlider',

  props: {
    collection: {
      type: Array,
      required: true
    },
    rows: {
      type: Number,
      required: false,
      default: 1
    },
    reverseGrid: {
      type: Boolean,
      required: false,
      default: false
    },
    stacked: {
      type: Boolean,
      required: false,
      default: false
    },
    displayOptions: {
      type: Object,
      required: false,
      default: () => {
        return { default: 3 }
      }
    },
    gridCols: {
      type: Object,
      required: false,
      default: () => ({
        before: {},
        after: {}
      })
    }
  },

  data () {
    const len = this.collection.length
    const num = this.stacked ? 1 : this.displayOptions.default
    return {
      positions: [...Array(len).keys()],
      animateSlots: new Array(num + 2).fill(null).map((e, i) => i + 1),
      display: num,
      columnWidth: 0,
      resize: false,
      touchGesture: ''
    }
  },

  computed: {
    columns () {
      return Math.ceil(this.collection.length / this.rows)
    },
    breakpoints () {
      const data = {}
      if (this.displayOptions.hasOwnProperty('ultralarge')) { data['140.625rem'] = this.displayOptions.ultralarge }
      if (this.displayOptions.hasOwnProperty('xlarge')) { data['90rem'] = this.displayOptions.xlarge }
      if (this.displayOptions.hasOwnProperty('large')) { data['85rem'] = this.displayOptions.large }
      if (this.displayOptions.hasOwnProperty('medium')) { data['64rem'] = this.displayOptions.medium }
      if (this.displayOptions.hasOwnProperty('small')) { data['53.125rem'] = this.displayOptions.small }
      if (this.displayOptions.hasOwnProperty('mini')) { data['40rem'] = this.displayOptions.mini }
      if (this.displayOptions.hasOwnProperty('tiny')) { data['25.9375rem'] = this.displayOptions.tiny }
      if (this.displayOptions.hasOwnProperty('default')) {
        data.default = this.displayOptions.default
      } else {
        data.default = 3
      }
      return data
    },
    visibleColumns () {
      const options = {}
      for (const item in this.breakpoints) {
        options[item] = this.breakpoints[item] > this.columns ? this.columns : this.breakpoints[item]
      }
      return options
    },
    mapToPixels () {
      return this.positions.map((e, i) => (i - 2) * this.columnWidth)
    },
    beforeCols () {
      return this.gridCols.before
    },
    afterCols () {
      return this.gridCols.after
    },
    currentSlide () {
      return this.positions[1]
    }
  },

  mounted () {
    if (this.columns < this.display && !this.stacked) {
      this.display = this.columns
    }
    if (!this.stacked) {
      handleSliderResize(this)
      this.resize = () => { handleSliderResize(this) }
      window.addEventListener('resize', this.resize)
    }
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    increment (val) {
      const dir = this.stacked ? -1 * val : val
      const positions = this.positions
      if (dir === -1) {
        positions.push(positions.shift())
      } else if (dir === 1) {
        positions.unshift(positions.pop())
      }
      this.positions = positions
    },
    getSlideStyles (slide) {
      const position = this.positions.indexOf(slide)
      const width = this.stacked ? 'fit-content' : `${this.columnWidth}px`
      const zIndex = this.stacked ? this.getStackPosition(position) : position > this.display || position === 0 ? 1 : 2
      const transform = this.stacked ? 'none' : `translateX(${this.mapToPixels[position]}px)`
      const transition = this.stacked ? 'unset' : this.animateSlots.includes(position) ? 'transform 250ms ease' : 'unset'
      return { width, zIndex, transform, transition }
    },
    getStackPosition (pos) {
      return -1 * pos + this.positions.length
    },
    cardPosition (slide) {
      return this.positions.indexOf(slide)
    },
    slotClasslist (index) {
      if (this.cardPosition(index) === 0) {
        return this.touchGesture ? `ultimate ${this.touchGesture}` : 'ultimate'
      }
      if (this.cardPosition(index) === 1) {
        return this.touchGesture ? `penultimate ${this.touchGesture}` : 'penultimate'
      }
      if (this.cardPosition(index) === this.positions.length - 1) {
        return 'first'
      }
      return ''
    },
    onClick (direction) {
      if (this.touchGesture) {
        this.touchGesture = ''
      }
      this.increment(direction)
    },
    onSwipe (e) {
      if (e.type === 'swipeleft') {
        this.touchGesture = 'force-left'
        const inc = this.stacked ? 1 : -1
        this.increment(inc)
      }
      if (e.type === 'swiperight') {
        this.touchGesture = 'force-right'
        this.increment(1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.panel-after,
.panel-before {
  height: 440px;
}

img {
  margin: 0;
}
// //////////////////////////////////////////////////////////////////// Controls
.panel-after {
 display: flex;
 flex-direction: column;
 justify-content: space-around;
}

.title-matter {
  margin-top: 5.1875rem;
}

.slide-selector {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  @include small {
    justify-content: center;
  }
}
// ////////////////////////////////////////////////////////////////////// Slides
.panel-before {
  position: relative;
  width: 100%;
}

.slider-view {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.slider-row-container {
  width: 100%;
  height: 100%;
}

.slider-row {
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  box-sizing: border-box;
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
}

// ////////////////////////////////////////////////////////////// Slider Content
.slide {
  position: absolute;
  padding: 0.625rem;
  left: 0;
  top: 0;
  height: 100%;
}

// ////////////////////////////////////////////////////////////// Stacked Slider
.slider-container {
  &.stacked {
    .panel-after {
      position: relative;
      z-index: 10;
    }
    .slider-row-container {
      display: flex;
      justify-content: center;
    }
    .slider-view,
    .slide {
      width: 100%;
    }
    .slider-view {
      overflow: visible;
    }
    .slide {
      padding: 0;
    }
  }
}

</style>
