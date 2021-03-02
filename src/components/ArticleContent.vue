<template>
  <div class="article-content">
    <div class="row">
      <div class="col col-8">
        <Divider class="article-content__divider"/>
        <h2 class="article-content__heading">Кухни в Стиле Скандинавия. <br>Как выбрать</h2>
        <div class="article-content__text">
          <p>На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам. Мы проверяем всё: от соответствия размерам и экологичности до качества склейки и надежности фурнитуры. Осуществляется полный контроль работы, дабы свести к нулю вероятность попадания брака к заказчику. <br><br>Таким образом, к нашим клиентам приезжают материалы категории «без сучка, без задоринки», чем мы, несомненно, гордимся.</p>
          <img src="../assets/img/article-content-01.jpg" alt="">
          <p>На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам. Мы проверяем всё: от соответствия размерам и экологичности до качества склейки и надежности фурнитуры. Осуществляется полный контроль работы, дабы свести к нулю вероятность попадания брака к заказчику. <br><br>Таким образом, к нашим клиентам приезжают материалы категории «без сучка, без задоринки», чем мы, несомненно, гордимся.</p>
          <p>На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам. Мы проверяем всё: от соответствия размерам и экологичности до качества склейки и надежности фурнитуры. Осуществляется полный контроль работы, дабы свести к нулю вероятность попадания брака к заказчику. <br><br>Таким образом, к нашим клиентам приезжают материалы категории «без сучка, без задоринки», чем мы, несомненно, гордимся.</p>
        </div>
        <div class="article-content__image">
          <img src="../assets/img/article-content-02.jpg" alt="">
          <div class="article-content__note">
            <p>Кухня в стиле “Скандинавия”</p>
            <p><a href="#">Перейти в каталог</a></p>
          </div>
        </div>
        <div class="article-content__quote">
          <p>“На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам. Мы проверяем всё: от соответствия размерам и экологичности до качества склейки.”</p>
        </div>
        <div class="article-content__text">
          <p>На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам. Мы проверяем всё: от соответствия размерам и экологичности до качества склейки и надежности фурнитуры. Осуществляется полный контроль работы, дабы свести к нулю вероятность попадания брака к заказчику. <br><br>Таким образом, к нашим клиентам приезжают материалы категории «без сучка, без задоринки», чем мы, несомненно, гордимся.</p>
        </div>
        <Divider class="article-content__divider"/>
        <div class="article-content__image">
          <img src="../assets/img/article-content-02.jpg" alt="">
          <div class="article-content__note">
            <p>Кухня в стиле “Скандинавия”</p>
            <p><a href="#">Перейти в каталог</a></p>
          </div>
        </div>
        <div class="article-content__text">
          <p>На нашем производстве есть специальный отдел, отвечающий за соответствие материала заявленным качествам. Мы проверяем всё: от соответствия размерам и экологичности до качества склейки и надежности фурнитуры. Осуществляется полный контроль работы, дабы свести к нулю вероятность попадания брака к заказчику. <br><br>Таким образом, к нашим клиентам приезжают материалы категории «без сучка, без задоринки», чем мы, несомненно, гордимся.</p>
        </div>
        <Divider class="article-content__divider"/>
        <FilterMenu
          article
          class="article-content__menu"
        />
        <form class="article-content__form">
          <TextInput
            label="Имя"
            class="article-content__input"
          />
          <Button
            send
            class="article-content__btn"
          >
            Подписаться на рассылку
          </Button>
        </form>
      </div>
      <div class="col col-4">
        <ArticleSide class="article-content__side"/>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from './base/Divider'
import FilterMenu from './base/FilterMenu'
import TextInput from './base/TextInput'
import Button from './base/Button'
import ArticleSide from './ArticleSide'

export default {
  name: 'ArticleContent',
  components: {
    Divider,
    FilterMenu,
    TextInput,
    Button,
    ArticleSide
  }
}
</script>

<style lang="scss">
.article-content {
  
  &__divider {
    width: 65.5%;
    margin-bottom: 38px;
    border-color: #CECECE;
  }

  &__heading {
    margin-bottom: 38px;
    font-weight: bold;
    font-size: 30px;
    line-height: (41/30);
    color: $color-blue;
  }

  &__text {
    font-family: $font-secondary;
    font-size: 18px;
    line-height: (28/18);
    
    p {
      margin-bottom: 38px;
      width: 72%;
    }

    img {
      float: right;
      margin: 8px 20px 50px 110px;
      width: auto;
    }
  }

  &__image {
    display: flex;
    align-items: flex-start;
    margin-bottom: 38px;

    img {
      flex-shrink: 0;
      width: 74%;
    }
  }

  &__quote {
    position: relative;
    margin-bottom: 38px;
    padding-top: 28px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 30px;
    line-height: (45/30);

    &::before {
      content: "”";
      position: absolute;
      top: 0;
      right: 100px;
      font-size: 300px;
      line-height: 0.7;
      color: $color-white;
      text-shadow: -1px -1px 0 $color-black-gray, 1px -1px 0 $color-black-gray, -1px 1px 0 $color-black-gray, 1px 1px 0 $color-black-gray;
    }

    p {
      position: relative;
    }
  }

  &__note {
    flex-grow: 1;
    margin-left: 68px;
    margin-right: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #CECECE;
    font-family: $font-secondary;
    font-size: 14px;
    line-height: (22/14);
    color: $color-blue;

    p {
      margin-bottom: 16px;
    }

    a {
      text-decoration: underline;
    }
  }

  &__menu {
    margin-top: 60px;
    width: 70%;
  }

  &__form {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    width: 74%;
  }

  &__input {
    width: calc(50% - 10px);
    background-color: $color-white;
  }

  &__btn {
    width: calc(50% - 10px);
  }

  &__side {
    margin-top: 35px;
    margin-left: auto;
    width: 63%;
  }
}
</style>
