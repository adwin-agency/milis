<template>
  <Page>
    <div class="v-care">
      <div class="container">
        <Care class="v-care__care"  />
      </div>
    </div>
  </Page>
</template>

<script>
import Care from '../components/Care.vue'
import Page from '../components/Page.vue'

export default {
  name: 'CareView',
  components: { Page, Care },
}
</script>