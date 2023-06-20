<template>
  <div :class="['card', `type__${type}`, `theme__${theme}`]">

    <div
      :class="['sidebar', { 'sidebar-image': sidebarImage }]"
      :style="sidebarImage">
      <div
        v-if="sidebarText && !sidebarImage"
        class="sidebar-text">
        <span>
          {{ sidebarText.toUpperCase() }}
        </span>
      </div>
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

// ====================================================================== Export
export default {
  name: 'Card',

  components: {
    Button
  },

  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({})
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
  margin: auto;
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
}

.sidebar-image,
.image {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
// ////////////////////////////////////////////////////////////////////// Shared
.card.type__project,
.card.type__slider {
  border: solid 2px $color_Accent;
  border-radius: 0.625rem;
  background-color: $color_Primary;
  overflow: hidden;
  .sidebar {
    padding: toRem(14) toRem(17);
    width: toRem(70);
    height: calc(100% + 2px);
    border-right: solid 2px $color_Accent;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    width: calc(100% - 70px);
  }
  .button-row {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
  }
}
// ////////////////////////////////////////////////////////////// Type [Project]
.card.type__project {
  .sidebar {
    background-color: $color_Secondary;
  }
  .card-content {
    padding: 1.5rem toRem(19);
  }
  .image {
    width: toRem(130);
    height: toRem(77);
    margin-bottom: toRem(58);
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
  }
  .description {
    @include p2;
  }
  &.theme__mini-card {
    height: toRem(200);
    &:not(:last-child) {
      margin-bottom: toRem(27);
    }
    .image {
      display: none;
    }
  }
}

// /////////////////////////////////////////////////////////////// Type [Slider]
.card.type__slider {
  width: 100%;
  height: 100%;
  .sidebar-text {
    @include textOutlineDark;
  }
  .card-content {
    padding-bottom: toRem(17);
  }
  .image {
    width: calc(100% + 2px);
    height: toRem(195);
    margin-bottom: toRem(40);
  }
  .title,
  .description,
  .button-row {
    padding: 0 toRem(19);
  }
  .title {
    @include fontSize_Large; // 24px
    @include fontWeight_Medium; // 500
    font-family: $font_Primary;
    line-height: leading(36, 24);
    margin-bottom: 1.375rem;
    @include mini {
      @include fontSize_Mini; // 14px
      line-height: leading(23, 14);
      margin-bottom: 0.625rem;
    }
  }
  .description {
    @include p2;
  }
}
</style>
