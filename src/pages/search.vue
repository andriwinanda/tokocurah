<template>
  <f7-page name="about">
    <f7-navbar transparent back-link="Back">
         <f7-searchbar :value="f7route.params.keyword" inline @input="searchVal=$event.target.value" v-on:keyup.enter="search" custom-search :disable-button="false"></f7-searchbar>
    </f7-navbar>
    <f7-block>
      <div class="row">
        <div class="col-50" v-for="product in products" :key="product.id">
          <f7-link :href="`/product/${product.id}`">
            <div class="card demo-card-header-pic">
              <div class="card-header">
                <img :src="product.image" alt="" />
              </div>
              <div class="card-content card-content-padding">
                <p class="productTitle">
                  {{product.name}}<br />
                  <strong>Rp {{product.price}}</strong><br />
                  <small v-if="product.discount">
                    <strike>Rp 48.000</strike> &#9899; <span>50% OFF</span>
                  </small>
                </p>
                <small>&starf;&starf;&starf;&starf; 12345</small>
              </div>
            </div>
          </f7-link>
        </div>
      
      </div>
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
      products: [],
    };
  },
  methods: {
    getProduct() {
      axios
        .post(`https://api.tokocurah.com/product/search`,
        {
            filter:  this.f7route.params.keyword
        })
        .then((res) => {
          this.products = res.data.content.result;
          console.log(res);
        });
    },
  },
  mounted() {
    this.getProduct();
    console.log(this.f7route.params.keyword);
  },
};
</script>