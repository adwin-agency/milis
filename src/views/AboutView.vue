<template>
  <Page>
    <div class="v-about">
      <div class="container">
        <About class="v-about__about" />
        <Accessories class="v-about__accessories" />
        <Divider class="v-about__divider-1" v-if="$windowWidth < $breakpoints.md" />
        <Design class="v-about__design" />
        <Divider class="v-about__divider-2 scale-right js-anim" v-anim="true" />
        <ProductsForYou class="v-about__products-for-you" />
        <NavPanel
          class="v-about__nav-panel"
          navType="about"
        />
      </div>
    </div>
  </Page>
</template>

<script>
import Divider from '@/components/base/Divider'
import Page from '@/components/Page'
import About from '@/components/About'
import Accessories from '@/components/Accessories'
import Design from '@/components/Design'
import ProductsForYou from '@/components/ProductsForYou'
import NavPanel from '@/components/NavPanel'

export default {
  name: 'AboutView',
  components: {
    Divider,
    Page,
    About,
    Accessories,
    Design,
    ProductsForYou,
    NavPanel
  }
}
</script>

<style lang="scss">
.v-about {
  &__about {
    margin-bottom: 40px;
  }

  &__accessories {
    margin-bottom: 50px;
  }

  &__divider-1 {
    margin-bottom: 35px;
  }

  &__design {
    margin-bottom: 60px;
  }

  &__divider-2 {
    margin-bottom: 60px;
  }

  &__products-for-you {
    margin-bottom: 60px;
  }

  &__nav-panel {
    margin-bottom: 60px;
  }

  @include media(md) {
    &__accessories {
      margin-bottom: 40px;
    }

    &__design {
      margin-bottom: 80px;
    }
  }

  @include media(lg) {
    &__about {
      margin-bottom: 65px;
    }

    &__accessories {
      margin-bottom: 80px;
    }

    &__design {
      margin-bottom: 90px;
    }

    &__divider-2 {
      margin-bottom: 90px;
    }

    &__products-for-you {
      margin-bottom: 50px;
    }
  }

  @include media(xl) {
    &__about {
      margin-bottom: 105px;
    }

    &__accessories {
      margin-bottom: 150px;
    }

    &__design {
      margin-bottom: 80px;
    }

    &__products-for-you {
      margin-bottom: 60px;
    }

    &__nav-panel {
      margin-bottom: 90px;
    }
  }
}
</style>
