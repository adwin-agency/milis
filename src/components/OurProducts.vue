<template>
  <div class="our-products">
    <div class="row">
      <div class="col col-12 col-lg-6 col-xl-5">
        <div class="row">
          <div class="col col-12">
            <Header
              :filters="$mobile"
              class="slide-down js-anim"
              @openFilters="toggleFilters"
              v-anim="true"
            />
          </div>
        </div>
        <div
          class="our-products__wrapper fade-bounce-right js-anim"
          v-anim="true"
        >
          <!-- <div class="our-products__working">
            <p class="our-products__working-title">с 31.12 по 09.01 работаем с 9:00 до 20:00 </p>
            <p class="our-products__working-desc">Вы можете вызвать дизайнера не выходя из дома</p>
            <Icon
              name="leaf"
              class="our-products__working-icon"
            />
          </div> -->
          <h1 class="our-products__heading">{{ heading }}</h1>
          <!-- <FilterTags
            v-if="!$mobile"
            class="our-products__tags"
            :tags="tags"
            :activeTag="activeTag"
            @deselectTag="deselectTag"
          /> -->
          <div class="our-products__items">
            <!-- <div class="our-products__image">
              <picture>
                <source
                  srcset="@/assets/img/founders-banner-md.jpg"
                  :media="'(min-width: ' + $breakpoints.md + 'px)'"
                />
                <img src="@/assets/img/founders-banner.jpg" alt="" />
              </picture>
            </div> -->
            <DiscountBanner class="our-products__banner" />
            <div class="our-products__discount">
              <img
                src="@/assets/img/discount-wash.png"
                alt=""
                class="our-products__discount-img"
              >
              <div class="our-products__discount-content">
                <p class="our-products__discount-title">Каменная мойка в подарок при покупке кухни</p>
                <p class="our-products__discount-desc">Срок действия предложения ограничен. Акция продлится до конца месяца.</p>
              </div>
            </div>
            <div class="our-products__content">
              <!-- <p class="our-products__quote">
                “Создать кухню Вашей мечты <b>просто</b>. Мы создадим кухню на заказ именно ту, о которой вы мечтали!”
                <span class="our-products__quote-slogan">Всё просто!</span>
              </p> -->
              <Dropdowns
                :items="dropdowns"
                products
                class="our-products__features"
              />
            </div>
          </div>
          <div class="our-products__menu">
            <div
              v-if="!$mobile"
              class="our-products__menu-header"
            >
              <p class="our-products__menu-heading">Фильтры</p>
              <RouterLink
                :to="{name: 'catalog'}"
                class="our-products__reset"
              >
                Сбросить фильтры
              </RouterLink>
            </div>
            <FilterMenu filterType="catalog" />
          </div>
        </div>
      </div>
      <div
        class="col col-6 col-xl-7"
        v-if="!$mobile"
      >
        <div class="our-products__card-wrap">
          <CatalogCard
            v-if="kitchen"
            :key="kitchen.id"
            class="our-products__card"
            alt
            top
            :kitchen="kitchen"
            v-anim="true"
          />
          <p
            v-else
            class="our-products__stock"
          >
            К сожалению, по вашему запросу ничего не найдено. <br />Попробуйте
            поменять один из фильтров - скорее всего, вас ждёт успех!
          </p>
          <!-- <div class="our-products__leaf fade-slide-down js-anim" v-anim="true">
            <Icon name="leaf" />
          </div> -->
        </div>
      </div>
    </div>
    <MobileFilters
      v-if="$mobile"
      class="our-products__mobile-filters"
      :class="{ 'is-active': activeFilters }"
      @applyFilters="applyFilters"
      @closeFilters="toggleFilters"
    />
  </div>
</template>

<script>
import FilterMenu from '@/components/base/FilterMenu'
// import FilterTags from "@/components/base/FilterTags";
import Dropdowns from '@/components/base/Dropdowns'
// import Icon from "@/components/base/Icon";
import Header from '@/components/Header'
import MobileFilters from '@/components/MobileFilters'
import CatalogCard from '@/components/CatalogCard'
import DiscountBanner from '@/components/DiscountBanner'

