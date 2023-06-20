<template>
  <div class="deck-of-cards-slider">

    <CircularSlider
      :grid-cols="columns"
      :reverse-grid="true"
      :collection="cards"
      :display-options="{ default: 5 }">

      <template
        v-for="(card, i) in cards"
        #[getSlotName(i)]="{ classlist }">
        <div
          :key="`slide-${i}`"
          :class="['slider-card', classlist]">
          <Card :card="card" class="slide-content" />
          <!--           <div
            class="content"
            :style="{ 'background-color': card.color }">
          </div> -->
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
</template>

<script>
// ====================================================================== Import
import CircularSlider from '@/components/circular-slider'
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
  transform: translateX(-50%);
  transition: transform 250ms ease;
  &.delay {
    transition: transform 250ms ease 250ms;
  }
  &.animation-slot-3 {
    transform: translateX(-50%) translateY(45px) rotate(-4deg);
  }
  &.animation-slot-5 {
    transform: translateX(-50%) translateY(45px) rotate(4deg);
  }
  &.animation-slot-0,
  &.animation-slot-1,
  &.animation-slot-2 {
    transform: translateX(-50%) translateY(112px) rotate(-9.2deg);
  }
  &.animation-slot-6,
  &.animation-slot-7,
  &.animation-slot-8-or-grt {
    transform: translateX(-50%) translateY(112px) rotate(9.2deg);
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
  .title-matter {
    display: none;
  }
  .slide-selector {
    justify-content: space-between;
  }
  .slider-button {
    transition: 200ms ease;
    &:hover {
      cursor: pointer;
    }
    &.previous {
      flex-direction: row-reverse;
    }
  }
}

</style>