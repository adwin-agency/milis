<template>
  <Page v-if="kitchens">
    <div class="v-catalog">
      <div class="container">
        <OurProducts class="v-catalog__our-products"/>
        <Divider
          v-if="!$mobile && kitchens.length > 1"
          class="v-catalog__divider-1 scale-right js-anim"
          v-anim="true"
        />
        <Catalog
          class="v-catalog__catalog"
          :kitchens="$mobile ? kitchens : kitchens.slice(1)"
        />
        <Divider class="v-catalog__divider-2 scale-right js-anim" v-anim="true" />
        <NavPanel
          class="v-catalog__nav-panel"
          navType="catalog"
        >
          <template v-slot:pagination>
            <Pagination
              :pages="pages"
              :activePage="activePage"
              @changePage="changePage"
            />
          </template>
        </NavPanel>
      </div>
    </div>
  </Page>
</template>

<script>
import Divider from '@/components/base/Divider'
import Pagination from '@/components/base/Pagination'
import Page from '@/components/Page'
import OurProducts from '@/components/OurProducts'
import Catalog from '@/components/Catalog'
import NavPanel from '@/components/NavPanel'
import store from '@/store'

export default {
  name: 'CatalogView',
  components: {
    Divider,
    Pagination,
    Page,
    OurProducts,
    Catalog,
    NavPanel
  },
  data() {
    return {
      activePage: 1
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
    }
  },
  beforeRouteEnter(to, from, next) {
    const category = to.params.category
    const style = to.query.style

    store.dispatch('loadCatalogKitchens', {category, style})
      .then(() => next(vm => vm.activePage = 1))
  },
  beforeRouteUpdate(to, from, next) {
    const category = to.params.category
    const style = to.query.style

    store.dispatch('loadCatalogKitchens', {category, style})
      .then(() => next(vm => vm.activePage = 1))
  },
  methods: {
    changePage(num) {
      window.scrollTo({top: 0, behavior: 'smooth'})
      store.dispatch('loadCatalogKitchens', {page: num, category: this.kitchenCategory, style: this.kitchenStyle})
        .then(() => this.activePage = num)
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
