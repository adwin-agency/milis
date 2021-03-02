<template>
  <div class="article-side">
    <div class="article-side__item">
      <p class="article-side__date">12.07.20</p>
      <p class="article-side__title">Автор:</p>
      <p class="article-side__text">Игорь меликов</p>
    </div>
    <div class="article-side__item">
      <div class="article-side__social">
        <a href="#" class="article-side__social-item">
          <Icon name="vk"/>
        </a>
        <a href="#" class="article-side__social-item">
          <Icon name="facebook"/>
        </a>
      </div>
      <a href="#" class="article-side__link">Подписаться на рассылку</a>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'

export default {
  name: 'ArticleSide',
  components: {
    Icon
  }
}
</script>

<style lang="scss">
.article-side {
  text-align: right;

  &__item {
    border-top: 1px solid #CECECE;
    padding-top: 20px;
    padding-right: 4px;
    margin-bottom: 32px;
    font-family: $font-secondary;
    font-size: 14px;
    line-height: (22/14);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__date {
    margin-bottom: 12px;
  }

  &__title {
    margin-bottom: 6px;
    font-weight: bold;
  }

  &__social {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
  }

  &__social-item {
    width: 34px;
    height: 34px;
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__link {
    font-family: $font-primary;
    font-weight: bold;
    font-size: 12px;
    line-height: (18/12);
    text-decoration: underline;
    color: $color-blue;
  }
}
</style>
