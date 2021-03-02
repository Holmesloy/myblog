<script>
import { isActive } from '@theme/helpers/utils'

export default {
  computed: {
    headers () {
      return this.$showSubSideBar ? this.$page.headers : []
    }
  },
  methods: {
    isLinkActive (header) {
      const active = isActive(this.$route, this.$page.path + '#' + header.slug)
      if (active) {
        setTimeout(() => {
          document.querySelector(`.reco-${header.slug}`).scrollIntoView()
        }, 300)
      }
      return active
    }
  },
  render (h) {
    return h('ul', {
      class: { 'sub-sidebar-wrapper': true },
      style: { width: this.headers.length > 0 ? '12rem' : '0' }
    }, [
      ...this.headers.map(header => {
        return h('li', {
          class: {
            active: this.isLinkActive(header),
            [`level-${header.level}`]: true
          },
          attr: { key: header.title }
        }, [
          h('router-link', {
            class: { 'sidebar-link': true, [`reco-${header.slug}`]: true },
            props: { to: `${this.$page.path}#${header.slug}` }
          }, header.title)
        ])
      })
    ])
  }
}

</script>

<style lang="stylus" scoped>
.sub-sidebar-wrapper
  width 16rem !important
  padding-left 0
  list-style none
  font-size 12px
  li
    padding .1rem 0
    cursor pointer
    border-left 3px solid var(--border-color)
    a
      padding 0.2rem 1rem 0.2rem 0rem
      color var(--text-color)
    &:hover
      a
       color $accentColor
    &.active
      border-left 3px solid $accentColor
      a
       color $accentColor
    &.level-1
      padding-left .1rem
    &.level-2
      padding-left .5rem
      a
       font-size 1.4em
    &.level-3
      padding-left 2rem
      a
       line-height 1.5
</style>

