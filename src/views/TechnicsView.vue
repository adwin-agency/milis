<template>
  <Page v-if="technics">
    <div class="v-technics">
      <div class="container">
        <Technics
          class="v-technics__technics"
          :info="technicsInfo"
        />
        <TechnicsList
          class="v-technics__technics-list"
          :technics="technics"
        />
        <Divider class="v-technics__divider scale-right js-anim" v-anim="true" />
        <NavPanel
          class="v-technics__nav-panel"
          navType="technics"
        >
          <template v-slot:pagination>
            <Pagination
              :pages="technicsPages"
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
import Technics from '@/components/Technics'
import TechnicsList from '@/components/TechnicsList'
import NavPanel from '@/components/NavPanel'
import store from '@/store'

export default {
  name: 'TechnicsView',
  components: {
    Divider,
    Pagination,
    Page,
    Technics,
    TechnicsList,
    NavPanel
  },
  data() {
    return {
      activePage: 1
    }
  },
  computed: {
    technics() {
      return this.$store.state.technics
    },
    technicsInfo() {
      return this.$store.state.technicsInfo
    },
    technicsPages() {
      return this.$store.state.technicsPages
    },
    technicsCategory() {
      return this.$route.params.category
    }
  },
  beforeRouteEnter(to, from, next) {
    const category = to.params.category

    store.dispatch('loadTechnics', {category})
      .then(() => next(vm => vm.activePage = 1))
  },
  beforeRouteUpdate(to, from, next) {
    const category = to.params.category

    store.dispatch('loadTechnics', {category})
      .then(() => next(vm => vm.activePage = 1))
  },
  methods: {
    changePage(num) {
      window.scrollTo({top: 0, behavior: 'smooth'})
      store.dispatch('loadTechnics', {page: num, category: this.technicsCategory})
        .then(() => this.activePage = num)
    }
  }
}
</script>

<style lang="scss">
.v-technics {
  &__technics {
    margin-bottom: 40px;
  }

  &__technics-list {
    margin-bottom: 75px;
  }

  &__divider {
    margin-bottom: 20px;
  }

  &__nav-panel {
    margin-bottom: 60px;
  }

  @include media(md) {
    &__technics {
      margin-bottom: 0;
    }

    &__technics-list {
      margin-bottom: 70px;
    }

    &__divider {
      margin-bottom: 40px;
    }
  }

  @include media(lg) {
    &__technics {
      margin-bottom: 36px;
    }

    &__technics-list {
      margin-bottom: 55px;
    }

    &__nav-panel {
      margin-bottom: 70px;
    }
  }

  @include media(xl) {
    &__technics {
      margin-bottom: 60px;
    }

    &__technics-list {
      margin-bottom: 115px;
    }

    &__nav-panel {
      margin-bottom: 90px;
    }
  }
}
</style>
