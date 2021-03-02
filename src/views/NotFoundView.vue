<template>
  <Page>
    <div class="v-not-found">
      <div class="container">
        <NotFound class="v-not-found__not-found" />
      </div>
    </div>
  </Page>
</template>

<script>
import Page from '@/components/Page'
import NotFound from '@/components/NotFound'

export default {
  name: 'NotFoundView',
  components: {
    Page,
    NotFound
  }
}
</script>

<style lang="scss">
.v-not-found {
  &__not-found {
    margin-bottom: 60px;
  }
}
</style>
