<template>
  <div class="menu">
    <div class="menu__links">
      <RouterLink to="/contacts" class="menu__link">Контакты</RouterLink>
      <RouterLink to="/reviews" class="menu__link">Отзывы</RouterLink>
      <RouterLink to="/payment" class="menu__link">Рассрочка 0˙0˙6</RouterLink>
    </div>
    <nav class="menu__nav">
      <div class="menu__col">
        <p class="menu__title">Какой стиль кухни <br>Вы предпочитаете?</p>
        <ul class="menu__list">
          <li
            v-for="(style, index) in kitchenStyles"
            :key="index"
            class="menu__item"
          >
            <RouterLink
              :to="{name: 'catalog', query: {style: style.code}}"
              exact
              @click.native="$emit('closeMenu')"
            >
              {{style.name}}
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="menu__col">
        <p class="menu__title">Вы определились <br>с формой?</p>
        <ul class="menu__list">
          <li
            v-for="(category, index) in kitchenCategories"
            :key="index"
            class="menu__item"
          >
            <RouterLink
              :to="{name: 'category', params: {category: category.url}}"
              exact
              @click.native="$emit('closeMenu')"
            >
              {{category.name}}
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="menu__col">
        <p class="menu__title">Техника <br>для кухни</p>
        <ul class="menu__list">
          <li
            v-for="(category, index) in technicsCategories"
            :key="index"
            class="menu__item"
          >
            <RouterLink
              :to="{name: category.url === 'all' ? 'technics' : 'techcategory', params: {category: category.url}}"
              exact
              @click.native="$emit('closeMenu')"
            >
              {{category.name}}
            </RouterLink>
          </li>
        </ul>
        <RouterLink to="/blog" class="menu__link-item">Блог о дизайне </RouterLink>
      </div>
    </nav>
    <div class="menu__contacts">
      <!-- <a href="#" class="menu__location">Санкт-Петербург</a> -->
      <a href="tel:+78009859598" class="menu__phone">
        <span class="menu__phone-icon">
          <Icon name="phone" />
        </span>
        +7 (800) 985-95-98
      </a>
      <div class="menu__social">
        <a href="#" class="menu__social-item">
          <Icon width="25" height="17" name="vk-l" />
        </a>
        <a href="#" class="menu__social-item">
          <Icon width="17" height="17" name="insta-l" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'

export default {
  name: 'Menu',
  components: {
    Icon
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
    }
  }
}
</script>

<style lang="scss">
.menu {
  padding: 74px 86px;
  background-color: $color-white;

  &__links {
    display: flex;
  }

  &__link {
    margin-right: 100px;
    font-weight: bold;
    font-size: 24px;
    line-height: (32/24);
    color: $color-blue;

    &:last-child {
      margin-right: 0;
    }
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    margin-top: 64px;
  }

  &__col {
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__title,
  &__link-item {
    font-weight: bold;
    font-size: 18px;
    line-height: (24/18);
    color: $color-blue;
  }

  &__list {
    margin-top: 18px;
  }

  &__item {
    font-size: 14px;
    line-height: (17/14);
    margin-bottom: 18px;
    color: $color-black-gray;

    &:last-child {
      margin-bottom: 0;
    }

    a.is-active {
      font-weight: bold;
    }
  }

  &__link-item {
    display: inline-block;
    margin-top: 32px;
  }

  &__contacts {
    display: flex;
    align-items: center;
    margin-top: 92px;
    color: $color-gray;
  }

  &__location {
    margin-right: 60px;
    font-size: 12px;
    line-height: (15/12);
    text-decoration: underline;
  }

  &__phone {
    display: flex;
    align-items: center;
    margin-right: 70px;
    font-size: 16px;
    line-height: (20/16);
    text-decoration: underline;
  }

  &__phone-icon {
    width: 20px;
    height: 20px;
    margin-right: 2px;
    fill: currentColor;
  }

  &__social {
    display: flex;
  }

  &__social-item {
    margin-right: 7px;

    &:last-child {
      margin-right: 0;
    }

    svg {
      width: auto;
      height: auto;
    }
  }

  @include media(xl) {
    padding: 70px 90px;

    &__link {
      margin-right: 125px;
    }

    &__col {
      &:last-child {
        margin-right: 30px;
      }
    }
  }
}
</style>
