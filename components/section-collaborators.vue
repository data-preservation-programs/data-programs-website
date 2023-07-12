<template>
  <div class="collaborators">

    <div class="grid">
      <div class="col-12">
        <div class="contributor-logos">
          <CircularSlider
            :grid-cols="sliderCols"
            :reverse-grid="true"
            :collection="collaborators"
            :display-options="{ default: 5, small: 3 }">

            <template
              v-for="(logo, i) in collaborators"
              #[`column-${i}`]>
              <div
                :key="logo"
                class="image-wrapper">
                <img :src="logo" />
              </div>
            </template>

            <template #icon-previous>
              <Button
                :button="previous"
                :tabindex="0"
                class="slider-button previous" />
            </template>

            <template #icon-next>
              <Button
                :button="next"
                :tabindex="0"
                class="slider-button next" />
            </template>

          </CircularSlider>
        </div>
      </div>
    </div>

    <div class="grid-equalHeight-noGutter">

      <div class="col-7_md-8_sm-7_mi-12">
        <div class="cta-block">

          <div class="text-marquee">
            <span class="typeface" v-html="ctablock.marquee_text" />
          </div>

          <div class="cta">

            <span class="text regular" v-html="ctablock.text" />

            <div class="button-wrapper">
              <Button :button="{ url: ctablock.url }">
                <ArrowUpRight />
              </Button>
            </div>

          </div>

        </div>
      </div>

      <div class="col-3_md-3_sm-3_mi-6" data-push-left="off-2_md-1_sm-2_mi-6">
        <ImageBlock :block="imageblock" />
      </div>

    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import Button from '@/components/button'
import ImageBlock from '@/components/blocks/image-block'
import ArrowUpRight from '@/components/svgs/arrow-up-right'
import CircularSlider from '@/components/sliders/circular-slider-b'

// ====================================================================== Export
export default {
  name: 'SectionCollaborators',

  components: {
    Button,
    ImageBlock,
    ArrowUpRight,
    CircularSlider
  },

  props: {
    logos: {
      type: Array,
      required: false,
      default: () => []
    },
    ctablock: {
      type: Object,
      required: false,
      default: () => ({})
    },
    imageblock: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  data () {
    return {
      sliderCols: {
        before: {
          num: 'col-10_mi-12',
          push_left: 'off-1_mi-0',
          push_right: 'off-1_mi-0'
        },
        after: {
          num: 'col-12',
          push_left: 'off-0',
          push_right: 'off-0'
        }
      },
      previous: {
        type: 'text-only',
        text: '',
        theme: 'strong'
      },
      next: {
        type: 'text-only',
        text: '',
        theme: 'strong'
      }
    }
  },

  computed: {
    collaborators () {
      const array = []
      for (let i = 0; i < 3; i++) { array.push(this.logos) }
      return array.flat()
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.contributor-logos {
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  padding-top: toRem(34);
  padding-bottom: toRem(100);
  @include small {
    padding-bottom: toRem(44);
  }
  @include mini {
    padding: toRem(14) 0;
  }
}

:deep(.slider-container) {
  [class~="grid"],
  [class*="grid-"],
  [class*="grid_"] {
    position: relative;
  }
  .panel-before,
  .panel-after {
    height: toRem(150) !important;
    @include mini {
      height: toRem(68) !important;
    }
  }
  .panel-before {
    @include mini {
      margin: 0 -1.5rem;
      width: calc(100% + 3rem);
    }
    .slide {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 2.5rem;
      @include medium {
        padding: 0 1.5rem;
      }
      @include small {
        padding: 0 2rem;
      }
      @include mini {
        padding: 0 1.5rem;
      }
    }
  }
  .panel-after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    @include mini {
      position: relative;
    }
    .title-matter {
      display: none;
    }
    .slide-selector {
      position: relative;
      justify-content: space-between;
      padding: 0 1.875rem;
      &:after {
        display: none;
        content: 'SEE MORE';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        @include fontSize_Small;
        @include fontWeight_Bold;
        line-height: leading(33, 16);
        letter-spacing: 0.03em;
        @include mini {
          display: block;
        }
      }
      @include small {
        padding: 0;
      }
      @include mini {
        padding: 0 1.5rem;
      }
    }
    .slider-button {
      &.previous {
        padding-right: 1rem;
        &:after {
          transform: rotate(180deg);
        }
      }
      &.next {
        padding-right: 1rem;
      }
      &:after {
        @include mini {
          background-size: toRem(25) toRem(15);
        }
      }
    }
  }
}

.cta-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: $color_Secondary;
  border-radius: toRem(19);
  overflow: hidden;
  @include medium {
    padding: toRem(30) toRem(30);
  }
  @include small {
    padding: toRem(27) toRem(19);
    padding-bottom: toRem(20);
  }
  &:hover {
    .typeface {
      animation-play-state: running;
    }
  }
  .text-marquee {
    height: toRem(190);
    width: 100%;
  }
  .typeface {
    display: block;
    font-family: $font_Primary;
    font-size: toRem(146);
    line-height: 1.3;
    color: $color_Secondary;
    @include fontWeight_Medium;
    white-space: nowrap;
    text-shadow: 0px 0px 0 $mercury, 0px 0px 0 $mercury, 0px 0px 0 $mercury, 0px 0px 0 $mercury;
    -webkit-text-stroke: 1px $mercury;
    animation: marqueeTextScroll 17s linear infinite paused;
    pointer-events: none;
    @include selection_Invisible;
    @include small {
      margin-top: 0;
      margin-bottom: 1.875rem;
    }
  }
  .cta {
    display: flex;
    justify-content: space-between;
    padding: toRem(30) toRem(19) toRem(30) toRem(38);
    @include large {
      align-items: flex-end;
    }
    @include small {
      height: toRem(40);
    }
    .text {
      font-family: $font_Primary;
      @include fontSize_Huge;
      line-height: leading(52, 36);
      color: $mercury;
      @include large {
        @include fontSize_Large;
      }
      @include small {
        @include fontSize_Small;
      }
      .regular {
        @include fontWeight_Regular;
      }
    }
  }
  .button-wrapper {
    transition: 220ms ease;
    &:hover,
    &:focus-within {
      transform: scale(1.05);
    }
    :deep(.button) {
      @include small {
        width: toRem(94);
        height: toRem(94);
      }
      svg {
        width: toRem(94);
        height: toRem(94);
      }
    }
  }
}

:deep(.image-block) {
  @include mini {
    margin-top: toRem(15);
  }
}

// ////////////////////////////////////////////////////////////////// Animations
@keyframes marqueeTextScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-440%)
  }
}

</style>
