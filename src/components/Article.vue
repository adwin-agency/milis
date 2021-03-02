<template>
  <div class="article">
    <div class="row">
      <div class="col col-5">
        <Header />
        <div class="article__info">
          <p class="article__category">Скандинавия</p>
          <p class="article__date">12.07.20</p>
        </div>
        <h1 class="article__heading">Кухни в Стиле Скандинавия. Как выбрать</h1>
        <p class="article__text">На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам. Мы проверяем всё: от соответствия размерам и экологичности до качества склейки и надежности фурнитуры. Осуществляется полный контроль работы, дабы свести к нулю вероятность попадания брака к заказчику. <br><br>Таким образом, к нашим клиентам приезжают материалы категории «без сучка, без задоринки», чем мы, несомненно, гордимся.</p>
      </div>
      <div class="col col-1"></div>
      <div class="col col-6">
        <div class="article__image mr-n2">
          <img src="../assets/img/article.jpg" alt="">
          <span class="article__leaf">
            <Icon name="leaf"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './base/Icon'
import Header from './Header'

export default {
  name: 'Article',
  components: {
    Icon,
    Header
  }
}
</script>

<style lang="scss">
.article {
  &__info {
    display: flex;
    align-items: center;
    margin-top: 80px;
  }

  &__category {
    margin-right: 26px;
    font-family: $font-secondary;
    font-size: 20px;
    line-height: (23/20);
    text-decoration: underline;
    color: $color-blue;
  }

  &__date {
    font-size: 18px;
    line-height: (22/18);
    color: $color-gray;
  }

  &__heading {
    margin-top: 10px;
    font-weight: bold;
    font-size: 50px;
    line-height: (69/50);
    color: $color-blue;
  }

  &__text {
    margin-top: 20px;
    max-width: 600px;
    font-family: $font-secondary;
    font-size: 14px;
    line-height: (22/14);
    color: $color-gray-middle;
  }

  &__image {
    position: relative;
  }

  &__leaf {
    position: absolute;
    left: -40px;
    bottom: -14px;
    width: 100px;
    height: 103px;
    fill: $color-green;
  }
}
</style>
