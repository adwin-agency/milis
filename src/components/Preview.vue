<template>
  <div class="preview">
    <div class="preview__image" :class="{'anim-img-re js-anim': first}">
      <img src="../assets/img/preview.jpg" alt="">
    </div>
    <div class="preview__content" :class="{'fade-in js-anim': first}">
      <!-- <p class="preview__date">12.08.2020</p> -->
      <!-- <p class="preview__category">Блог/Угловые кухни</p> -->
      <p class="preview__title">Доставка в срок</p>
      <p class="preview__desc">После изготовления кухни,  она хранится на складе, что гарантирует ее сохранность. Наши специалисты позвонят вам и договорятся о времени встречи и уточнят адрес.<br><br></p>
      <div class="preview__footer">
        <!-- <div class="preview__stats">
          <div class="preview__stat">
            <span class="preview__stat-icon">
              <Icon name="views" />
            </span>
            250
          </div>
          <div class="preview__stat">
            <span class="preview__stat-icon">
              <Icon name="likes" />
            </span>
            30
          </div>
        </div> -->
        <RouterLink
          :to="{name: 'delivery'}"
          v-slot="{ href, navigate }"
          custom
        >
          <ButtonAlt
            class="preview__btn"
            :href="href"
            text="Подробнее о доставке"
            @click.native="navigate"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
// import Icon from './base/Icon'
import ButtonAlt from './base/ButtonAlt'

export default {
  name: 'Preview',
  components: {
    // Icon,
    ButtonAlt
  },
  props: {
    first: Boolean
  }
}
</script>

<style lang="scss">
.preview {
  position: relative;
  overflow: hidden;

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }

  &__content {
    position: relative;
    width: 100%;
    padding: 30px 56px 30px 24px;
    color: $color-white;
    transition-delay: .5s;
  }

  &__date {
    font-size: 14px;
    line-height: (17/14);
  }

  &__category {
    margin-top: 14px;
    font-size: 12px;
    line-height: (15/12);
    text-decoration: underline;
    color: $color-gray;
  }

  &__title {
    margin-top: 6px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 24px;
    line-height: (31/24);
  }

  &__desc {
    margin-top: 9px;
    padding-right: 10px;
    font-size: 14px;
    line-height: (21/14);
  }

  &__stats {
    display: flex;
    margin-bottom: 4px;
  }

  &__stat {
    display: flex;
    align-items: center;
    margin-right: 18px;
    font-size: 12px;
    line-height: (19/12);

    &:last-child {
      margin-right: 0;
    }
  }

  &__stat-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    fill: $color-gray-middle
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__btn {
    margin-left: auto;
  }

  @include media(xl) {
    &__content {
      padding: 70px 56px 70px 44px;
    }

    &__title {
      font-size: 30px;
      line-height: (37/30);
    }

    &__desc {
      margin-top: 6px;
      font-size: 16px;
      line-height: (27/16);
    }

    &__stats {
      margin-bottom: 0;
    }
  }
}
</style>