export default {
  name: 'OurProducts',
  components: {
    FilterMenu,
    // FilterTags,
    MobileFilters,
    Dropdowns,
    // Icon,
    Header,
    CatalogCard,
    DiscountBanner
  },
  data() {
    return {
      activeFilters: false,
      dropdowns: [
        {
          arrow: true,
          title: 'Бесплатный дизайн-проект',
          desc: 'Дизайнер составит проект вашей будущей кухни совершенно бесплатно, даже в том случае, если вы по какой-то причине решите отказаться от покупки.'
        },
        {
          arrow: true,
          title: 'Изготовление от 14 дней',
          desc: 'У нас собственный производственный цех, поэтому мы не зависим от посредников. Это позволяет изготавливать кухни гораздо быстрее и избегать неприятных задержек.'
        },
        {
          arrow: true,
          title: 'Рассрочка до 8 месяцев без первоначального взноса',
          desc: 'Предоставляем беспроцентную рассрочку на 8 месяцев от наших банков партнеров. Высокий шанс одобрения и быстрое принятие решения!'
        },
        {
          arrow: true,
          title: '3 простых шага - и кухня у Вас!',
          desc: 'Наш кухонный мир держится на трех китах - Заказ, Доставка, Сборка. Пройдет совсем немного времени с момента вашей заявки до момента, когда готовый гарнитур окажется у вас дома.'
        }
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
      return this.activeCategory && this.categories
        ? this.categories.find(item => item.url === this.activeCategory).name
        : 'Наши кухни'
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
  },
  destroyed() {
    this.activeFilters && this.toggleFilters()
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      if (!this.$mobile && this.activeFilters) {
        this.toggleFilters()
      }
    },
    toggleFilters() {
      if (this.activeFilters) {
        this.activeFilters = false
        const bodyClassList = document.body.classList

        bodyClassList.remove('is-mobile-filters')

        if (
          !bodyClassList.contains('is-mobile-menu') &&
          !bodyClassList.contains('is-modal')
        ) {
          document.body.style.overflow = ''
        }
      } else {
        this.activeFilters = true
        document.body.classList.add('is-mobile-filters')
        document.body.style.overflow = 'hidden'
      }
    },
    applyFilters(category, style) {
      this.toggleFilters()

      if (category === this.activeCategory && style === this.activeTag) {
        return
      }

      this.$router.push({
        name: category ? 'category' : 'catalog',
        params: { category },
        query: style ? { style } : null
      })
    },
    deselectTag() {
      this.$router.push({
        name: this.activeCategory ? 'category' : 'catalog',
        params: { category: this.activeCategory }
      })
    }
  }
}
</script>

<style lang="scss">
.our-products {
  &__working {
    position: relative;
    margin-top: 24px;
    border-radius: 3px;
    max-width: 326px;
    padding: 10px 12px;
    padding-right: 24px;
    color: $color-blue;
    background-color: #daf1dd;

    &-title {
      font-weight: bold;
      font-size: 14px;
    }

    &-desc {
      margin-top: 5px;
      font-size: 12px;
    }

    &-icon {
      position: absolute;
      right: -12px;
      bottom: 12px;
      width: 24px;
      height: 25px;
      fill: $color-green;
    }
  }

  &__menu {
    position: relative;
    margin: 25px (-$container-padding) 0;
    padding: 30px 0;
    background-color: #f3f3f3;
  }

  &__tags {
    margin: 15px (-$container-padding) 0;
  }

  &__details {
    margin: 0 (-$container-padding);
  }

  &__heading {
    position: relative;
    margin-top: 26px;
    width: 100%;
    padding: 5px 0 20px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 40px;
    line-height: (69/50);
    color: $color-blue;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100vw;
      height: 50%;
      background-color: #f3f3f3;
      transform: translateX(-50%);
      z-index: -1;
    }
  }

  &__image {
    margin: 0 (-$container-padding);
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

  &__quote {
    position: relative;
    margin-top: -12px;
    border-radius: 3px;
    padding: 20px;
    font-size: 16px;
    line-height: (26/16);
    background-color: #f3f3f3;

    &::after {
      content: '';
      display: block;
      clear: both;
    }

    &-slogan {
      float: right;
      margin-top: -8px;
      margin-bottom: -26px;
      font-family: $font-decorative;
      font-size: 40px;
      color: $color-blue;
    }
  }

  &__features {
    margin-top: 25px;
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
    margin-top: 57px;
    height: 100%;
  }

  &__stock {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 70px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.5;
    color: $color-blue;
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
    transition: transform 0.3s ease;
    z-index: 20;

    &.is-active {
      transform: translateX(-100%);
    }
  }

  &__banner {
    margin: 0 (-$container-padding);
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
    &__menu {
      margin: 30px (-$container-padding-md) 0;
    }

    &__tags {
      margin: 25px (-$container-padding-md) 0;
    }

    &__details {
      margin: 0 (-$container-padding-md);
    }

    &__heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      font-size: 50px;
      line-height: (69/50);
    }

    &__reset {
      margin-top: 10px;
      font-family: $font-primary;
      font-weight: normal;
      font-size: 16px;
      line-height: (19/16);
      text-decoration: underline;
    }

    &__image {
      margin: 0;
      width: calc(50% - 10px);
    }

    &__discount {
      &-content {
        max-width: 720px;
      }

      &-title {
        font-size: 20px;
      }
    }

    &__quote {
      margin-top: -20px;
      padding: 30px 40px;

      &-slogan {
        margin-top: -12px;
        margin-right: 20px;
      }
    }

    &__features {
      margin-top: 28px;
    }

    &__feature {
      margin-bottom: 10px;
    }

    &__banner {
      margin: 0 (-$container-padding-md);
    }
  }

  @include media(lg) {
    padding-top: 0;

    &__menu {
      margin: 30px 0 0;
      padding: 30px 34px 30px 0;

      &::before {
        content: '';
        position: absolute;
        left: -$container-padding-md;
        top: 0;
        width: $container-padding-md;
        height: 100%;
        background-color: inherit;
      }

      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      &-heading {
        font-family: $font-secondary;
        font-weight: 700;
        font-size: 30px;
        line-height: 120%;
        color: $color-blue;
      }
    }

    &__tags {
      margin-top: 10px;
      margin-left: 0;
      margin-right: 0;
    }

    &__heading {
      font-size: 40px;

      &::before {
        display: none;
      }
    }

    &__reset {
      margin-top: 0;
      color: $color-blue;
    }

    &__image {
      width: 35.5%;
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

    &__quote {
      margin-top: -12px;
      margin-left: -36px;
    }

    &__features {
      margin-top: 30px;
    }

    &__banner {
      margin: 0;
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

    &__quote {
      margin-right: 105px;
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
