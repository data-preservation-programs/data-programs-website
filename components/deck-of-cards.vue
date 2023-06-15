<template>
  <div class="deck-of-cards-slider">

    <CircularSlider
      :grid-cols="columns"
      :reverse-grid="true"
      :collection="collection"
      :display-options="{ default: 5 }">

      <template
        v-for="(slide, i) in collection"
        #[getSlotName(i)]="{ classlist }">
        <div
          :key="`slide-${i}`"
          :class="['slider-card', classlist]">
          <div
            class="content"
            :style="{ 'background-color': slide.color }">
          </div>
        </div>
      </template>

      <template #icon-previous>
        <div class="slider-button previous">
          prev
        </div>
      </template>

      <template #icon-next>
        <div class="slider-button next">
          next
        </div>
      </template>

    </CircularSlider>

  </div>
</template>

<script>
// ====================================================================== Import
import CircularSlider from '@/components/circular-slider'

// ====================================================================== Export
export default {
  name: 'DeckOfCards',

  components: {
    CircularSlider
  },

  data () {
    return {
      collection: [
        { content: 'content', color: '#C78283' },
        { content: 'content', color: '#F3D9DC' },
        { content: 'content', color: '#d17780' },
        { content: 'content', color: '#68b097' },
        { content: 'content', color: '#b88184' },
        { content: 'content', color: '#845660' },
        { content: 'content', color: '#e68781' },
        { content: 'content', color: '#7ca1c4' },
        { content: 'content', color: '#c47cbc' }
      ],
      columns: {
        before: {
          num: 'col-8',
          push_left: 'off-2',
          push_right: 'off-2'
        },
        after: {
          num: 'col-4',
          push_left: 'off-4',
          push_right: 'off-4'
        }
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
.deck-of-cards-slider {
  padding-bottom: 10rem;
}

.slider-card {
  position: absolute;
  left: 50%;
  top: 0;
  width: 280px;
  height: 420px;
  transform: translateX(-50%);
  transition: transform 250ms ease;
  &.delay {
    transition: transform 250ms ease 250ms;
  }
  &.animation-slot-3 {
    transform: translateX(-50%) translateY(40px) rotate(-5deg);
  }
  &.animation-slot-5 {
    transform: translateX(-50%) translateY(40px) rotate(5deg);
  }
  &.animation-slot-0,
  &.animation-slot-1,
  &.animation-slot-2 {
    transform: translateX(-50%) translateY(80px) rotate(-10deg);
  }
  &.animation-slot-6,
  &.animation-slot-7,
  &.animation-slot-8-or-grt {
    transform: translateX(-50%) translateY(80px) rotate(10deg);
  }
  &.animation-slot-0,
  &.animation-slot-1,
  &.animation-slot-7,
  &.animation-slot-8-or-grt {
    opacity: 0;
  }
  &.centered {
    &:hover {
      .content {
        transform: scale(1.1);
      }
    }
  }
}

.content {
  width: 100%;
  height: 100%;
  border: solid 1px black;
  border-radius: 0.25rem;
  transform: scale(1);
  transition: 250ms ease;
}

:deep(.panel-after) {
  .slide-selector {
    justify-content: space-between;
  }
  .slider-button {
    padding: 0.25rem 2.5rem;
    border-radius: 0.125rem;
    border: solid 1px rgba(0, 0, 0, 0.1);
    transition: 200ms ease;
    &:hover {
      cursor: pointer;
      border: solid 1px rgba(0, 0, 0, 1);
    }
  }
}

</style>
