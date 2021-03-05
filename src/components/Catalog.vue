<template>
  <div class="catalog">

    <div class="row catalog__row">      
      <template v-for="(kitchen, index) in kitchens">

        <div
          v-if="index % 2 === 0"
          :key="kitchen.id"
          class="col col-12 col-md-6 col-lg-5 catalog__col"
        >
          <CatalogCard
            high
            alt
            :kitchen="kitchen"
            :catalogPage="catalogPage"
            v-anim="true"
          />
        </div>

        <template v-else>
          <div
            :key="kitchen.id"
            class="col col-12 col-md-6 col-lg-7 catalog__col"
          >
            <CatalogCard
              class="catalog__r-card"
              alt
              :kitchen="kitchen"
              :catalogPage="catalogPage"
              v-anim="{delay: 200}"
            />
            <Questions
              v-if="!$mobile"
              class="catalog__questions"
              title="Почему наши кухни дешевле, чем у конкурентов?"
              desc="Мы знаем, что такое делать ремонт, выбирать мебель. Как сложно обойти массу салонов и поговорить с кучей консультантов. Поэтому, мы выбрали формат онлайн подборки, без салонов, зато быстрее и дешевле "
              v-anim="{delay: 200}"
            />
          </div>
          <div
            v-if="$mobile"
            :key="+index + 100"
            class="col col-12 catalog__col"
          >
            <Questions
              class="catalog__questions"
              title="Почему наши кухни дешевле, чем у конкурентов?"
              desc="Мы знаем, что такое делать ремонт, выбирать мебель. Как сложно обойти массу салонов и поговорить с кучей консультантов. Поэтому, мы выбрали формат онлайн подборки, без салонов, зато быстрее и дешевле "
            />
          </div>
        </template>
        
      </template>
    </div>

    <div v-if="false" class="catalog__list">
      <div class="catalog__logo">
        <img src="../assets/img/logo-gray.svg" alt="">
      </div>
      <p class="catalog__decor">Всё просто!</p>
      <div class="catalog__list-item">
        <CatalogCard
          class="catalog__list-card"
          image="catalog-card-04.jpg"
          title="«Милис»"
          price="85 500"
          v-anim="true"
        />
      </div>
      <div class="catalog__list-item">
        <CatalogCard
          class="catalog__list-card"
          high
          image="catalog-card-04.jpg"
          title="«Эргономичное чудо»"
          price="85 500"
          v-anim="{delay: 100}"
        />
      </div>
      <div class="catalog__list-item">
        <CatalogCard
          class="catalog__list-card"
          image="catalog-card-04.jpg"
          title="«Эргономичное чудо»"
          price="85 500"
          oldprice="250 000"
          discount="-50%"
          v-anim="{delay: 200}"
        />
      </div>
      <div class="catalog__list-item">
        <CatalogCard
          class="catalog__list-card"
          high
          image="catalog-card-04.jpg"
          title="«Милис»"
          price="85 500"
          v-anim="{delay: $windowWidth >= $breakpoints.xl ? 300: 0}"
        />
      </div>
      <div class="catalog__list-item">
        <CatalogCard
          class="catalog__list-card"
          image="catalog-card-04.jpg"
          title="«Милис»"
          price="85 500"
          v-anim="{delay: $windowWidth >= $breakpoints.xl ? 0: 100}"
        />
      </div>
      <div class="catalog__list-item">
        <CatalogCard
          class="catalog__list-card"
          high
          image="catalog-card-04.jpg"
          title="«Милис»"
          price="85 500"
          v-anim="{delay: $windowWidth >= $breakpoints.xl ? 100: 200}"
        />
      </div>
      <div class="catalog__list-item">
        <CatalogCard
          class="catalog__list-card"
          image="catalog-card-04.jpg"
          title="«Милис»"
          price="85 500"
          v-anim="{delay: $windowWidth >= $breakpoints.xl ? 200: 0}"
        />
      </div>
      <div class="catalog__list-item">
        <CatalogCard
          class="catalog__list-card"
          high
          image="catalog-card-04.jpg"
          title="«Милис»"
          price="85 500"
          v-anim="{delay: $windowWidth >= $breakpoints.xl ? 300: 100}"
        />
      </div>
    </div>

  </div>
</template>

<script>
import CatalogCard from '../components/CatalogCard'
import Questions from '../components/Questions'

export default {
  name: 'Catalog',
  components: {
    CatalogCard,
    Questions
  },
  props: {
    kitchens: Array,
    catalogPage: Number
  }
}
</script>

<style lang="scss">
.catalog {
  position: relative;

  &__logo {
    display: none;
    position: absolute;
    left: 5.5%;
    top: 30%;
  }

  &__decor {
    display: none;
    position: absolute;
    right: 25.5%;
    bottom: 6%;
    font-family: $font-decorative;
    font-size: 100px;
    line-height: 0.68;
    color: $color-gray-6;
  }

  &__col {
    margin-bottom: 28px;
  }

  &__questions {
    margin-bottom: 8px;
  }

  &__list {
    position: relative;
  }

  &__list-item {
    position: relative;
    margin-bottom: 28px;
  }

  &__list-card {
    height: 100%;
  }

  @include media(md) {
    &__col {
      margin-bottom: 38px;
    }

    &__questions {
      margin-bottom: 34px;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      margin-left: -10px;
      margin-right: -10px;
    }

    &__list-item {
      width: 50%;
      padding: 0 10px;
      margin-bottom: 38px;
    }
  }

  @include media(lg) {
    &__col {
      margin-bottom: 68px;
    }

    &__r-card {
      margin-left: 38px;
    }

    &__questions {
      margin-left: 34px;
      margin-top: 40px;
      margin-right: -$container-padding-md;
      margin-bottom: 0;
    }

    &__list {
      margin-top: 22px;
      margin-left: -14px;
      margin-right: -14px;
    }

    &__list-item {
      margin-bottom: 68px;
      width: 33.333%;
      padding: 0 14px;
    }
  }

  @include media(xl) {
    &__col {
      margin-bottom: 108px;
    }

    &__r-card {
      margin-left: 65px;
    }

    &__questions {
      margin-left: 152px;
      margin-top: 55px;
      margin-right: -$container-padding-xl;
    }

    &__list {
      margin-top: 12px;
      margin-left: -25px;
      margin-right: -25px;
    }

    &__list-item {
      margin-bottom: 108px;
      width: 25%;
      padding: 0 25px;
    }

    &__logo {
      display: block;
    }

    &__decor {
      display: block;
    }
  }
}
</style>
