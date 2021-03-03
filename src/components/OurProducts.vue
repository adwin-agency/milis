<template>
  <div class="our-products page-top">
    <div class="row">
      <div class="col col-12 col-lg-6">
        <div class="row">
          <div class="col col-12 col-xl-10">
            <Header
              v-if="$mobile"
              class="page-header-sticky"
              :class="{'is-fixed': fixedHeader}"
              filters
              @openFilters="toggleFilters"
            />
            <Header
              v-else
              class="page-header fade-slide-down js-anim"
              v-anim="true"
            />
          </div>
        </div>
        <div class="our-products__wrapper fade-bounce-right js-anim" v-anim="true">
          <FilterMenu
            class="our-products__menu"
            filterType="catalog"
          />
          <h1 class="our-products__heading">{{heading}}</h1>
          <FilterTags
            v-if="!$mobile"
            class="our-products__tags"
            :tags="tags"
            :activeTag="activeTag"
            @deselectTag="deselectTag"
          />
          <div class="our-products__items">
            <div class="our-products__image">
              <picture>
                <source srcset="@/assets/img/our-products-md.jpg" :media="'(min-width: ' + $breakpoints.md + 'px)'">
                <source srcset="@/assets/img/our-products.jpg">                
                <img src="@/assets/img/our-products-md.jpg" alt="">
              </picture>
            </div>
            <div class="our-products__content">
              <p class="our-products__quote">“Создать кухню Вашей мечты просто. Мы создадим вам кухню на заказ именно ту, о которой вы мечтали! <span class="our-products__author">Артем и Милла</span><span class="our-products__quote-b">Ведь это так просто”</span></p>
              <Dropdowns class="our-products__features" :items="dropdowns" />
            </div>
          </div>
        </div>
      </div>
      <div class="col col-6" v-if="!$mobile">
        <div class="our-products__card-wrap">
          <slot></slot>
          <CatalogCard
            v-if="kitchen"
            class="our-products__card"
            alt
            top
            :kitchen="kitchen"
            v-anim="true"
          />
          <div class="our-products__leaf fade-slide-down js-anim" v-anim="true">
            <Icon name="leaf" />
          </div>
        </div>
      </div>
    </div>
    <MobileFilters
      v-if="$mobile"
      class="our-products__mobile-filters"
      :class="{'is-active': activeFilters}"
      @applyFilters="applyFilters"
      @closeFilters="toggleFilters"
    />
  </div>
</template>

<script>
import FilterMenu from '@/components/base/FilterMenu'
import FilterTags from '@/components/base/FilterTags'
import Dropdowns from '@/components/base/Dropdowns'
import Icon from '@/components/base/Icon'
import Header from '@/components/Header'
import MobileFilters from '@/components/MobileFilters'
import CatalogCard from '@/components/CatalogCard'

