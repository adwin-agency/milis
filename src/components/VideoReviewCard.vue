<template>
  <div class="video-review-card">
    <div
      class="video-review-card__box"
      @click="toggleVideo"
    >
      <video
        class="video-review-card__video"
        :src="'https://milismebel.ru' + data.video"
        preload="metadata"
        ref="video"
      ></video>
      <button
        class="video-review-card__play"
        :class="{'active': !active}"
      >
        <Icon
          class="video-review-card__play-icon"
          name="play"
        />
      </button>
    </div>
    <div class="video-review-card__content">
      <p
        v-if="$mobile"
        class="video-review-card__heading"
      >Отзывы владельцев</p>
      <p class="video-review-card__title">{{data.name}}</p>
      <p class="video-review-card__author">{{data.author}}</p>
      <div class="video-review-card__rating">
        <Icon
          v-for="n in data.stars"
          :key="n"
          class="video-review-card__rating-icon"
          name="star"
        />
      </div>
      <p class="video-review-card__price-note">цена за весь гарнитур</p>
      <p class="video-review-card__price">{{data.price}} ₽</p>
      <p class="video-review-card__old-price">старая цена <span>{{data.old_price}} ₽</span></p>
      <RouterLink
        :to="{name: 'product', params: {category: url[2], kitchen: url[3]}}"
        custom
        v-slot="{href, navigate}"
      >
        <Button
          class="video-review-card__btn"
          :href="href"
          @click="navigate"
        >Подробнее</Button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import Button from './base/Button.vue'
import Icon from './base/Icon.vue'

export default {
  name: 'VideoReviewCard',
  components: {
    Icon,
    Button
  },
  props: {
    data: Object,
    active: Boolean
  },
  computed: {
    url() {
      return this.data.url.split('/')
    }
  },
  watch: {
    active(value) {
      if (value) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    }
  },
  methods: {
    toggleVideo() {
      if (this.active) {
        this.$emit('play', null)
      } else {
        this.$emit('play', this.data.id)
      }
    }
  }
}
</script>

<style lang="scss">
.video-review-card {
  display: flex;

  &__box {
    position: relative;
    width: 140px;
    height: 250px;
    flex-shrink: 0;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
  }

  &__img,
  &__video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__play {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: all;
    }

    &-icon {
      margin-left: 4px;
      width: 14px;
      height: 14px;
      fill: $color-blue;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    max-width: 230px;
    flex: 1;
  }

  &__heading {
    font-family: $font-secondary;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 110%;
    color: $color-blue;
  }

  &__title {
    margin-top: 10px;
    font-family: $font-secondary;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: $color-blue;
  }

  &__author {
    font-family: $font-secondary;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: $color-gray-middle;
  }

  &__rating {
    display: flex;
    margin-top: 5px;
    margin-bottom: auto;

    &-icon {
      width: 12px;
      height: 12px;
    }
  }

  &__price {
    font-weight: 300;
    font-size: 30px;
    color: $color-blue;

    &-note {
      margin-top: 16px;
      font-size: 12px;
      line-height: 110%;
      color: $color-blue;
    }
  }

  &__old-price {
    font-size: 12px;
    line-height: 110%;
    color: $color-gray-middle;

    span {
      text-decoration: line-through;
    }
  }

  &__btn {
    margin-top: 15px;
    width: 100%;
    font-family: $font-secondary;
    font-weight: 700;
  }

  @include media(md) {
    &__box {
      height: 260px;
    }
  }

  @include media(lg) {
    &__box {
      width: 178px;
      height: 318px;
    }

    &__content {
      margin-left: 22px;
    }

    &__title {
      margin-top: 0;
      font-size: 20px;
      line-height: 24px;
    }

    &__author {
      margin-top: 18px;
      font-size: 16px;
      line-height: 20px;
    }

    &__rating {
      margin-top: 8px;

      &-icon {
        width: 16px;
        height: 16px;
      }
    }

    &__price {
      font-size: 34px;
    }

    &__old-price {
      font-size: 16px;
    }

    &__btn {
      margin-top: 26px;
    }
  }
}
</style>