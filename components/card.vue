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
  @include mini {
    height: toRem(330);
  }
  .sidebar {
    background-color: $color_Secondary;
  }
  .sidebar-image {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: toRem(21);
      left: 1.125rem;
      width: toRem(34);
      height: toRem(34);
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='34' height='34' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M23.6933 20.1554C23.549 20.2986 23.4344 20.469 23.3562 20.6567C23.2779 20.8446 23.2376 21.0461 23.2376 21.2496C23.2376 21.4531 23.2779 21.6546 23.3562 21.8425C23.4345 22.0303 23.5491 22.2008 23.6936 22.3442C23.6936 22.3442 23.6936 22.3442 23.6937 22.3442L25.3199 23.9579L8.62334 23.9579L8.62092 23.9579C8.3471 23.9633 8.07491 23.9146 7.81991 23.8147C7.56491 23.7148 7.33209 23.5656 7.13475 23.3757C6.9374 23.1858 6.7794 22.9589 6.66978 22.7079C6.5603 22.4573 6.50121 22.1876 6.49584 21.9142V18.4163C6.49584 18.0074 6.33342 17.6153 6.0443 17.3261C5.75518 17.037 5.36305 16.8746 4.95418 16.8746C4.5453 16.8746 4.15317 17.037 3.86405 17.3261C3.57494 17.6153 3.41251 18.0074 3.41251 18.4163L3.41251 21.9154L3.41252 21.9165C3.41821 22.5952 3.55754 23.2661 3.82255 23.891C4.08756 24.5159 4.47306 25.0824 4.95703 25.5583C5.441 26.0342 6.01397 26.4101 6.64322 26.6646C7.27233 26.9189 7.94538 27.0469 8.62395 27.0413H25.3199L23.6936 28.655L23.6933 28.6554C23.4031 28.9456 23.24 29.3392 23.24 29.7496C23.24 30.16 23.4031 30.5536 23.6933 30.8438C23.9835 31.134 24.3771 31.2971 24.7875 31.2971C25.1979 31.2971 25.5915 31.134 25.8817 30.8438L30.1314 26.5942C30.1314 26.5941 30.1315 26.594 30.1316 26.5939C30.276 26.4507 30.3906 26.2802 30.4688 26.0925C30.5471 25.9046 30.5874 25.7031 30.5874 25.4996C30.5874 25.2961 30.5471 25.0946 30.4688 24.9067C30.3906 24.7189 30.276 24.5485 30.1316 24.4052C30.1315 24.4052 30.1314 24.4051 30.1314 24.405L25.8821 20.1557C25.882 20.1556 25.8819 20.1556 25.8819 20.1555C25.7386 20.0111 25.5682 19.8965 25.3804 19.8183C25.1925 19.74 24.991 19.6997 24.7875 19.6997C24.584 19.6997 24.3825 19.74 24.1946 19.8183C24.0069 19.8965 23.8365 20.011 23.6933 20.1554ZM23.6933 20.1554C23.6934 20.1552 23.6935 20.1551 23.6937 20.155L23.7817 20.2438L23.6929 20.1557C23.6931 20.1556 23.6932 20.1555 23.6933 20.1554ZM10.2984 11.6554L10.2981 11.655L8.67178 10.0413L25.3683 10.0413L25.3708 10.0412C25.6446 10.0359 25.9168 10.0846 26.1718 10.1845C26.4268 10.2844 26.6596 10.4335 26.8569 10.6234C27.0543 10.8133 27.2123 11.0403 27.3219 11.2912C27.4314 11.5418 27.4905 11.8115 27.4958 12.0849V15.5829C27.4958 15.9918 27.6583 16.3839 27.9474 16.673C28.2365 16.9622 28.6286 17.1246 29.0375 17.1246C29.4464 17.1246 29.8385 16.9622 30.1276 16.673C30.4168 16.3839 30.5792 15.9918 30.5792 15.5829L30.5792 12.0838L30.5792 12.0827C30.5735 11.404 30.4341 10.733 30.1691 10.1082C29.9041 9.48328 29.5186 8.91673 29.0347 8.44084C28.5507 7.96496 27.9777 7.58907 27.3485 7.33462C26.7194 7.08025 26.0463 6.95225 25.3678 6.95792H8.67178L10.298 5.34417C10.298 5.34416 10.2981 5.34416 10.2981 5.34415C10.4425 5.20084 10.5572 5.03033 10.6355 4.84248C10.7138 4.65461 10.7541 4.45311 10.7541 4.24959C10.7541 4.04607 10.7138 3.84457 10.6355 3.6567C10.5573 3.46899 10.4427 3.29861 10.2984 3.15537C10.1552 3.01104 9.98478 2.89647 9.79707 2.81827C9.6092 2.74 9.4077 2.69971 9.20418 2.69971C9.00066 2.69971 8.79916 2.74 8.61129 2.81827C8.42351 2.8965 8.25308 3.01112 8.1098 3.15552C8.10973 3.15559 8.10966 3.15566 8.10959 3.15573L3.86032 7.405C3.86025 7.40507 3.86018 7.40514 3.86011 7.40521C3.71571 7.54849 3.60109 7.71892 3.52286 7.9067C3.44459 8.09456 3.4043 8.29607 3.4043 8.49959C3.4043 8.70311 3.44459 8.90461 3.52286 9.09248C3.60109 9.28025 3.71571 9.45069 3.86011 9.59396C3.86018 9.59403 3.86025 9.5941 3.86032 9.59417L8.10996 13.8438C8.40016 14.134 8.79377 14.2971 9.20418 14.2971C9.61459 14.2971 10.0082 14.134 10.2984 13.8438C10.5886 13.5536 10.7516 13.16 10.7516 12.7496C10.7516 12.3392 10.5886 11.9456 10.2984 11.6554Z' fill='%23E5E5E5' stroke='%231A1A1A' stroke-width='0.25'/%3e%3c/svg%3e ");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      @include mini {
        width: toRem(26);
        height: toRem(26);
        left: 0.875rem;
        bottom: 0.875rem;
      }
    }
  }
  .card-content {
    padding: 1.5rem toRem(19);
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
</style>
