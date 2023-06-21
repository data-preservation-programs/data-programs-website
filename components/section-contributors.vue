<template>
  <div class="contributors">

    <div class="grid">
      <div class="col-12">
        <div class="contributor-logos">
          <div
            v-for="logo in logos"
            :key="logo"
            class="image-wrapper">
            <img :src="logo" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid-equalHeight-noGutter">

      <div class="col-7_mi-12">
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
              <Button :button="{ url: 'https://example.com' }">
                <ArrowUpRight />
              </Button>
            </div>

          </div>

        </div>
      </div>

      <div class="col-3_mi-6" data-push-left="off-2_mi-6">
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

// ====================================================================== Export
export default {
  name: 'SectionContributors',

  components: {
    Button,
    ImageBlock,
    ArrowUpRight,
    JoinUsTypeface
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
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.contributor-logos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: toRem(44);
  padding-bottom: toRem(120);
  @include mini {
    padding-bottom: toRem(44);
  }
}

.image-wrapper {
  width: 20%;
  padding: 0 4%;
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
  @include mini {
    padding: toRem(27) toRem(19);
    padding-bottom: toRem(20);
  }
  .typeface {
    width: 100%;
    margin-top: 1.125rem;
    @include mini {
      margin-top: 0;
      margin-bottom: 1.875rem;
    }
    :deep(svg) {
      width: toRem(1103);
      transform: translateX(-138px);
      @include mini {
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
    @include mini {
      height: toRem(40);
    }
    .text {
      font-family: $font_Primary;
      @include fontSize_Huge;
      line-height: leading(52, 36);
      color: $mercury;
      @include mini {
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
      width: toRem(39);
      height: toRem(39);
    }
  }
}

:deep(.image-block) {
  @include mini {
    margin-top: toRem(15);
  }
}

</style>
