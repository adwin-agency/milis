<template>
  <div class="our-products">
    <div class="row">
      <div class="col col-12">
        <div class="row">
          <div class="col col-12">
            <Header
              class="slide-down js-anim"
              v-anim="true"
            />
          </div>
        </div>
        <div
          class="our-products__wrapper fade-bounce-right js-anim"
          v-anim="true"
        >
          <h1 class="our-products__heading">{{ heading }}</h1>
          <DiscountBanner class="our-products__banner" />
          <div class="our-products__menu">
            <div class="our-products__menu-header">
              <p class="our-products__menu-title">Фильтры</p>
              <button
                v-if="!$mobile"
                class="our-products__reset"
                @click="handleReset"
              >
                Сбросить фильтры
              </button>
            </div>
            <FilterMenu
              class="our-products__menu-items"
              filterType="catalog"
            />
            <div class="our-products__select">
              <Select
                :key="selectKey"
                id="sort-select"
                :options="sortOptions"
                :initial="initialSort"
                @changeSelect="handleSortChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterMenu from '@/components/base/FilterMenu'
import Header from '@/components/Header'
import DiscountBanner from '@/components/DiscountBanner'
import Select from './base/Select.vue'

export default {
  name: 'OurProducts',
  components: {
    FilterMenu,
    Header,
    DiscountBanner,
    Select
  },
  data() {
    return {
      sortOptions: [
        { title: 'Сначала популярные', value: 'default' },
        { title: 'Сначала дешeвле', value: 'price_min' },
        { title: 'Сначала дороже', value: 'price_max' }
      ],
      selectKey: 0
    }
  },
  computed: {
    categories() {
      return this.$store.state.kitchenCategories
    },
    activeCategoryUrl() {
      return this.$route.params.category
    },
    heading() {
      const activeCategory = this.categories?.find(
        item => item.url === this.activeCategoryUrl
      )
      return activeCategory?.name2 ?? 'Наши кухни'
    },
    initialSort() {
      return this.sortOptions.find(item => item.value === this.$route.query.sort) ? this.$route.query.sort : 'default'
    }
  },
  methods: {
    handleSortChange({ value }) {
      const { name, params, query } = this.$route

      if (query.sort === value || !query.sort && value === 'default') {
        return
      }

      this.$router.push({
        name,
        params,
        query: { ...query, sort: value === 'default' ? undefined : value }
      })

      window.ym && window.ym(73257226, 'reachGoal', 'sort_' + value)
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ 'event': 'sort_' + value })
    },
    handleReset() {
      if (
        this.$route.name === 'catalog' &&
        Object.keys(this.$route.query).length === 0
      ) {
        return
      }
      this.$router.push({ name: 'catalog' })
      this.selectKey++
    }
  }
}
</script>

<style lang="scss">
.our-products {
  padding-top: 26px;

  &__heading {
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 40px;
    line-height: 1.15;
    color: $color-blue;
  }

  &__banner {
    margin: 20px (-$container-padding) 0;
  }

  &__menu {
    position: relative;
    margin: 30px (-$container-padding) 0;
    padding: 20px 0;
    background-color: #f3f3f3;

    &-header {
      font-family: $font-secondary;
    }

    &-title {
      margin: 0 10px;
      font-weight: 700;
      font-size: 20px;
      line-height: 120%;
      color: $color-blue;
    }

    &-items {
      margin: 5px -10px 0;
      overflow: hidden;
    }
  }

  &__discount {
    margin: 26px (-$container-padding) 0;
    color: $color-blue;
    text-align: right;
    font-family: $font-secondary;
    background: #f3f3f3;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    &-img {
      width: auto;
      height: 100px;
    }

    &-content {
      padding: 20px;
    }

    &-title {
      position: relative;
      font-weight: 700;
      font-size: 16px;
      line-height: 100%;
    }

    &-desc {
      position: relative;
      margin-top: 11px;
      font-weight: 500;
      font-size: 12px;
      line-height: 110%;
    }
  }

  &__features {
    margin-top: 25px;
  }

  &__select {
    margin: 20px 10px 0;
  }

  @include media(xs) {
    &__heading {
      font-size: 48px;
    }

    &__discount {
      position: relative;
      height: 130px;

      &-img {
        position: absolute;
        right: 270px;
        top: 0;
        height: 100%;
      }

      &-content {
        margin-left: auto;
        max-width: 300px;
      }
    }
  }

  @include media(480) {
    &__discount {
      &-img {
        left: -15px;
        right: auto;
      }

      &-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: none;
        height: 100%;
        padding-left: 260px;
      }
    }
  }

  @include media(sm) {
    &__discount {
      &-title {
        font-size: 18px;
      }

      &-desc {
        font-size: 14px;
      }
    }
  }

  @include media(md) {
    padding-top: 30px;

    &__heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 50px;
      line-height: (69/50);
    }

    &__banner {
      margin: 20px (-$container-padding-md) 0;
    }

    &__menu {
      margin: 30px (-$container-padding-md) 0;

      &-title {
        margin: 0 30px;
      }

      &-items {
        margin: 10px 0;
      }
    }

    &__discount {
      &-content {
        max-width: 720px;
      }

      &-title {
        font-size: 20px;
      }
    }

    &__features {
      margin-top: 28px;
    }

    &__select {
      margin: 20px $container-padding-md 0;
    }
  }

  @include media(lg) {
    &__heading {
      font-size: 40px;
    }

    &__banner {
      margin: 20px 0 0;
    }

    &__menu {
      display: flex;
      margin: 30px 0 0;
      padding: 40px 30px 30px;

      &-header {
        margin-right: 20px;
      }

      &-title {
        margin: 0;
        margin-bottom: 5px;
        font-size: 30px;
      }

      &-items {
        margin: 0;
        padding-bottom: 2px;
      }
    }

    &__reset {
      font-size: 16px;
      line-height: 150%;
      text-decoration: underline;
      color: $color-blue;
    }

    &__discount {
      margin: 26px 0 0;

      &-img {
        left: 0;
      }

      &-content {
        max-width: 650px;
        padding-left: 280px;
      }

      &-title {
        font-size: 18px;
      }
    }

    &__features {
      margin-top: 30px;
    }

    &__select {
      margin: 0;
      margin-left: auto;
      width: 330px;
    }
  }

  @include media(xl) {
    &__wrapper {
      margin-right: -35px;
    }

    &__working + &__menu {
      margin-top: 25px;
    }

    &__menu {
      &::before {
        left: -$container-padding-xl;
        width: $container-padding-xl;
      }
    }

    &__heading {
      font-size: 50px;
      line-height: (69/50);
    }

    &__image {
      width: 38.5%;
    }

    &__discount {
      height: 165px;

      &-content {
        max-width: 730px;
        padding-left: 350px;
      }

      &-title {
        font-size: 22px;
      }
    }

    &__features {
      margin-top: 75px;
      margin-right: 80px;
    }

    &__card-wrap {
      margin-top: 70px;
      margin-left: 65px;
    }

    &__leaf {
      left: -38px;
      top: -14px;
      width: 80px;
      height: 80px;
    }
  }
}
</style>
