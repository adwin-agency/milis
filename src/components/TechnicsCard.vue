<template>
  <div class="technics-card">
    <RouterLink
      class="technics-card__category"
      :to="{name: 'techcategory', params: {category: technic.category}}"
    >
      {{technic.category_rus}}
    </RouterLink>
    <p class="technics-card__title">{{technic.name}}</p>
    <p class="technics-card__price">от 
      <span class="technics-card__price-num">{{technic.price}} ₽</span>
    </p>
    <div class="technics-card__row">
      <div class="technics-card__img-col">
        <div class="technics-card__image">
          <img :src="`https://milismebel.ru${technic.picture}`" alt="">
        </div>
      </div>
      <div class="technics-card__side-col">
        <ul class="technics-card__characteristics">
          <li
            v-for="(property, index) in technic.properties"
            :key="index"
            class="technics-card__characteristic"
          >
            <!-- <span class="technics-card__characteristic-icon">
              <Icon :name="icons[index] || icons[0]"/>
            </span> -->
            {{property.value}}
          </li>
        </ul>
        <button
          type="button"
          class="technics-card__btn"
          @click="showModal"
        >
          Купить
          <span class="technics-card__btn-icon">
            <img src="../assets/img/arrow-right-gradient.svg" alt="">
          </span>
        </button>
      </div>      
    </div>
  </div>
</template>

<script>
// import Icon from './base/Icon'

export default {
  name: 'TechnicsCard',
  components: {
    // Icon
  },
  props: {
    technic: Object
  },
  data() {
    return {
      icons: ['fire', 'circles', 'materials', 'size']
    }
  },
  computed: {
    modalData() {
      return {
        item: this.technic.name,
        itemId: this.technic.id,
        productType: this.technic.product_type
      }
    }
  },
  methods: {
    showModal() {
      this.$store.commit('setModal', 'technics')
      this.$store.commit('setModalData', this.modalData)
    }
  }
}
</script>

<style lang="scss">
.technics-card {
  border-top: 1px solid #D9D9D9;
  padding-top: 20px;

  &__category {
    font-size: 10px;
    line-height: (12/10);
    text-decoration: underline;
    color: $color-gray-middle;
  }

  &__title {
    margin-top: 11px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 18px;
    line-height: (29/18);
    color: $color-blue;
  }

  &__price {
    margin-top: 3px;
    font-weight: bold;
    font-size: 12px;
    line-height: (20/12);
    color: $color-blue;
  }

  &__price-num {
    font-size: 30px;
  }

  &__row {
    margin-top: 4px;
    display: flex;
  }

  &__img-col {
    width: 53%;
  }

  &__image {
    position: relative;
    padding-top: 93%;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__side-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    margin-left: 28px;
    margin-top: 10px;
  }

  &__characteristics {
    margin-bottom: 12px;
  }

  &__characteristic {
    display: flex;
    margin-bottom: 13px;
    font-size: 12px;
    line-height: (16/10);
    color: $color-gray-middle;

    &::before {
      content: "";
      flex-shrink: 0;
      width: 4px;
      height: 4px;
      margin-top: 8px;
      margin-right: 6px;
      border-radius: 50%;
      background-color: $color-blue;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__characteristic-icon {
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    margin-right: 8px;
  }

  &__btn {
    display: flex;
    align-items: center;
    margin-top: auto;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 16px;
    line-height: (24/16);
    text-decoration: underline;
    color: $color-blue;
  }

  &__btn-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-left: 14px;
  }

  @include media(xl) {
    &__img-col {
      width: 55%;
    }

    &__btn {
      font-size: 12px;
      line-height: (18/12);
    }

    &__btn-icon {
      margin-left: 7px;
      width: 14px;
      height: 14px;
    }
  }
}
</style>
