<template>
  <div class="master-container">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',

  watch: {
    '$route.hash' () {
      this.scrollToHash()
    }
  },

  mounted () {
    // Scroll to hash
    this.$nextTick(() => {
      this.scrollToHash()
    })
  },

  methods: {
    scrollToHash () {
      const hash = this.$route.hash.replace('#', '')
      if (hash) {
        const element = document.getElementById(hash) || document.querySelector(`[data-id='${hash}']`)
        if (element) {
          this.$scrollToElement(element, 200, -100)
        }
      }
    }
  }
}
</script>
