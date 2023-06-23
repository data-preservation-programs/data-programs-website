<template>
  <div :class="['card', `type__${type}`, `theme__${theme}`, flipped]">

    <div
      :class="['sidebar', { 'sidebar-image': sidebarImage }]"
      :style="sidebarImage">

      <div
        v-if="sidebarText"
        class="sidebar-text">
        <span>
          {{ sidebarText.toUpperCase() }}
        </span>
      </div>

      <Button
        v-if="sidebarImage && reverseImg"
        :button="{ text: '' }"
        @click.native="flipCard">
        <div class="card-toggle">
          <FlipIcon />
        </div>
      </Button>

    </div>

    <div
      v-if="reverseImg"
      class="reverse-image"
      :style="{ 'background-image': `url(${reverseImg})` }">
    </div>

    <div class="card-content">

      <div
        v-if="type !== 'person'"
        class="image"
        :style="headerImage">
        <img
          v-if="logo"
          :src="logo"
          :class="['logo', logoTitle]" />
      </div>

      <div class="title">
        {{ title }}
      </div>

      <div class="description">
        {{ description }}
      </div>

      <div class="button-row">
        <Button
          v-for="cta in ctas"
          :key="cta.text"
          :button="cta">
        </Button>
      </div>
      
    </div>

  </div>
</template>

<script>
// ====================================================================== Import
import Button from '@/components/button'
import FlipIcon from '@/components/svgs/flip-icon'

