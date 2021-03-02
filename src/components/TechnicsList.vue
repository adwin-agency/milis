<template>
  <div class="technics-list">
    <div class="row technics-list__row">
      <div
        v-for="(technic, index) in technics"
        :key="index"
        class="col col-12 col-md-6 col-lg-4 col-xl-3 technics-list__col"
      >
        <TechnicsCard
          class="technics-list__item"
          :technic="technic"
        />
      </div>
    </div>
  </div>    
</template>

<script>
import TechnicsCard from '../components/TechnicsCard'

export default {
  name: 'TechnicsList',
  components: {
    TechnicsCard
  },
  props: {
    technics: Array
  }
}
</script>

<style lang="scss">
.technics-list {
  overflow: hidden;
  
  &__row {
    margin-bottom: -64px;
  }

  &__col {
    margin-bottom: 64px;
  }

  @include media(lg) {
    &__item {
      margin-right: 10px;
    }
  }

  @include media(xl) {
    &__row {
      margin-bottom: -140px;
    }

    &__col {
      margin-bottom: 140px;
    }

    &__item {
      margin-right: 24px;
    }
  }
}
</style>