export default {
  name: 'OurProducts',
  components: {
    FilterMenu,
    FilterTags,
    MobileFilters,
    Dropdowns,
    Icon,
    Header,
    CatalogCard
  },
  data() {
    return {
      fixedHeader: false,
      activeFilters: false,
      dropdowns: [
        {arrow: true, title: 'Бесплатный дизайн-проект', desc: '“Создать кухню Вашей мечты просто. Мы создадим вам кухню на заказ именно ту, о которой вы мечтали! Ведь это так просто”'},
        {arrow: true, title: 'Изготовление от 14 дней', desc: '“Создать кухню Вашей мечты просто. Мы создадим вам кухню на заказ именно ту, о которой вы мечтали! Ведь это так просто”'},
        {arrow: true, title: 'Рассрочка до 6 месяцев', desc: '“Создать кухню Вашей мечты просто. Мы создадим вам кухню на заказ именно ту, о которой вы мечтали! Ведь это так просто”'},
        {arrow: true, title: 'Кухня у вас за 3 простых шага!', desc: '“Создать кухню Вашей мечты просто. Мы создадим вам кухню на заказ именно ту, о которой вы мечтали! Ведь это так просто”'}
      ]
    }
  },
  computed: {
    categories() {
      return this.$store.state.kitchenCategories
    },
    activeCategory() {
      return this.$route.params.category
    },
    heading() {
      return this.activeCategory && this.categories ? this.categories.find(item => item.url === this.activeCategory).name : 'Наши кухни'
    },
    tags() {
      return this.$store.state.kitchenStyles
    },
    activeTag() {
      return this.$route.query.style
    },
    kitchen() {
      return this.$store.state.catalogKitchens[0]
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleResize() {
      if (!this.$mobile && this.activeFilters) {
        this.toggleFilters()
      }
    },
    handleScroll() {
      this.fixedHeader = window.scrollY > 0
    },
    toggleFilters() {
      this.activeFilters = !this.activeFilters
      document.body.style.overflow = this.activeFilters ? 'hidden' : ''
    },
    applyFilters(category, style) {
      this.toggleFilters()

      if (category === this.activeCategory && style === this.activeTag) {
        return
      }

      this.$router.push({name: category ? 'category': 'catalog', params: {category}, query: style ? {style} : null})
    },
    deselectTag() {
      this.$router.push({name: this.activeCategory ? 'category' : 'catalog', params: {category: this.activeCategory}})
    }
  }
}
</script>

<style lang="scss">
.our-products {
  padding-top: 64px;

  &__menu {
    margin: 18px (-$container-padding) 0;
  }

  &__details {
    margin: 0 (-$container-padding);
  }

  &__heading {
    margin-top: 3px;
    width: 100%;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 34px;
    line-height: (47/34);
    color: $color-blue; 
  }

  &__items {
    margin-top: 10px;
  }

  &__content {
    margin-top: 12px;
  }

  &__quote {
    font-size: 12px;
    line-height: (20/12);

    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }

  &__author {
    float: right;
    margin-top: 6px;
    margin-left: 30px;
    font-family: $font-decorative;
    font-size: 30px;
    line-height: (26/30);
    color: $color-gray-5;
  }

  &__quote-b {
    display: block;
    margin-bottom: 12px;
    font-weight: bold;
  }

  &__feature {
    width: 100%;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__card-wrap {
    position: relative;
    margin-right: -$container-padding-md;
  }

  &__leaf {
    position: absolute;
    left: -12px;
    top: -10px;
    width: 40px;
    height: 40px;
    fill: $color-green;
    z-index: 1;
  }

  &__mobile-filters {
    position: fixed;
    left: 100%;
    top: 0;
    width: 100%;
    height: 100%;
    transition: transform .3s ease;
    z-index: 10;

    &.is-active {
      transform: translateX(-100%);
    }
  }

  @include media(md) {
    padding-top: 75px;

    &__menu {
      margin: 25px (-$container-padding-md) 0;
    }

    &__details {
      margin: 0 (-$container-padding-md);
    }

    &__heading {
      margin-top: 18px;
      font-size: 44px;
      line-height: (61/44);
    }

    &__items {
      display: flex;
      margin-top: 22px;
    }

    &__image {
      width: calc(50% - 10px);
    }

    &__content {
      flex: 1;
      margin-left: 20px;
      margin-top: 18px;
    }

    &__quote {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      line-height: (26/16);
    }

    &__author {
      order: 1;
      margin-left: 0;
      margin-top: 32px;
      font-size: 40px;
      line-height: (27/60);
    }

    &__quote-b {
      margin-bottom: 0;
    }

    &__features {
      margin-top: 48px;
    }

    &__feature {
      margin-bottom: 10px;
    }
  }

  @include media(lg) {
    padding-top: 0;
    
    &__menu {
      margin-left: 0;
      margin-right: 0;
    }

    &__heading {
      margin-top: 8px;
    }

    &__tags {
      margin-top: 10px;
    }

    &__items {
      margin-top: 16px;
    }

    &__image {
      width: 35.5%;
    }

    &__content {
      margin-left: 24px;
      margin-top: 0;
    }

    &__quote {
      display: block;
      padding-right: 40px;
      font-size: 12px;
      line-height: (20/12);
    }

    &__author {
      margin-left: 20px;
      margin-top: 34px;
      margin-right: -10px;
      font-size: 30px;
      line-height: (21/30);
    }

    &__features {
      margin-top: 10px;
    }
  }

  @include media(xl) {
    &__menu {
      margin-top: 60px;
    }

    &__heading {
      margin-top: 12px;
      font-size: 50px;
      line-height: (69/50);
    }

    &__items {
      margin-top: 14px;
    }

    &__image {
      width: 38.5%;
    }

    &__content {
      margin-left: 56px;
      margin-top: 56px;
    }

    &__quote {
      padding-right: 110px;
      font-size: 16px;
      line-height: 1.62;
    }

    &__author {
      margin-top: 26px;
      margin-right: -16px;
      font-size: 40px;
      line-height: 0.68;
    }

    &__features {
      margin-top: 48px;
    }

    &__card-wrap {
      margin-right: -$container-padding-xl;
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
