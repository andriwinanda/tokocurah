<template>
  <f7-page name="about">
    <f7-navbar transparent title="Produk Detail" back-link="Back"></f7-navbar>
    <f7-toolbar :inner="false" position="bottom">
      <f7-block style="margin:0">
        <f7-row>
          <f7-col width="80" style="margin:0.75rem 0">
            <f7-button fill>Beli Sekarang</f7-button>
          </f7-col>
          <f7-col width="20">
               <f7-link icon-f7="cart_fill_badge_plus"></f7-link>
          </f7-col>
        </f7-row>
      </f7-block>
    </f7-toolbar>
    <!-- Slider-->
    <f7-swiper pagination :speed="500">
      <f7-swiper-slide>
        <img :src="product.image" alt="" />
      </f7-swiper-slide>
    </f7-swiper>
    <f7-block>
      <h1 class="productTitle">{{ product.name }}</h1>
      <p class="price">Rp {{ product.price }}</p>
      <small>&starf;&starf;&starf;&starf; 12345</small>

      <p v-if="product.description">{{ product.description }}</p>
      <p v-else>
        Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis
        sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt
        vel quod tenetur nostrum, voluptate omnis quasi quidem illum
        consequuntur, a, quisquam.
      </p>
    </f7-block>
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
          console.log(res.data.content);
        });
    },
  },
  mounted() {
    this.getProduct();
    console.log(this.f7route.params.id);
  },
};
</script>