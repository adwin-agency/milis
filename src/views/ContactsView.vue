<template>
  <Page>
    <div class="v-contacts">
      <div class="container">
        <Contacts class="v-contacts__contacts" />
      </div>
    </div>
  </Page>
</template>

<script>
import Page from '@/components/Page'
import Contacts from '@/components/Contacts'

export default {
  name: 'ContactsView',
  components: {
    Page,
    Contacts
  }
}
</script>

<style lang="scss">
.v-contacts {
  &__contacts {
    margin-bottom: 60px;
  }

  @include media(xl) {
    &__contacts {
      margin-bottom: 80px;
    }
  }
}
</style>
