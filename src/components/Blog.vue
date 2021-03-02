<template>
  <div class="blog page-top">
    <div class="row">
      <div class="col col-12 col-lg-6 blog__image-col">
        <div class="blog__image anim-img js-anim" v-anim="true">
          <img src="../assets/img/blog.jpg" alt="">
        </div>
      </div>
      <div class="col col-12 col-lg-6 col-xl-5">
        <Header class="page-header fade-slide-down js-anim" v-anim="true" />
        <div class="blog__wrapper fade-bounce-right js-anim" v-anim="true">
          <h1 class="heading blog__heading">Блог о дизайне <br>на кухне</h1>
          <TextWrap class="blog__text" v-if="$windowWidth < $breakpoints.md || $windowWidth >= $breakpoints.lg && $windowWidth < $breakpoints.xl">На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам. Мы проверяем всё: от соответствия размерам и экологичности до качества склейки и надежности фурнитуры. Осуществляется полный контроль работы, дабы свести к нулю вероятность попадания брака к заказчику. <br><br>Таким образом, к нашим клиентам приезжают материалы категории «без сучка, без задоринки», чем мы, несомненно, гордимся.</TextWrap>
          <p class="blog__text" v-else>На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам. Мы проверяем всё: от соответствия размерам и экологичности до качества склейки и надежности фурнитуры. Осуществляется полный контроль работы, дабы свести к нулю вероятность попадания брака к заказчику. <br><br>Таким образом, к нашим клиентам приезжают материалы категории «без сучка, без задоринки», чем мы, несомненно, гордимся.</p>
          <FilterMenu
            blog
            class="blog__menu"
          />
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import TextWrap from './base/TextWrap'
import FilterMenu from './base/FilterMenu'
import Header from './Header'

export default {
  name: 'Blog',
  components: {
    TextWrap,
    FilterMenu,
    Header
  }
}
</script>

<style lang="scss">
.blog {
  &__image {
    margin: 0 (-$container-padding);
  }

  &__heading {
    margin-top: 40px;
  }

  &__text {
    margin-top: 30px;
    font-size: 16px;
    line-height: (32/16);
  }

  &__menu {
    margin: 25px (-$container-padding) 0;
  }

  @include media(md) {
    &__image {
      margin: 0 (-$container-padding-md);
    }

    &__text {
      margin-top: 20px;
    }
  }

  @include media(lg) {
    &__image-col {
      order: 1;
      margin-left: auto;
    }

    &__image {
      margin-left: 0;
    }

    &__heading {
      margin-top: 30px;
    }

    &__text {
      font-size: 14px;
      line-height: (28/14);
    }

    &__menu {
      margin: 40px -50px 0 0;
    }
  }

  @include media(xl) {
    &__image {
      margin-right: -$container-padding-xl;
    }

    &__heading {
      margin-top: 60px;
    }

    &__text {
      font-size: 16px;
      line-height: (32/16);
    }

    &__menu {
      margin-top: 32px;
      margin-right: 0;
    }
  }
}
</style>