// ====================================================================== Export
export default {
  name: 'Card',

  components: {
    Button,
    FlipIcon
  },

  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  data () {
    return {
      flipped: ''
    }
  },

  computed: {
    type () {
      return this.card.type
    },
    image () {
      return this.card.img
    },
    logo () {
      return this.type === 'project' ? this.card.logo : false
    },
    title () {
      return this.card.title
    },
    logoTitle () {
      return this.title.toLowerCase().replaceAll(' ', '-').replaceAll('.', '-')
    },
    description () {
      return this.card.description
    },
    sidebarImage () {
      return this.type !== 'slider' && this.image ? { 'background-image': `url(${this.image})` } : false
    },
    sidebarText () {
      if (this.card.sidebar_text) { return this.card.sidebar_text }
      return Array(10).fill(this.title).join(' ')
    },
    headerImage () {
      return this.type === 'slider' ? { 'background-image': `url(${this.image})` } : null
    },
    ctas () {
      return this.card.ctas ? this.card.ctas : []
    },
    theme () {
      return this.card.theme
    },
    reverseImg () {
      return this.card.reverse_img
    }
  },

  methods: {
    flipCard () {
      if (this.flipped !== 'flipped') {
        this.flipped = 'flipped'
      } else {
        this.flipped = 'unflipped'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.card {
  display: flex;
  height: toRem(430);
}

.sidebar-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-overflow: clip;
  white-space: nowrap;
  height: 100%;
  overflow: hidden;
  @include textOutlineLight;
  font-family: $font_Secondary;
  @include fontWeight_Bold;
  line-height: leading(33, 29);
  letter-spacing: 0.1em;
  font-size: toRem(29);
  @include mini {
    font-size: toRem(22);
  }
}

.sidebar-image,
.image {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-flex: 1;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.theme__mini-card {
  .description {
    -webkit-line-clamp: 2;
  }
}
// ////////////////////////////////////////////////////////////////////// Shared
.card.type__project,
.card.type__slider {
  border: solid 2px $color_Accent;
  border-radius: 0.625rem;
  background-color: $color_Primary;
  overflow: hidden;
  @include mini {
    border: solid 1.5px $color_Accent;
  }
  .sidebar {
    padding: toRem(14) toRem(17);
    width: toRem(70);
    height: calc(100% + 2px);
    border-right: solid 2px $color_Accent;
    @include mini {
      border-right: solid 1.5px $color_Accent;
      width: toRem(53);
      padding: toRem(14) toRem(12);
    }
  }
  .card-content {
    display: flex;
    flex-direction: column;
    width: calc(100% - 70px);
    @include mini {
      width: calc(100% - 48px);
    }
  }
  .button-row {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
  }
}
// ////////////////////////////////////////////////////////////// Type [Project]
.card.type__project {
  position: relative;
  @include mini {
    height: toRem(330);
  }
  .sidebar {
    position: relative;
    background-color: $color_Secondary;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      background-color: $color_Primary;
      transition: 1ms linear 350ms;
    }
  }
  .sidebar-image {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .sidebar-text {
      transition: 1ms linear 350ms;
      height: calc(100% - 52px);
      opacity: 0;
    }
    .card-toggle {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 100%;
      height: 100%;
    }
  }
  .card-content {
    position: relative;
    padding: 1.5rem toRem(19);
    z-index: 2;
  }
  .image {
    width: toRem(130);
    height: toRem(77);
    margin-bottom: toRem(58);
    @include mini {
      margin-bottom: toRem(21);
    }
  }
  .logo {
    width: unset;
    height: 100%;
    &:not(.filplus-storage) {
      padding: 0.9375rem 0;
    }
    &.moonlanding {
      padding: 1.25rem 0;
    }
  }
  .title {
    @include h3;
    margin-bottom: toRem(15);
    @include mini {
      margin-bottom: 0.375rem;
    }
  }
  .description {
    @include p2;
  }
  .button-row {
    :deep(.button) {
      @include medium {
        .text {
          @include fontSize_Mini;
        }
      }
    }
  }
  &.theme__mini-card {
    height: toRem(200);
    &:not(:last-child) {
      margin-bottom: toRem(27);
      @include mini {
        margin-bottom: 1rem;
      }
    }
    @include mini {
      height: toRem(168);
    }
    .image {
      display: none;
    }
  }
  :deep(.flip-icon) {
    transition: 200ms ease;
    @include mini {
      width: toRem(26);
    }
    &:hover {
      transform: scale(1.1);
    }
    path {
      transition: 1ms linear 350ms;
    }
  }
  &.flipped {
    animation-name: flipToFront;
    animation-duration: 700ms;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    .reverse-image {
      z-index: 10;
      opacity: 1;
    }
    .sidebar {
      &:before {
        opacity: 1;
      }
      .sidebar-text {
        opacity: 1;
        -webkit-text-stroke-color: transparent;
      }
    }
    :deep(.flip-icon) {
      path {
        fill: $color_Secondary;
      }
    }
  }
  &.unflipped {
    animation-name: flipToBack;
    animation-duration: 700ms;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}

.reverse-image {
  position: absolute;
  left: toRem(70);
  top: 0;
  width: calc(100% - 68px);
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  transition: 1ms linear 350ms;
  opacity: 0;
  @include mini {
    left: toRem(53);
    width: calc(100% - 45px);
  }
}

// /////////////////////////////////////////////////////////////// Type [Slider]
.card.type__slider {
  width: 100%;
  height: 100%;
  .sidebar {
    @include small {
      border-right: solid 1.5px $color_Accent;
      width: toRem(53);
      padding: toRem(14) toRem(12);
    }
  }
  .sidebar-text {
    @include textOutlineDark;
    @include small {
      font-size: toRem(22);
    }
  }
  .card-content {
    padding-bottom: toRem(17);
    @include small {
      padding-bottom: toRem(5);
      width: calc(100% - 48px);
    }
  }
  .image {
    width: calc(100% + 2px);
    height: toRem(195);
    margin-bottom: toRem(40);
    @include small {
      height: toRem(125);
      margin-bottom: toRem(19);
    }
  }
  .title,
  .description,
  .button-row {
    padding: 0 toRem(19);
    @include small {
      padding: 0 0.75rem;
    }
  }
  .title {
    @include fontSize_Large; // 24px
    @include fontWeight_Medium; // 500
    font-family: $font_Primary;
    line-height: leading(36, 24);
    margin-bottom: 1.375rem;
    @include small {
      @include fontSize_Mini; // 14px
      line-height: leading(23, 14);
      margin-bottom: 0.625rem;
    }
  }
  .description {
    @include p2;
    @include small {
      @include fontSize_Tiny;
    }
  }
  .button-row {
    @include small {
      margin-top: 0;
    }
    :deep(.button) {
      padding-left: 0;
      .text {
        @include small {
          @include fontSize_Tiny;
        }
      }
    }
  }
}
// /////////////////////////////////////////////////////////////// Type [Person]
.card.type__person {
  height: unset;
  padding: toRem(49) 0;
  flex-direction: column;
  @include itemDivider;
  .sidebar-image {
    width: toRem(75);
    height: toRem(75);
    border-radius: 50%;
    margin-bottom: toRem(13);
  }
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 75%;
  }
  .title {
    @include h3;
    margin-bottom: toRem(3);
    @include medium {
      padding-right: 1rem;
    }
  }
  .description {
    @include p1;
    @include medium {
      padding-right: 1rem;
    }
  }
  .button-row {
    display: none;
  }
}

// ////////////////////////////////////////////////////////////////// Animations
@keyframes flipToFront {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes flipToBack {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes revealImage {
  0% {
    z-index: -1;
  }
  100% {
    z-index: 10;
  }
}
</style>
