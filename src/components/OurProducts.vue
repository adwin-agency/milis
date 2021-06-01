<template>
  <div class="our-products page-top">
    <div class="row">
      <div class="col col-12 col-lg-6">
        <div class="row">
          <div class="col col-12 col-xl-10">
            <Header
              v-if="$mobile"
              class="page-header"
              filters
              @openFilters="toggleFilters"
            />
            <template v-else-if="fixedHeader">
              <Header
                class="page-header-fixed"
                :class="{ 'is-sticky': stickyHeader }"
                fixed
              />
              <div class="page-header-spacer"></div>
            </template>
            <Header
              v-else
              class="page-header fade-slide-down js-anim"
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
          <FilterMenu
            v-if="!$mobile"
            class="our-products__menu"
            filterType="catalog"
          />
          <h1 v-if="!$mobile" class="our-products__heading">
            {{ heading }}
          </h1>
          <FilterTags
            v-if="!$mobile"
            class="our-products__tags"
            :tags="tags"
            :activeTag="activeTag"
            @deselectTag="deselectTag"
          />
          <h1 v-if="$mobile" class="our-products__heading">
            {{ heading }}
          </h1>
          <div class="our-products__items">
            <div class="our-products__image">
              <picture>
                <source
                  srcset="@/assets/img/founders-md2.jpg"
                  :media="'(min-width: ' + $breakpoints.md + 'px)'"
                />
                <img src="@/assets/img/founders2.jpg" alt="" />
              </picture>
            </div>
            <div class="our-products__content">
              <p class="our-products__quote">
                “Мечтаете о новой кухне? Мы воплотим ваши кухонные желания в
                реальность и изготовим именно тот гарнитур, который вас
                полностью устроит!
                <span class="our-products__author">Артем и Милла</span
                ><span class="our-products__quote-b"
                  >Ведь это так просто!”</span
                >
              </p>
              <Dropdowns class="our-products__features" :items="dropdowns" />
            </div>
          </div>
        </div>
      </div>
      <div class="col col-6" v-if="!$mobile">
        <div class="our-products__card-wrap">
          <CatalogCard
            v-if="kitchen"
            :key="kitchen.id"
            class="our-products__card"
            alt
            top
            :kitchen="kitchen"
            v-anim="true"
            test
          />
          <p v-else class="our-products__stock">
            К сожалению, по вашему запросу ничего не найдено. <br />Попробуйте
            поменять один из фильтров - скорее всего, вас ждёт успех!
          </p>
          <div class="our-products__leaf fade-slide-down js-anim" v-anim="true">
            <Icon name="leaf" />
          </div>
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
import FilterTags from "@/components/base/FilterTags";
import Dropdowns from "@/components/base/Dropdowns";
import Icon from "@/components/base/Icon";
import Header from "@/components/Header";
import MobileFilters from "@/components/MobileFilters";
import CatalogCard from "@/components/CatalogCard";

export default {
  name: "OurProducts",
  components: {
    FilterMenu,
    FilterTags,
    MobileFilters,
    Dropdowns,
    Icon,
    Header,
    CatalogCard,
  },
  data() {
    return {
      fixedHeader: false,
      stickyHeader: false,
      activeFilters: false,
      dropdowns: [
        {
          arrow: true,
          title: "Бесплатный дизайн-проект",
          desc:
            "Наш дизайнер составит проект вашей будущей кухни совершенно бесплатно, даже в том случае, если вы по какой-то причине решите отказаться от наших услуг.",
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
            "Наш кухонный мир держится на трех китах - Заказ, Доставка, Сборка. Пройдет совсем немного времени с момента вашей заявки до момента, когда гарнитур уже в полном обмундировании будет радовать глаз у вас дома!",
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
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    this.activeFilters && this.toggleFilters();
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleResize() {
      if (!this.$mobile && this.activeFilters) {
        this.toggleFilters();
      }
    },
    handleScroll() {
      this.fixedHeader = window.scrollY > 300;
      this.stickyHeader = window.scrollY > 600;
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
  padding-top: 64px;

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
    margin: 18px (-$container-padding) 0;
  }

  &__tags {
    margin: 15px (-$container-padding) 0;
  }

  &__details {
    margin: 0 (-$container-padding);
  }

  &__heading {
    margin-top: 12px;
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

  &__image {
    margin: 0 (-$container-padding);
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

    &__tags {
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
      margin: 0;
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

    &__tags {
      margin-top: 10px;
      margin-left: 0;
      margin-right: 0;
    }

    &__heading {
      margin-top: 8px;
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
    &__working + &__menu {
      margin-top: 25px;
    }

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
      margin-right: 50px;
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
