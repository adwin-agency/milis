<template>
  <div class="mobile-menu">
    <div class="mobile-menu__header">
      <div class="container">
        <RouterLink
          :to="{name: 'main'}"
          exact
          class="mobile-menu__logo"
          @click.native="$emit('close')"
        >
          <img src="../assets/img/logo-2.svg" alt="Milis">
        </RouterLink>
        <nav class="mobile-menu__nav">
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'catalog'}"
            @click.native="$emit('close')"
          >
            Кухни
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'about'}"
            @click.native="$emit('close')"
          >
            Материалы
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'delivery'}"
            @click.native="$emit('close')"
          >
            Доставка и монтаж
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'payment'}"
            @click.native="$emit('close')"
          >
            Оплата
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'technics'}"
            @click.native="$emit('close')"
          >
            Техника
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'reviews'}"
            @click.native="$emit('close')"
          >
            Отзывы
          </RouterLink>
          <RouterLink
            class="mobile-menu__nav-item"
            :to="{name: 'contacts'}"
            @click.native="$emit('close')"
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
        <p class="mobile-menu__time">
          <b>Работаем без выходных</b><br>
          с 9:00 - до 20:00
        </p>
        <div class="mobile-menu__contacts">
          <div class="mobile-menu__social">
            <!-- <a href="https://www.facebook.com/milismebel/" class="mobile-menu__social-item" target="_blank">
              <Icon name="facebook"/>
            </a>
            <a href="https://www.instagram.com/milismebel.ru/" class="mobile-menu__social-item" target="_blank">
              <Icon name="insta"/>
            </a> -->
            <a href="https://vk.com/milismebel" class="mobile-menu__social-item" target="_blank">
              <Icon name="vk"/>
            </a>
          </div>
          <div class="mobile-menu__city">
            <button
              class="mobile-menu__city-btn"
              @click="openCityPopup"
            >
              {{activeCity && activeCity.name}}
            </button>
          </div>           
          <CityPopup
            class="mobile-menu__city-popup"
            :class="{'is-active': activeCityPopup}"
            @select="closeCityPopup"
            @close="closeCityPopup"
          />
        </div>
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
        <div class="mobile-menu__question">
          <button
            class="mobile-menu__question-btn"
            @click.prevent="showModal('question')"
          >
            Остались вопросы?
          </button>
        </div>
        <div class="mobile-menu__payment">
          <div class="mobile-menu__payment-icon">
            <Icon name="visa"/>
          </div>
          <div class="mobile-menu__payment-icon">
            <Icon name="mastercard"/>
          </div>
        </div>
      </div>
      <button
        class="mobile-menu__close"
        @click="$emit('close')"
      >
        <Icon name="close" />
      </button>
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
          <p class="mobile-menu__time">с 9:00 - до 20:00</p>
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
import Link from './base/Link'
import Icon from './base/Icon'
import CityPopup from '@/components/CityPopup'

export default {
  name: 'MobileMenu',
  components: {
    Link,
    Icon,
    CityPopup
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
        productType: this.kitchenDetails.info.product_type,
        price: this.kitchenDetails.info.price
      } : undefined
    }
  },
  methods: {
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
  font-family: $font-secondary;
  background-color: $color-white;
  overflow-y: auto;

  &__header {
    padding: 10px 0 56px;
  }

  &__logo {
    display: inline-flex;
    align-items: center;
    width: 69px;
    height: 45px;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
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
    margin-top: 50px;
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

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
    fill: $color-blue;
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
    color: $color-blue;

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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    margin-top: 40px;
  }

  &__city {
    position: relative;
    margin-bottom: 20px;
    width: 150px;
  }

  &__city-btn {
    font-size: 14px;
    line-height: (17/14);
    text-decoration: underline;
    color: $color-gray;
  }

  &__city-popup {
    display: none;
    position: absolute;
    left: -$container-padding;
    top: 100%;
    margin-top: 0;
    width: calc(100% + #{$container-padding * 2});
    max-width: 375px;
    z-index: 5;

    &.is-active {
      display: block;
    }
  }

  &__social {
    display: flex;
    margin-right: 40px;
    margin-bottom: 20px;
  }

  &__social-item {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    fill: $color-blue;

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

  &__time {
    margin-top: 30px;
    color: $color-blue;
  }

  &__question {
    margin-top: 30px;
  }

  &__question-btn {
    font-size: 18px;
    color: $color-blue;
  }

  &__payment {
    display: flex;
    align-items: center;
    margin-top: 17px;
  }

  &__payment-icon {
    width: 34px;
    height: 34px;
    margin-right: 12px;
    fill: $color-blue;
  }

  @include media(md) {
    &__logo {
      width: 80px;
    }
  }
}
</style>
