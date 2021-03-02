<template>
  <div class="product-parts">
    <div class="row">
      <div class="col col-12 col-xl-5">
        <Accessories short />
      </div>
      <div class="col col-12 col-lg-9 col-xl-7">
        <Materials class="product-parts__materials"/>
      </div>
    </div>
  </div>
</template>

<script>
import Accessories from './Accessories'
import Materials from './Materials'

export default {
  name: 'ProductParts',
  components: {
    Accessories,
    Materials
  }
}
</script>

<style lang="scss">
.product-parts {
  
  &__materials {
    margin-top: 40px;
  }

  @include media(md) {
    &__materials {
      margin-top: 60px;
    }
  }

  @include media(lg) {
    &__materials {
      margin-top: 65px;
    }
  }

  @include media(xl) {
    &__materials {
      margin-top: 0;
      margin-left: 60px;
      margin-right: 140px;
    }
  }
}
</style>
