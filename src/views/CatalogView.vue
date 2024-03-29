<template>
  <Page v-if="kitchens">
    <div class="v-catalog">
      <div class="container">
        <OurProducts class="v-catalog__our-products" />
        <Divider
          v-if="!$mobile"
          class="v-catalog__divider-1 scale-right js-anim"
          v-anim="true"
        />
        <Catalog
          class="v-catalog__catalog"
          :kitchens="kitchens"
        />
        <Divider
          v-if="$windowWidth >= $breakpoints.md"
          class="v-catalog__divider-2 scale-right js-anim"
          v-anim="true"
        />
        <NavPanel
          class="v-catalog__nav-panel"
          navType="catalog"
        >
          <template #navigation>
            <Pagination
              v-if="isPagination"
              :pages="pages"
              :activePage="activePage"
              @changePage="changePage"
            />
            <Button
              v-else-if="activePage > 1 && activePage < pages"
              class="nav-panel__btn"
              @click.native="showMore"
            >
              Показать еще
            </Button>
          </template>
        </NavPanel>
      </div>
    </div>
  </Page>
</template>

<script>
import store from '@/store'
import Divider from '@/components/base/Divider'
import Pagination from '@/components/base/Pagination'
import Page from '@/components/Page'
import OurProducts from '@/components/OurProducts'
import Catalog from '@/components/Catalog'
import NavPanel from '@/components/NavPanel'
import Button from '@/components/base/Button'

export default {
  name: 'CatalogView',
  components: {
    Divider,
    Pagination,
    Page,
    OurProducts,
    Catalog,
    NavPanel,
    Button
  },
  data() {
    return {
      activePage: 1,
      isMediaSm: null,
      isLoading: false
    }
  },
  computed: {
    kitchens() {
      return this.$store.state.catalogKitchens
    },
    pages() {
      return this.$store.state.catalogPages
    },
    kitchenCategory() {
      return this.$route.params.category
    },
    kitchenStyle() {
      return this.$route.query.style
    },
    kitchenSort() {
      return this.$route.query.sort
    },
    isPagination() {
      return this.$windowWidth >= this.$breakpoints.md
    }
  },
  beforeRouteEnter(to, from, next) {
    const category = to.params.category
    const style = to.query.style
    const sort = to.query.sort

    store
      .dispatch('loadCatalogKitchens', { category, style, sort })
      .then(() => next(vm => (vm.activePage = 1)))
  },
  beforeRouteUpdate(to, from, next) {
    const category = to.params.category
    const style = to.query.style
    const sort = to.query.sort

    console.log('updated')

    store
      .dispatch('loadCatalogKitchens', { category, style, sort })
      .then(() => {
        this.activePage = 1
        next()
      })
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)
    this.isMediaSm = this.$windowWidth < this.$breakpoints.md
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    changePage(num) {
      const menu = document.querySelector('.our-products__menu')
      const header = document.querySelector('.header')
      const targetY = menu.getBoundingClientRect().top + window.scrollY - header.offsetHeight

      window.scrollTo({ top: targetY, behavior: 'smooth' })
      store
        .dispatch('loadCatalogKitchens', {
          category: this.kitchenCategory,
          page: num,
          style: this.kitchenStyle,
          sort: this.kitchenSort
        })
        .then(() => (this.activePage = num))
    },
    showMore() {
      if (this.isLoading) {
        return
      }

      this.isLoading = true
      store
        .dispatch('loadMoreKitchens', {
          category: this.kitchenCategory,
          page: this.activePage + 1,
          style: this.kitchenStyle,
          sort: this.kitchenSort
        })
        .then(() => {
          this.activePage++
          this.isLoading = false
        })
    },
    handleResize() {
      if (this.isMediaSm !== this.$windowWidth < this.$breakpoints.md) {
        this.isMediaSm = this.$windowWidth < this.$breakpoints.md
        this.$router.go()
      }
    },
    handleScroll() {
      if (this.isPagination || this.activePage > 2 || this.isLoading) {
        return
      }

      const catalog = document.querySelector('.v-catalog__catalog')

      if (
        catalog.getBoundingClientRect().bottom - window.innerHeight * 2 <=
        0
      ) {
        this.showMore()
      }
    }
  }
}
</script>

<style lang="scss">
.v-catalog {
  &__our-products {
    margin-bottom: 30px;
  }

  &__divider-2 {
    margin-bottom: 20px;
  }

  &__nav-panel {
    margin-bottom: 70px;
  }

  @include media(md) {
    &__our-products {
      margin-bottom: 50px;
    }

    &__catalog {
      margin-bottom: 17px;
    }

    &__divider-2 {
      margin-bottom: 40px;
    }
  }

  @include media(lg) {
    &__our-products {
      margin-bottom: 60px;
    }

    &__divider-1 {
      margin-bottom: 40px;
    }

    &__catalog {
      margin-bottom: 0;
    }
  }

  @include media(xl) {
    &__divider-1 {
      margin-bottom: 60px;
    }

    &__nav-panel {
      margin-bottom: 90px;
    }
  }
}
</style>
