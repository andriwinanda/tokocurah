<template>
  <f7-page name="Produk" :page-content="false" class="no-padding-top">
    <f7-navbar transparent back-link="">
      <f7-nav-title class="capitalized">{{ product.name }}</f7-nav-title>
      <f7-nav-right> </f7-nav-right>
    </f7-navbar>
    <f7-toolbar :inner="false" position="bottom">
      <f7-block style="margin: 0">
        <f7-row>
          <f7-col width="80" style="margin: 0.75rem 0">
            <f7-button fill>Beli Sekarang</f7-button>
          </f7-col>
          <f7-col width="20">
            <f7-link icon-f7="cart_fill_badge_plus"></f7-link>
          </f7-col>
        </f7-row>
      </f7-block>
    </f7-toolbar>
    <!-- Slider-->
    <f7-page-content class="no-padding-top">
      <f7-swiper pagination :speed="500" class="slider">
        <f7-swiper-slide v-if="product.url1">
          <img :src="product.url1" alt="" />
        </f7-swiper-slide>
        <f7-swiper-slide v-if="product.url2">
          <img :src="product.url2" alt="" />
        </f7-swiper-slide>
        <f7-swiper-slide v-if="product.url3">
          <img :src="product.url3" alt="" />
        </f7-swiper-slide>
        <f7-swiper-slide v-if="product.url4">
          <img :src="product.url4" alt="" />
        </f7-swiper-slide>
        <f7-swiper-slide v-if="product.url5">
          <img :src="product.url5" alt="" />
        </f7-swiper-slide>
        <f7-swiper-slide v-if="product.url6">
          <img :src="product.url6" alt="" />
        </f7-swiper-slide>
      </f7-swiper>
      <f7-block>
        <h1 class="productTitle">{{ product.name }}</h1>
        <p class="price">{{ numeric(product.price) }}</p>
        <small>&starf;&starf;&starf;&starf; 12345</small>

        <p v-if="product.description">{{ product.description }}</p>
        <p v-else>
          Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis
          sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt
          vel quod tenetur nostrum, voluptate omnis quasi quidem illum
          consequuntur, a, quisquam.
        </p>
      </f7-block>
    </f7-page-content>
  </f7-page>
</template>
<script>
import axios from "axios";

export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProduct() {
      axios
        .get(`https://api.tokocurah.com/product/get/${this.f7route.params.id}`)
        .then((res) => {
          this.product = res.data.content;
        });
    },
    numeric(val) {
      var formatter = new Intl.NumberFormat("ID", {
        style: "currency",
        currency: "IDR",

        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      return formatter.format(val);
    },
  },
  mounted() {
    this.getProduct();
    console.log(this.f7route.params.id);
  },
};
</script>
<style lang="scss">
.slider{
  height: 300px;
  img{
    height: 100%;
  }
}
</style>