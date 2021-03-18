<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__section">
        <div class="row">
          <div
            v-if="!$mobile"
            class="col col-8"
          >
            <RouterLink
              :to="{name: 'main'}"
              exact
              class="footer__logo"
            >
              <img src="../assets/img/logo.svg" alt="Milis">
            </RouterLink>
            <div class="footer__menu">
              <div class="footer__menu-row">
                <div class="footer__menu-col">
                  <p class="footer__menu-title">Какой стиль кухни <br>Вы предпочитаете?</p>
                  <ul>
                    <li
                      v-for="(style, index) in kitchenStyles"
                      :key="index"
                      class="footer__menu-item"
                    >
                      <RouterLink :to="{name: 'catalog', query: {style: style.code}}">{{style.name}}</RouterLink>
                    </li>
                  </ul>
                </div>
                <div class="footer__menu-col">
                  <p class="footer__menu-title">Вы определились <br>с формой?</p>
                  <ul>
                    <li
                      v-for="(category, index) in kitchenCategories"
                      :key="index"
                      class="footer__menu-item"
                    >
                      <RouterLink :to="{name: 'category', params: {category: category.url}}">{{category.name}}</RouterLink>
                    </li>
                  </ul>
                </div>
                <div class="footer__menu-col">
                  <p class="footer__menu-title">Техника <br>для кухни</p>
                  <ul>
                    <li
                      v-for="(category, index) in technicsCategories"
                      :key="index"
                      class="footer__menu-item"
                    >
                      <RouterLink
                        :to="{name: category.url === 'all' ? 'technics' : 'techcategory', params: {category: category.url}}"
                      >
                        {{category.name}}
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="footer__nav">
              <div class="footer__nav-row">
                <div class="footer__nav-col">
                  <div class="footer__nav-item"><RouterLink :to="{name: 'catalog'}">Все кухни</RouterLink></div>
                  <div class="footer__nav-item"><RouterLink :to="{name: 'technics'}">Техника</RouterLink></div>
                  <div class="footer__nav-item"><RouterLink :to="{name: 'reviews'}">Отзывы</RouterLink></div>
                  <div class="footer__nav-item"><RouterLink :to="{name: 'payment'}">Рассрочка</RouterLink></div>
                </div>
                <div class="footer__nav-col">
                  <div class="footer__nav-item"><RouterLink :to="{name: 'about'}">Материалы</RouterLink></div>
                  <div class="footer__nav-item"><RouterLink :to="{name: 'delivery'}">Доставка и монтаж</RouterLink></div>
                  <div class="footer__nav-item"><RouterLink :to="{name: 'payment'}">Оплата</RouterLink></div>
                  <div class="footer__nav-item"><RouterLink :to="{name: 'contacts'}">Контакты</RouterLink></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col col-12 col-lg-4">
            <div class="footer__side">
              <p class="footer__label">Фабрика Милис - Всё просто!</p>
              <!-- <RouterLink
                :to="{name: 'blog'}"
                class="footer__link footer__link_lg"
              >
                Блог о дизайне
              </RouterLink> -->
              <div class="footer__link-group">
                <Link
                  class="footer__link"
                  text="Хочу пригласить дизайнера"
                  modal="call"
                  :modalData="modalData"
                />
                <Link
                  class="footer__link"
                  text="Рассчитать по моим размерам"
                  modal="calc"
                  :modalData="modalData"
                />
              </div>
              <div class="footer__contacts">
                <p class="footer__title">Работаем без выходных</p>
                <p class="footer__time">с 9:00 - до 22:00</p>
                <div class="footer__city">
                  <button
                    class="footer__city-current"
                    type="button"
                    @click="openCityPopup"
                  >
                    {{activeCity && activeCity.name}}
                  </button>
                  <CityPopup
                    class="footer__city-popup"
                    :class="{'is-active': activeCityPopup}"
                    :arrow="$mobile ? 'left' : 'right'"
                    @select="closeCityPopup"
                    @close="closeCityPopup"
                  />
                </div>
                <a
                  :href="`tel:${activeCity && activeCity.phone}`"
                  class="footer__phone"
                >
                  <span class="footer__phone-icon">
                    <Icon name="phone"/>
                  </span>
                  {{activeCity && activeCity.phone}}
                </a>
                <!-- <div class="footer__social">
                  <a href="#" class="footer__social-item">
                    <Icon name="youtube"/>
                  </a>
                  <a href="#" class="footer__social-item">
                    <Icon name="vk"/>
                  </a>
                  <a href="#" class="footer__social-item">
                    <Icon name="insta"/>
                  </a>
                </div> -->
              </div>
            </div>
          </div>          
        </div>
      </div>
      <div class="footer__section">
        <div class="row">
          <div class="col col-12 col-lg-4">
            <div class="footer__question">
              <button
                type="button"
                class="footer__question-btn"
                @click.prevent="showModal('question')"
              >
                Остались вопросы?
              </button>
            </div>
          </div>
          <div class="col col-12 col-lg-4 footer__policy-col">
            <div class="footer__policy">
              <a href="#">Политика конфиденциальности</a>
            </div>
          </div>
          <div class="col col-12 col-lg-4">
            <div class="footer__payment">
              <p class="footer__payment-text">мы принимаем карты к оплате</p>
              <div class="footer__payment-icon">
                <Icon name="visa"/>
              </div>
              <div class="footer__payment-icon">
                <Icon name="mastercard"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Link from './base/Link'
import Icon from './base/Icon'
import CityPopup from '@/components/CityPopup'

