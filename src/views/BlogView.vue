<template>
  <Page>
    <div class="v-blog">
      <div class="container">
        <Blog class="v-blog__blog" />
        <BlogList class="v-blog__blog-list" />
        <Divider class="v-blog__divider scale-right js-anim" v-anim="true" />
        <NavPanel
          class="v-blog__nav-panel"
          navType="blog"
        />
      </div>
    </div>
  </Page>
</template>

<script>
import Divider from '@/components/base/Divider'
import Page from '@/components/Page'
import Blog from '@/components/Blog'
import BlogList from '@/components/BlogList'
import NavPanel from '@/components/NavPanel'

export default {
  name: 'BlogView',
  components: {
    Divider,
    Page,
    Blog,
    BlogList,
    NavPanel
  }
}
</script>

<style lang="scss">
.v-blog {
  &__blog {
    margin-bottom: 60px;
  }

  &__blog-list {
    margin-bottom: 50px;
  }

  &__divider {
    margin-bottom: 20px;
  }

  &__nav-panel {
    margin-bottom: 60px;
  }

  @include media(md) {
    &__blog {
      margin-bottom: 30px;
    }

    &__blog-list {
      margin-bottom: 75px;
    }

    &__divider {
      margin-bottom: 40px;
    }
  }

  @include media(lg) {
    &__blog {
      margin-bottom: 60px;
    }

    &__blog-list {
      margin-bottom: 60px;
    }

    &__nav-panel {
      margin-bottom: 70px;
    }
  }

  @include media(xl) {
    &__blog {
      margin-bottom: 90px;
    }

    &__blog-list {
      margin-bottom: 85px;
    }

    &__nav-panel {
      margin-bottom: 90px;
    }
  }
}
</style>
