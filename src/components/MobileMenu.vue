<template>
  <div
    class="mobile-menu"
    ref="mobileMenu"
  >
    <div class="mobile-menu__header">
      <div class="container">
        <div class="mobile-menu__logo">
          <img src="../assets/img/logo.svg" alt="Milis">
        </div>
        <nav class="mobile-menu__nav">
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'catalog'}"
            @click.native="closeMenu"
          >
            Кухни
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'about'}"
            @click.native="closeMenu"
          >
            Материалы
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'delivery'}"
            @click.native="closeMenu"
          >
            Доставка и монтаж
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'payment'}"
            @click.native="closeMenu"
          >
            Оплата
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'technics'}"
            @click.native="closeMenu"
          >
            Техника
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'reviews'}"
            @click.native="closeMenu"
          >
            Отзывы
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'contacts'}"
            @click.native="closeMenu"
          >
            Контакты
          </RouterLink>
        </nav>
        <a
          class="mobile-menu__phone"
          :href="`tel:${activeCity && activeCity.phone}`"
        >
          <span class="mobile-menu__phone-icon">
            <Icon name="phone" />
          </span>
          {{activeCity && activeCity.phone}}
        </a>
      </div>
    </div>
    <!-- <div class="mobile-menu__footer">
      <div class="container">
        <p class="mobile-menu__label">Фабрика Милис - Всё просто!</p>
        <RouterLink
          class="mobile-menu__title-link mobile-menu__blog-link"
          :to="{name: 'blog'}"
          @click.native="closeMenu"
        >
          Блог о дизайне
        </RouterLink>    
        <div class="mobile-menu__link-group">
          <Link
            class="mobile-menu__link"
            text="Хочу пригласить дизайнера"
            modal="call"
            :modalData="modalData"
          />
          <Link
            class="mobile-menu__link"
            text="Рассчитать по моим размерам"
            modal="calc"
            :modalData="modalData"
          />
        </div>
        <div class="mobile-menu__works">
          <RouterLink
            class="mobile-menu__title-link"
            :to="{name: 'delivery'}"
            @click.native="closeMenu"
          >
            Доставка и сборка
          </RouterLink>
          <p class="mobile-menu__time">с 9:00 - до 22:00</p>
        </div>
        <div class="mobile-menu__contacts">
          <div class="mobile-menu__city">
            <button
              class="mobile-menu__city-current"
              type="button"
              @click="openCityPopup"
            >
              {{activeCity && activeCity.name}}
            </button>
            <CityPopup
              class="mobile-menu__city-popup"
              :class="{'is-active': activeCityPopup}"
              @select="closeCityPopup"
              @close="closeCityPopup"
            />
          </div>
          <div class="mobile-menu__social">
            <a href="" class="mobile-menu__social-item">
              <Icon name="youtube" />
            </a>
            <a href="" class="mobile-menu__social-item">
              <Icon name="vk" />
            </a>
            <a href="" class="mobile-menu__social-item">
              <Icon name="insta" />
            </a>
          </div>
        </div>
        <button
          type="button"
          class="mobile-menu__ask"
          @click.prevent="showModal('question')"
        >
          Остались вопросы?
        </button>
        <p class="mobile-menu__policy"><a href="#">Политика конфиденциальности</a></p>
        <div class="mobile-menu__payment">
          <div class="mobile-menu__payment-item">
            <Icon name="visa" />
          </div>
          <div class="mobile-menu__payment-item">
            <Icon name="mastercard" />
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import Link from './base/Link'
import Icon from './base/Icon'
// import CityPopup from '@/components/CityPopup'

export default {
  name: 'MobileMenu',
  components: {
    // Link,
    Icon,
    // CityPopup
  },
  data() {
    return {
      activeCityPopup: false
    }
  },
  computed: {
    activeCity() {
      return this.$store.getters.activeCity
    },
    kitchen() {
      return this.$route.name === 'product'
    },
    kitchenDetails() {
      return this.kitchen && this.$store.state.kitchenDetails
    },
    modalData() {
      return this.kitchenDetails ? {
        item: this.kitchenDetails.info.name,
        itemId: this.kitchenDetails.info.id,
        productType: this.kitchenDetails.info.product_type
      } : undefined
    }
  },
  methods: {
    closeMenu() {
      this.$emit('closeMenu')
      setTimeout(() => {
        this.$refs.mobileMenu.scroll(0, 0)
      }, 300)
    },

    showModal(modal) {
      this.$store.commit('setModal', modal)
      this.$store.commit('setModalData', this.modalData)
    },

    openCityPopup() {
      this.activeCityPopup = true
    },
    closeCityPopup() {
      this.activeCityPopup = false
    }
  }
}
</script>

<style lang="scss">
.mobile-menu {
  position: relative;
  padding-bottom: $mobile-bar-height;
  font-family: $font-secondary;
  background-color: $color-white;
  overflow-y: auto;

  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 24px;
      height: 2px;
      background-color: $color-blue;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  &__header {
    padding: 25px 0 32px;
  }

  &__logo {
    width: 69px;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
  }

  &__nav-item {
    margin-bottom: 52px;
    font-size: 18px;
    line-height: (22/18);
    color: $color-blue;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__phone {
    display: inline-flex;
    align-items: center;
    margin-top: 60px;
    font-weight: bold;
    font-size: 22px;
    line-height: (27/22);
    text-decoration: underline;
    color: $color-blue;
  }

  &__phone-icon {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    fill: $color-green;
  }

  &__footer {
    padding: 38px 0 32px;
    color: $color-white;
    background-color: $color-blue;
  }

  &__label {
    font-size: 18px;
    line-height: (22/18);
  }

  &__blog-link {
    display: inline-block;
    margin-top: 24px;
  }

  &__title-link {
    font-weight: bold;
    font-size: 18px;
    line-height: (22/18);
  }

  &__link-group {
    margin-top: 30px;
  }

  &__link {
    margin-bottom: 24px;
    text-align: left;
    color: $color-white;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__works {
    margin-top: 40px;
  }

  &__time {
    margin-top: 10px;
    font-size: 18px;
    line-height: (22/18);
  }

  &__contacts {
    margin-top: 44px;
  }

  &__city {
    position: relative;
  }

  &__city-current {
    display: block;
    font-size: 16px;
    line-height: (20/16);
    text-decoration: underline;
    color: $color-gray;
  }

  &__city-popup {
    display: none;
    position: absolute;
    left: -$container-padding;
    top: 100%;
    margin-top: 18px;
    width: calc(100% + #{$container-padding * 2});
    max-width: 375px;
    z-index: 5;

    &.is-active {
      display: block;
    }
  }

  &__social {
    display: flex;
    margin-top: 14px;
  }

  &__social-item {
    width: 32px;
    height: 32px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__ask {
    display: inline-block;
    margin-top: 36px;
    font-size: 18px;
    line-height: (22/18);
  }

  &__policy {
    margin-top: 34px;
    font-size: 14px;
    line-height: (17/14);
  }

  &__payment {
    display: flex;
    margin-top: 16px;
  }

  &__payment-item {
    width: 34px;
    height: 34px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }

  @include media(md) {
    padding-bottom: $mobile-bar-height-md;
  }
}
</style>
