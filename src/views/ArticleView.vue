<template>
  <Page>
    <div class="v-article">
      <div class="container">
        <Article class="mb-2"/>
        <ArticleContent class="mb-2"/>
        <Divider class="mb-1"/>
        <NavPanel article class="mb-2"/>
      </div>
    </div>
  </Page>
</template>

<script>
import Divider from '@/components/base/Divider'
import Page from '@/components/Page'
import Article from '@/components/Article'
import ArticleContent from '@/components/ArticleContent'
import NavPanel from '@/components/NavPanel'

export default {
  name: 'ArticleView',
  components: {
    Divider,
    Page,
    Article,
    ArticleContent,
    NavPanel
  }
}
</script>
