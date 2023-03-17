<template>
  <div class="nav-panel">

    <template v-if="navType === 'catalog' || navType === 'technics' || navType === 'blog'">
      <div class="nav-panel__navigation">
        <slot name="navigation"></slot>
      </div>
      <div class="nav-panel__group">
        <RouterLink
          :to="{name: 'about'}"
          v-slot="{ href, navigate }"
          custom
        >
          <Link
            :href="href"
            class="nav-panel__item"
            text="О нас"
            @click.native="navigate"
          />
        </RouterLink>
        <RouterLink
          :to="{name: 'delivery'}"
          v-slot="{ href, navigate }"
          custom
        >
          <Link
            :href="href"
            class="nav-panel__item"
            text="Все о доставке и монтаже"
            @click.native="navigate"
          />
        </RouterLink>
        <!-- <Link
          class="nav-panel__item"
          text="Хочу пригласить дизайнера"
          modal="call"
        /> -->
      </div>
    </template>

    <template v-if="navType === 'product' || navType === 'article'">
      <div class="nav-panel__group">
        <RouterLink
          :to="{name: 'payment'}"
          v-slot="{ href, navigate }"
          custom
        >
          <Link
            :href="href"
            class="nav-panel__item"
            text="Как происходит оплата"
            @click.native="navigate"
          />
        </RouterLink>
        <RouterLink
          :to="{name: 'delivery'}"
          v-slot="{ href, navigate }"
          custom
        >
          <Link
            :href="href"
            class="nav-panel__item"
            text="Все о доставке и монтаже"
            @click.native="navigate"
          />
        </RouterLink>
      </div>
      <div class="nav-panel__group">
        <RouterLink
          :to="{name: 'technics'}"
          v-slot="{ href, navigate }"
          custom
        >
          <Link
            :href="href"
            class="nav-panel__item"
            text="Подобрать технику для кухни"
            @click.native="navigate"
          />
        </RouterLink>
      </div>
    </template>

    <template v-if="navType === 'about' || navType === 'payment' || navType === 'reviews'">
      <div class="nav-panel__group">
        <RouterLink
          v-if="navType !== 'payment'"
          :to="{name: 'payment'}"
          v-slot="{ href, navigate }"
          custom
        >
          <Link
            :href="href"
            class="nav-panel__item"
            text="Как происходит оплата"
            @click.native="navigate"
          />
        </RouterLink>
        <RouterLink
          :to="{name: 'delivery'}"
          v-slot="{ href, navigate }"
          custom
        >
          <Link
            :href="href"
            class="nav-panel__item"
            text="Все о доставке и монтаже"
            @click.native="navigate"
          />
        </RouterLink>
      </div>
      <div class="nav-panel__group">
        <RouterLink
          :to="{name: 'catalog'}"
          v-slot="{ href, navigate }"
          custom
        >
          <Link
            :href="href"
            class="nav-panel__item"
            text="Выбрать кухню"
            @click.native="navigate"
          />
        </RouterLink>
      </div>
    </template>  

    <template v-if="navType === 'delivery'">
      <div class="nav-panel__group">
        <RouterLink
          :to="{name: 'payment'}"
          v-slot="{ href, navigate }"
          custom
        >
          <Link
            :href="href"
            class="nav-panel__item"
            text="Как происходит оплата"
            @click.native="navigate"
          />
        </RouterLink>
      </div>
      <!-- <div class="nav-panel__group">
        <Link
          class="nav-panel__item"
          text="Хочу пригласить дизайнера"
          modal="call"
        />
      </div> -->
    </template>

  </div>
</template>

<script>
import Link from './base/Link'

export default {
  name: 'NavPanel',
  components: {
    Link
  },
  props: {
    navType: String
  }
}
</script>

<style lang="scss">
.nav-panel {
  $b: &;

  &__group {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__navigation {
    width: 100%;
    margin-bottom: 56px;
  }

  &__item {
    margin-bottom: 32px;
    text-align: left;
    color: $color-blue;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__btn {
    width: 100%;
  }

  @include media(md) {
    &__navigation {
      margin-bottom: 70px;
    }
  }

  @include media(lg) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    &__navigation {
      margin-bottom: 60px;
    }

    &__group {
      display: flex;
      align-items: center;
      margin-bottom: 0;

      &_wide {
        width: 100%;

        #{$b}__item:last-child {
          margin-left: auto;
        }
      }
    }

    &__item {
      margin-right: 70px;
      margin-bottom: 0;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  @include media(xl) {
    &__navigation {
      width: auto;
      margin-bottom: 0;
    }

    &__group {
      &_wide {
        width: auto;
      }
    }

    &__item {
      margin-right: 65px;
    }
  }
}
</style>
