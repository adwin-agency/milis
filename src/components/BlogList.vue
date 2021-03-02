<template>
  <div class="blog-list">
    <div class="blog-list__row">
      <div class="blog-list__col">
        <BlogCard
          class="blog-list__item"
          image="blog-card-01.jpg"
          v-anim="true"
        />
      </div>
      <div class="blog-list__col">
        <BlogCard
          class="blog-list__item"
          high
          image="blog-card-02.jpg"
          v-anim="{delay: 100}"
        />
      </div>
      <div class="blog-list__col">
        <BlogCard
          class="blog-list__item"
          image="blog-card-03.jpg"
          v-anim="{delay: 200}"
        />
      </div>
      <div class="blog-list__col">
        <BlogCard
          class="blog-list__item"
          high
          image="blog-card-04.jpg"
          v-anim="{delay: $windowWidth >= $breakpoints.xl ? 300: 0}"
        />
      </div>
      <div class="blog-list__col">
        <BlogCard
          class="blog-list__item"
          image="blog-card-01.jpg"
          v-anim="{delay: $windowWidth >= $breakpoints.xl ? 0: 100}"
        />
      </div>
      <div class="blog-list__col">
        <BlogCard
          class="blog-list__item"
          high
          image="blog-card-02.jpg"
          v-anim="{delay: $windowWidth >= $breakpoints.xl ? 100: 200}"
        />
      </div>
      <div class="blog-list__col">
        <BlogCard
          class="blog-list__item"
          image="blog-card-03.jpg"
          v-anim="{delay: $windowWidth >= $breakpoints.xl ? 200: 0}"
        />
      </div>
      <div class="blog-list__col">
        <BlogCard
          class="blog-list__item"
          high
          image="blog-card-04.jpg"
          v-anim="{delay: $windowWidth >= $breakpoints.xl ? 300: 100}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from './BlogCard'

export default {
  name: 'BlogList',
  components: {
    BlogCard
  }
}
</script>

<style lang="scss">
.blog-list {
  &__row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px -36px;
  }

  &__col {
    padding: 0 10px;
    margin-bottom: 36px;
  }

  @include media(md) {
    &__col {
      width: 50%;
    }
  }

  @include media(lg) {
    &__col {
      width: 33.333%;
    }

    &__item {
      margin-right: 12px;
    }
  }

  @include media(xl) {
    &__row {
      margin-left: -25px;
      margin-right: -25px;
      margin-bottom: -70px;
    }

    &__col {
      width: 25%;
      padding: 0 25px;
      margin-bottom: 70px;
    }

    &__item {
      margin-right: 0;
    }
  }
}
</style>
