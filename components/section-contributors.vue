<template>
  <div class="contributors">

    <div class="grid">
      <div class="col-12">
        <div class="contributor-logos">
          <CircularSlider
            :grid-cols="sliderCols"
            :reverse-grid="true"
            :collection="contributors"
            :display-options="{ default: 5, small: 3 }">

            <template
              v-for="(logo, i) in contributors"
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
                class="slider-button previous" />
            </template>

            <template #icon-next>
              <Button
                :button="next"
                class="slider-button next" />
            </template>

          </CircularSlider>
        </div>
      </div>
    </div>

    <div class="grid-equalHeight-noGutter">

      <div class="col-7_md-8_sm-7_mi-12">
        <div class="cta-block">

          <div class="typeface">
            <JoinUsTypeface class="typeface" />
          </div>

          <div class="cta">

            <div class="text">
              <div class="strong">
                Lorem ipsum work with us?
              </div>
              <div class="regular">
                Lörem ipsum syfask disamma.
              </div>
            </div>

            <div class="button-wrapper">
              <Button :button="{ url: 'https://boards.greenhouse.io/protocollabs/jobs/4864599004' }">
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
import JoinUsTypeface from '@/components/svgs/join-us'
import CircularSlider from '@/components/sliders/circular-slider-b'

// ====================================================================== Export
export default {
  name: 'SectionContributors',

  components: {
    Button,
    ImageBlock,
    ArrowUpRight,
    JoinUsTypeface,
    CircularSlider
  },

  props: {
    logos: {
      type: Array,
      required: false,
      default: () => []
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
    contributors () {
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
        padding-left: 0;
        padding-right: 1rem;
        &:after {
          transform: rotate(180deg);
        }
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
  padding: toRem(30) toRem(38);
  overflow: hidden;
  @include medium {
    padding: toRem(30) toRem(30);
  }
  @include small {
    padding: toRem(27) toRem(19);
    padding-bottom: toRem(20);
  }
  .typeface {
    width: 100%;
    margin-top: 1.125rem;
    @include small {
      margin-top: 0;
      margin-bottom: 1.875rem;
    }
    :deep(svg) {
      width: toRem(1103);
      transform: translateX(-138px);
      @include small {
        width: toRem(477);
        transform: translateX(-50px);
        height: toRem(45);
        margin-bottom: 0;
      }
    }
  }
  .cta {
    display: flex;
    justify-content: space-between;
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
      .strong {
        @include fontWeight_Medium;
      }
      .regular {
        @include fontWeight_Regular;
      }
    }
  }
  .button-wrapper {
    transition: 220ms ease;
    &:hover {
      transform: scale(1.05);
    }
    :deep(.button) {
      @include small {
        width: toRem(39);
        height: toRem(39);
      }
      svg {
        width: toRem(39);
        height: toRem(39);
      }
    }
  }
}

:deep(.image-block) {
  @include mini {
    margin-top: toRem(15);
  }
}

</style>
