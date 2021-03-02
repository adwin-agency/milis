<template>
  <div class="blog-card">
    <div class="blog-card__header">
      <div class="blog-card__info">
        <p class="blog-card__category">Скандинавия</p>
        <p class="blog-card__date">12.07.20</p>
      </div>
      <div class="blog-card__stats">
        <p class="blog-card__stat">
          <span class="blog-card__stat-icon">
            <Icon name="views"/>
          </span>
          250
        </p>
        <p class="blog-card__stat">
          <span class="blog-card__stat-icon">
            <Icon name="likes"/>
          </span>
          30
        </p>
      </div>
    </div>
    <p class="blog-card__title">Кухни в Стиле Скандинавия. Как выбрать</p>
    <div class="blog-card__image" :class="[{'blog-card__image_high': high}, 'anim-img js-anim']">
      <img :src="imagePath" alt="">
    </div>
    <p v-if="!high" class="blog-card__desc">На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам.</p>
  </div>
</template>

<script>
import Icon from './base/Icon'

export default {
  name: 'BlogCard',
  components: {
    Icon
  },
  props: {
    high: Boolean,
    image: String
  },
  computed: {
    imagePath() {
      return require('@/assets/img/' + this.image)
    }
  }
}
</script>

<style lang="scss">
.blog-card {
  border-top: 1px solid #D9D9D9;
  padding-top: 15px;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__info {
    display: flex;
  }

  &__category {
    margin-right: 20px;
    font-size: 14px;
    line-height: (16/14);
    text-decoration: underline;
    color: $color-blue;
  }

  &__date {
    font-family: $font-secondary;
    font-size: 14px;
    line-height: (17/14);
    color: $color-gray;
  }

  &__stats {
    display: flex;
    padding-right: 5px;
  }

  &__stat {
    display: flex;
    margin-right: 28px;
    font-family: $font-secondary;
    font-size: 14px;
    line-height: (22/14);
    color: $color-gray;

    &:last-child {
      margin-right: 0;
    }
  }

  &__stat-icon {
    flex-shrink: 0;
    width: 19px;
    height: 19px;
    margin-right: 5px;
  }

  &__title {
    margin-top: 14px;
    padding-right: 50px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 24px;
    line-height: (38/24);
    color: $color-blue;
  }

  &__image {
    position: relative;
    margin-top: 30px;
    padding-top: 50%;

    &_high {
      padding-top: 85%;
    }

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__desc {
    margin-top: 20px;
    font-size: 14px;
    line-height: (22/14);
    color: $color-gray-middle;
  }
}
</style>