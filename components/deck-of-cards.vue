<template>
  <div class="deck-of-cards-slider">

    <CircularSlider
      :grid-cols="columns"
      :reverse-grid="true"
      :collection="cardList"
      :display-options="{ default: 5 }">

      <template
        v-for="(card, i) in cardList"
        #[getSlotName(i)]="{ classlist, ctaTabIndex }">
        <div
          :key="`slide-${i}`"
          :class="['slider-card', classlist]">
          <Card :key="`slide-${i}`" :card="card" class="slide-content" :cta-tab-index="ctaTabIndex" />
        </div>
      </template>

      <template #icon-previous>
        <Button
          :button="previous"
          class="slider-button previous"
          :tabindex="0" />
      </template>

      <template #icon-next>
        <Button
          :button="next"
          class="slider-button next"
          :tabindex="0" />
      </template>

    </CircularSlider>

  </div>
</template>

<script>
// ====================================================================== Import
import CircularSlider from '@/components/sliders/circular-slider-a'
import Card from '@/components/card'
import Button from '@/components/button'

// ====================================================================== Export
export default {
  name: 'DeckOfCards',

  components: {
    CircularSlider,
    Card,
    Button
  },

  props: {
    cards: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data () {
    return {
      columns: {
        before: {
          num: 'col-12',
          push_left: 'off-0',
          push_right: 'off-0'
        },
        after: {
          num: 'col-4',
          push_left: 'off-4',
          push_right: 'off-4'
        }
      },
      previous: {
        type: 'text-only',
        text: 'PREVIOUS',
        theme: 'strong'
      },
      next: {
        type: 'text-only',
        text: 'NEXT',
        theme: 'strong'
      }
    }
  },

  computed: {
    cardList () {
      const cards = this.cards
      if (cards.length < 7) { return [...cards, ...cards] }
      return cards
    }
  },

  methods: {
    getSlotName (index) {
      return `column-${index}`
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.slider-card {
  position: absolute;
  left: 50%;
  top: 0;
  width: toRem(440);
  height: toRem(565);
  opacity: 1;
  transform: translateX(-50%);
  transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
  @include small {
    width: toRem(280);
    height: toRem(358);
  }
  &.delay {
    transition: transform 500ms ease-in-out 40ms, opacity 500ms ease-in-out;
  }
  &.animation-slot-3 {
    transform: translateX(-50%) translateY(45px) rotate(-4deg);
    @include small {
      transform: translateX(-50%) translateY(35px) rotate(-4deg);
    }
  }
  &.animation-slot-5 {
    transform: translateX(-50%) translateY(45px) rotate(4deg);
    @include small {
      transform: translateX(-50%) translateY(35px) rotate(4deg);
    }
  }
  &.animation-slot-0,
  &.animation-slot-1,
  &.animation-slot-2 {
    transform: translateX(-50%) translateY(112px) rotate(-9.2deg);
    @include small {
      transform: translateX(-50%) translateY(86px) rotate(-9.2deg);
    }
  }
  &.animation-slot-6,
  &.animation-slot-7,
  &.animation-slot-8-or-grt {
    transform: translateX(-50%) translateY(112px) rotate(9.2deg);
    @include small {
      transform: translateX(-50%) translateY(86px) rotate(9.2deg);
    }
  }
  &.animation-slot-0,
  &.animation-slot-1,
  &.animation-slot-7,
  &.animation-slot-8-or-grt {
    opacity: 0;
  }
  &.centered {
    &:hover {
      .slide-content {
        transform: scale(1.1);
      }
    }
  }
}

.slide-content {
  width: 100%;
  height: 100%;
  transform: scale(1);
  transition: 250ms ease;
}

:deep(.panel-after) {
  padding: 0 toRem(60);
  @include small {
    padding: 0 1rem;
  }
  .title-matter {
    display: none;
  }
  .slide-selector {
    justify-content: space-between;
  }
  .slider-button {
    padding: 0.75rem 1rem;
    transition: 200ms ease;
    &:hover {
      cursor: pointer;
    }
    &.next {
      &:after {
        transform: translateX(0.125rem);
      }
      &:hover,
      &:focus-visible {
        &:after {
          transform: translateX(0.875rem);
        }
      }
    }
    &.previous {
      flex-direction: row-reverse;
      &:after {
        transform: rotate(180deg) translateX(0.25rem);
      }
      &:hover,
      &:focus-visible {
        &:after {
          transform: rotate(180deg) translateX(0.875rem);
        }
      }
    }
  }
}

</style>
