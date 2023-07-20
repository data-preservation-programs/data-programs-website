<template>
  <div class="slider-container">
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
                  :class="getSlideClasses(index)"
                  @click="advanceSlide(index)">

                  <slot
                    :name="`column-${index}`"
                    :classlist="slotClasslist(index)"
                    :cta-tab-index="determineSlideTabIndex(index, positions)">
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

              <div @click="onClick(-1)" @keyup.enter="onClick(-1)">
                <slot name="icon-previous"></slot>
              </div>

              <div @click="onClick(1)" @keyup.enter="onClick(1)">
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
    const num = this.displayOptions.default
    return {
      positions: [...Array(len).keys()],
      animateSlots: new Array(num + 2).fill(null).map((e, i) => i + 1),
      display: num,
      columnWidth: 0,
      resize: false,
      touchGesture: '',
      direction: 'right'
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
      return this.positions.map((e, i) => Math.max(0, Math.min(this.columnWidth * (this.display - 1), (i - 2) * this.columnWidth)))
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
    if (this.columns < this.display) {
      this.display = this.columns
    }
    handleSliderResize(this)
    this.resize = () => { handleSliderResize(this) }
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    increment (val, next) {
      const positions = this.positions
      if (val === -1) {
        positions.push(positions.shift())
      } else if (val === 1) {
        positions.unshift(positions.pop())
      }
      this.positions = positions
      if (next) { next() }
    },
    cardPosition (slide) {
      return this.positions.indexOf(slide)
    },
    getSlideStyles (slide) {
      const position = this.cardPosition(slide)
      const width = `${this.columnWidth}px`
      const transform = `translateX(${this.mapToPixels[position]}px)`
      return { width, transform }
    },
    getSlideClasses (slide) {
      const position = this.cardPosition(slide)
      return [
        'slide',
        this.direction,
        `position-${position < 8 ? position : '8-or-grt'}`
      ]
    },
    slotClasslist (index) {
      const position = this.cardPosition(index)
      const hover = position === 4 ? 'centered' : ''
      if ((this.direction === 'left' && position >= 4) || (this.direction === 'right' && position <= 4)) {
        return `animation-slot-${position < 8 ? position : '8-or-grt'} delay ${hover}`
      }
      return `animation-slot-${position < 8 ? position : '8-or-grt'}`
    },
    onClick (direction) {
      this.direction = direction === 1 ? 'right' : 'left'
      this.increment(direction)
    },
    onSwipe (e) {
      if (e.type === 'swipeleft') {
        this.direction = 'left'
        this.increment(-1)
      }
      if (e.type === 'swiperight') {
        this.direction = 'right'
        this.increment(1)
      }
    },
    advanceSlide (index) {
      const position = this.cardPosition(index)
      switch (position) {
        case 2:
          this.direction = 'right'
          this.increment(1, this.increment(1))
          break
        case 3:
          this.direction = 'right'
          this.increment(1)
          break
        case 5:
          this.direction = 'left'
          this.increment(-1)
          break
        case 6:
          this.direction = 'left'
          this.increment(-1, this.increment(-1))
          break
      }
    },
    determineSlideTabIndex (slideIndex, positions) {
      let tabindex
      const positionIndex = positions.indexOf(slideIndex)
      switch (positionIndex) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          tabindex = 0
          break
        default:
          tabindex = -1
      }
      return tabindex
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.panel-before {
  height: toRem(690);
  @include small {
    height: toRem(424);
  }
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
  // overflow: hidden;
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
  &.position-0 {
    z-index: 0;
  }
  &.position-1 {
    z-index: 1;
  }
  &.position-2 {
    z-index: 2;
  }
  &.position-3 {
    z-index: 3;
  }
  &.position-4 {
    z-index: 4;
  }
  &.position-5 {
    z-index: 3;
  }
  &.position-6 {
    z-index: 2;
  }
  &.position-7 {
    z-index: 1;
  }
  &.position-8-or-grt {
    z-index: 0;
    opacity: 0;
  }
  &.position-0,
  &.position-1,
  &.position-7,
  &.position-8-or-grt {
    transition: unset;
  }
  &.left {
    &.position-2,
    &.position-3 {
      transition: transform 500ms ease-in-out 40ms, z-index 500ms ease-in-out 40ms;
    }
    &.position-4{
      transition: transform 500ms ease-in-out 100ms, z-index 500ms ease-in-out 10ms;
    }
    &.position-5 {
      transition: transform 500ms ease-out 130ms, z-index 500ms ease-out 100ms;
    }
    &.position-6 {
      transition: transform 500ms ease-in 170ms, z-index 500ms ease-in 0ms;
    }
  }
  &.right {
    &.position-2 {
      transition: transform 500ms ease-in 170ms, z-index 500ms ease-in 100ms;
    }
    &.position-3 {
      transition: transform 500ms ease-out 130ms, z-index 500ms ease-out 100ms;
    }
    &.position-4 {
      transition: transform 500ms ease-in-out 100ms, z-index 500ms ease-in-out 10ms;
    }
    &.position-5,
    &.position-6 {
      transition: transform 500ms ease-in-out, z-index 500ms ease-in-out;
    }
  }
}

</style>
