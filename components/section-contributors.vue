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

      <div class="col-7">
        <div class="cta-block">

          <div class="typeface">
            <JoinUsTypeface />
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

      <div class="col-3" data-push-left="off-2">
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
  .typeface {
    width: 100%;
    margin-top: 1.125rem;
    :deep(svg) {
      transform: translateX(-138px);
    }
  }
  .cta {
    display: flex;
    justify-content: space-between;
    .text {
      font-family: $font_Primary;
      @include fontSize_Huge;
      line-height: leading(52, 36);
      color: $mercury;
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
  }
}

</style>
