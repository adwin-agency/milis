<template>
  <div class="service">
    <div class="row service__row">
      <div class="col col-12 col-lg-5">
        <h2 class="service__heading" v-if="$windowWidth < $breakpoints.md">Доставка и{{'\xa0'}}сборка</h2>
        <Swiper
          :options="swiperOptions"
          ref="mySwiper"
          class="service__slider"
        >
          <SwiperSlide class="service__image anim-img js-anim" v-anim="true" >
            <img src="../assets/img/service.jpg" alt="">
          </SwiperSlide>
          <SwiperSlide class="service__image">
            <img src="../assets/img/service.jpg" alt="">
          </SwiperSlide>
          <SwiperSlide class="service__image">
            <img src="../assets/img/service.jpg" alt="">
          </SwiperSlide>
          <ButtonNav
            prev
            class="service__prev"
            slot="button-prev"  
          />
          <ButtonNav
            next
            class="service__next"
            slot="button-next"  
          />
        </Swiper>
      </div>
      <div class="col col-12 col-lg-7 col-xl-6">
        <div class="service__content">
          <h2 class="service__heading" v-if="$windowWidth >= $breakpoints.md">Доставка и сборка</h2>
          <p class="service__text">На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам. Мы проверяем всё: от соответствия размерам и экологичности до качества склейки и надежности фурнитуры. Осуществляется полный контроль работы, дабы свести к нулю вероятность попадания брака к заказчику. <br><br>Таким образом, к нашим клиентам приезжают материалы категории «без сучка, без задоринки», чем мы, несомненно, гордимся.</p>
          <p class="service__decor">Все просто! Кухня за 3 шага</p>
          <Steps
            class="service__steps"
            v-if="$windowWidth < $breakpoints.lg || $windowWidth >= $breakpoints.xl"
            service
          />
        </div>
      </div>
      <div class="col col-9" v-if="$windowWidth >= $breakpoints.lg && $windowWidth < $breakpoints.xl">
        <Steps
          class="service__steps"
          service
        />
      </div>
    </div>
  </div>
</template>

<script>
import Steps from './Steps'
import ButtonNav from './base/ButtonNav'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Service',
  components: {
    Swiper,
    SwiperSlide,
    ButtonNav,
    Steps,
  },
  data() {
    return {
      swiperOptions: {
        resistanceRatio: 0,
        navigation: {
          prevEl: '.service__prev',
          nextEl: '.service__next'
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style lang="scss">
.service {

  &__heading {
    font-size: 34px;
    line-height: (41/34);
  }

  &__slider {
    position: relative;
    margin: 12px (-$container-padding) 0;
  }

  &__image {
    position: relative;
    padding-top: 84%;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__prev,
  &__next {
    position: absolute;
    bottom: 0;
    z-index: 1;
  }

  &__prev {
    right: 45px;
  }

  &__next {
    right: 0;
  }

  &__content {
    margin-top: 20px;
    // margin-left: 60px;
    // margin-right: 40px;
  }  

  &__text {
    // margin-top: 35px;
    // max-width: 630px;
    font-size: 14px;
    line-height: (28/14);
    // font-size: 12px;
    // line-height: (19/12);
    color: $color-gray-middle;
  }

  &__decor {
    margin-top: 16px;
    font-family: $font-decorative;
    font-size: 30px;
    color: $color-gray-middle;
  }

  &__steps {
    margin: 10px (-$container-padding) 0;
    // margin-top: 20px;
    // margin-left: -80px;
  }

  @include media(md) {
    &__slider {
      margin: 0 (-$container-padding-md);
    }

    &__image {
      padding-top: 58%;
    }

    &__prev {
      right: 54px;
    }

    &__content {
      margin-top: 44px;
    }

    &__heading {
      font-size: 44px;
      line-height: (51/44);
    }

    &__text {
      margin-top: 18px;
      font-size: 16px;
      line-height: (25/16);
    }

    &__decor {
      margin-top: 22px;
    }

    &__steps {
      margin: 16px (-$container-padding-md) 0;
    }
  }

  @include media(lg) {
    &__row {
      align-items: center;
    }

    &__slider {
      margin-right: 0;
    }

    &__image {
      padding-top: 83.8%;
    }

    &__prev {
      right: 62px;
    }

    &__content {
      margin-top: 12px;
      margin-left: 22px;
    }

    &__text {
      margin-top: 22px;
      padding-right: 10px;
    }

    &__decor {
      margin-top: 28px;
    }

    &__steps {
      margin: 60px -16px 0 (-$container-padding-md);
    }
  }

  @include media(xl) {
    &__slider {
      margin-left: -$container-padding-xl;
    }

    &__content {
      margin-top: 32px;
      margin-left: 56px;
      margin-right: 56px;
    }

    &__heading {
      font-size: 60px;
      line-height: (69/60);
    }

    &__text {
      margin-top: 30px;
    }

    &__decor {
      margin-top: 24px;
    }

    &__steps {
      margin-top: 20px;
      margin-left: -76px;
    }
  }
}
</style>