export default {
  name: 'Footer',
  components: {
    Link,
    Icon,
    CityPopup
  },
  props: {
    productDetails: Object
  },
  data() {
    return {
      activeCityPopup: false
    }
  },
  computed: {
    kitchenCategories() {
      return this.$store.state.kitchenCategories
    },
    kitchenStyles() {
      return this.$store.state.kitchenStyles
    },
    technicsCategories() {
      return this.$store.state.technicsCategories
    },
    modalData() {
      return this.productDetails && {
        item: this.productDetails.name,
        itemId: this.productDetails.id,
        productType: this.productDetails.product_type
      }
    },
    activeCity() {
      return this.$store.getters.activeCity
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
.footer {
  padding: 38px 0;
  font-family: $font-secondary;
  background-color: $color-blue;

  &__section {
    margin-bottom: 35px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__logo {
    display: inline-block;
    width: 168px;
  }

  &__menu {
    margin-top: 50px;    
    margin-right: 54px;
    padding-bottom: 45px;
    border-bottom: 1px solid $color-gray;
  }

  &__menu-row {
    display: flex;
    margin: 0 -10px;
  }

  &__menu-col {
    width: 33.333%;
    padding: 0 10px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__menu-title {
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 16px;
    line-height: (21/16);
    color: $color-white;
  }

  &__menu-item {
    margin-bottom: 19px;
    font-size: 14px;
    line-height: (17/14);
    color: $color-gray;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__nav {
    margin-top: 45px;
    margin-right: 54px;
  }

  &__nav-row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px -33px;
  }

  &__nav-col {
    display: flex;
    flex-wrap: wrap;
    width: 66.667%;
    padding: 0 10px;
  }

  &__nav-item {
    width: 50%;
    margin-bottom: 33px;
    padding-right: 10px;
    font-weight: bold;
    font-size: 16px;
    line-height: (20/16);
    color: $color-white;

    &:nth-child(2n) {
      padding-left: 10px;
      padding-right: 0;
    }
  }

  &__label,
  &__title,
  &__time {
    font-size: 18px;
    line-height: (22/18);
    color: $color-white;
  }

  &__link,
  &__title {
    font-weight: bold;
  }

  &__label {
    margin-bottom: 23px;
  }

  &__link-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 32px;
  }

  &__link {
    margin-bottom: 22px;
    text-align: left;
    font-size: 16px;
    line-height: (20/16);
    color: $color-white;

    &_lg {
      font-size: 18px;
      line-height: (22/18);      
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 44px;
  }

  &__time {
    margin-top: 8px;
  }

  &__city {
    display: inline-block;
    position: relative;
    margin-top: 44px;
    width: 100%;
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
    margin-top: 20px;
    width: calc(100% + #{$container-padding * 2});
    max-width: 375px;
    z-index: 5;

    &.is-active {
      display: block;
    }
  }

  &__phone {
    display: flex;
    align-items: center;
    margin-top: 18px;
    font-size: 26px;
    line-height: (41/34);
    text-decoration: underline;
    color: $color-gray;
    white-space: nowrap;
  }

  &__phone-icon {
    width: 34px;
    height: 34px;
    margin-right: 10px;
    fill: currentColor;
  }

  &__social {
    display: flex;
    margin-top: 28px;
  }

  &__social-item {
    width: 34px;
    height: 34px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__policy {
    margin-top: 32px;
    font-size: 14px;
    line-height: (17/14);
    color: $color-gray;
  }

  &__question-btn {
    font-size: 18px;
    line-height: (22/18);
    color: $color-white;
  }
  
  &__payment {
    display: flex;
    align-items: center;
    margin-top: 17px;
    padding-right: 6px;
    font-size: 12px;
    line-height: (15/12);
    color: $color-gray;
  }

  &__payment-text {
    display: none;
    margin-right: 30px;
  }

  &__payment-icon {
    width: 34px;
    height: 34px;
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }

  @include media(lg) {
    padding: 40px 0 30px;

    &__section {
      margin-bottom: 100px;
    }

    &__side {
      margin-top: 22px;
      text-align: right;
    }

    &__link-group,
    &__contacts {
      align-items: flex-end;
    }

    &__link-group {
      margin-top: 130px;
    }

    &__contacts {
      margin-top: 134px;
    }

    &__city {
      width: auto;
    }

    &__city-popup {
      left: auto;
      right: 0;
      width: 300px;
    }

    &__phone {
      margin-top: 12px;
      font-size: 34px;
    }

    &__phone-icon {
      margin-top: 6px;
    }

    &__policy-col {
      order: -1;
    }

    &__policy {
      margin-top: 18px;
    }

    &__question {
      margin-top: 20px;
      text-align: center;
    }

    &__payment {
      justify-content: flex-end;
      margin-top: 0;
    }

    &__payment-text {
      display: block;
    }
  }

  @include media(xl) {
    padding: 47px 0 40px;

    &__section {
      margin-bottom: 134px;
    }

    &__logo {
      width: 202px;
    }

    &__menu {
      margin-top: 100px;
      margin-right: 186px;
      padding-bottom: 82px;
    }

    &__menu-row {
      justify-content: space-between;
    }

    &__menu-col {
      width: 25%;
    }

    &__menu-title {
      margin-bottom: 18px;
      font-size: 18px;
      line-height: (24/18);
    }

    &__nav {
      margin-top: 64px;
      margin-right: 190px;
    }

    &__nav-row {
      margin-bottom: -50px;
    }

    &__nav-col {
      width: 50%;
    }

    &__nav-item {
      margin-bottom: 50px;
      font-size: 18px;
      line-height: (22/18);
    }

    &__side {
      margin-top: 43px;
    }

    &__link {
      margin-bottom: 44px;
      font-size: 18px;
      line-height: (22/18);
    }

    &__contacts {
      margin-top: 100px;
    }
  }
}
</style>
