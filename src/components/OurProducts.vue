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
            <p class="our-products__working-title">с 1.05 - 10.05 работаем с 9:00 до 22:00 </p>
            <p class="our-products__working-desc">Вы можете вызвать дизайнера не выходя из дома</p>
            <Icon
              name="leaf"
              class="our-products__working-icon"
            />
          </div> -->
          <h1 class="our-products__heading">
            {{ heading }}
            <RouterLink
              v-if="$windowWidth >= $breakpoints.md"
              :to="{name: 'catalog'}"
              class="our-products__reset"
            >
              Сбросить фильтры
            </RouterLink>
          </h1>
          <FilterMenu
            class="our-products__menu"
            filterType="catalog"
          />
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
            <div class="our-products__content">
              <p class="our-products__quote">
                “Создать кухню Вашей мечты <b>просто</b>. Мы создадим кухню на заказ именно ту, о которой вы мечтали!”
                <span class="our-products__quote-slogan">Всё просто!</span>
              </p>
              <Dropdowns
                :items="dropdowns"
                products
                class="our-products__features"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col col-6 col-xl-7" v-if="!$mobile">
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
          <p v-else class="our-products__stock">
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
import FilterMenu from "@/components/base/FilterMenu";
// import FilterTags from "@/components/base/FilterTags";
import Dropdowns from "@/components/base/Dropdowns";
// import Icon from "@/components/base/Icon";
import Header from "@/components/Header";
import MobileFilters from "@/components/MobileFilters";
import CatalogCard from "@/components/CatalogCard";
import DiscountBanner from "@/components/DiscountBanner";

export default {
  name: "OurProducts",
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
          title: "Бесплатный дизайн-проект",
          desc:
            "Дизайнер составит проект вашей будущей кухни совершенно бесплатно, даже в том случае, если вы по какой-то причине решите отказаться от покупки.",
        },
        {
          arrow: true,
          title: "Изготовление от 14 дней",
          desc:
            "У нас собственный производственный цех, поэтому мы не зависим от посредников. Это позволяет изготавливать кухни гораздо быстрее и избегать неприятных задержек.",
        },
        {
          arrow: true,
          title: "Рассрочка до 6 месяцев",
          desc:
            "Предоставляем беспроцентную рассрочку на полгода от наших банков партнеров. Высокий шанс одобрения и быстрое принятие решения!",
        },
        {
          arrow: true,
          title: "3 простых шага - и кухня у Вас!",
          desc:
            "Наш кухонный мир держится на трех китах - Заказ, Доставка, Сборка. Пройдет совсем немного времени с момента вашей заявки до момента, когда готовый гарнитур окажется у вас дома.",
        },
      ],
    };
  },
  computed: {
    categories() {
      return this.$store.state.kitchenCategories;
    },
    activeCategory() {
      return this.$route.params.category;
    },
    heading() {
      return this.activeCategory && this.categories
        ? this.categories.find((item) => item.url === this.activeCategory).name
        : "Наши кухни";
    },
    tags() {
      return this.$store.state.kitchenStyles;
    },
    activeTag() {
      return this.$route.query.style;
    },
    kitchen() {
      return this.$store.state.catalogKitchens[0];
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    this.activeFilters && this.toggleFilters();
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      if (!this.$mobile && this.activeFilters) {
        this.toggleFilters();
      }
    },
    toggleFilters() {
      if (this.activeFilters) {
        this.activeFilters = false;
        const bodyClassList = document.body.classList;

        bodyClassList.remove("is-mobile-filters");

        if (
          !bodyClassList.contains("is-mobile-menu") &&
          !bodyClassList.contains("is-modal")
        ) {
          document.body.style.overflow = "";
        }
      } else {
        this.activeFilters = true;
        document.body.classList.add("is-mobile-filters");
        document.body.style.overflow = "hidden";
      }
    },
    applyFilters(category, style) {
      this.toggleFilters();

      if (category === this.activeCategory && style === this.activeTag) {
        return;
      }

      this.$router.push({
        name: category ? "category" : "catalog",
        params: { category },
        query: style ? { style } : null,
      });
    },
    deselectTag() {
      this.$router.push({
        name: this.activeCategory ? "category" : "catalog",
        params: { category: this.activeCategory },
      });
    },
  },
};
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
    margin: 25px (-$container-padding) 40px;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: -50px;
      right: 0;
      bottom: -40px;
      background-color: #F3F3F3;
      z-index: -1;
    }
  }

  &__tags {
    margin: 15px (-$container-padding) 0;
  }

  &__details {
    margin: 0 (-$container-padding);
  }

  &__heading {
    margin-top: 32px;
    width: 100%;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 40px;
    line-height: (69/50);
    color: $color-blue;
  }

  &__image {
    margin: 0 (-$container-padding);
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
      content: "";
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
  }

  @include media(md) {
    &__menu {
      margin: 22px (-$container-padding-md) 40px;
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
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 20px;

      &::before {
        left: -$container-padding-md;
        bottom: -20px;
      }
    }

    &__tags {
      margin-top: 10px;
      margin-left: 0;
      margin-right: 0;
    }

    &__heading {
      font-size: 40px;
    }

    &__reset {
      margin-top: 0;
      margin-right: 10px;
    }

    &__items {
      margin-top: 65px;
    }

    &__image {
      width: 35.5%;
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

    &__reset {
      margin-top: 10px;
      margin-right: 36px;
    }

    &__working + &__menu {
      margin-top: 25px;
    }

    &__menu {
      &::before {
        left: -$container-padding-xl;
      }
    }

    &__heading {
      font-size: 50px;
      line-height: (69/50);
    }

    &__items {
      margin-top: 100px;
    }

    &__image {
      width: 38.5%;
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
