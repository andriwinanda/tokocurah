<template>
  <f7-page name="Kategori" :page-content="false">
    <f7-navbar :sliding="false" :hidden="false" back-link="">
      <f7-nav-title class="capitalized">{{ detail.name }}</f7-nav-title>
      <f7-nav-right> </f7-nav-right>
    </f7-navbar>

    <f7-page
      infinite
      :infinite-distance="50"
      :infinite-preloader="showPreloader"
      @infinite="loadMore"
    >
      <f7-block class="margin-top-half">
        <div class="row">
          <div class="col-50" v-for="product in products" :key="product.id">
            <f7-link :href="`/product/${product.id}`">
              <div class="card demo-card-header-pic">
                <div class="card-header">
                  <img height="100" :src="product.image" alt="" />
                </div>
                <div class="card-content card-content-padding">
                  <p class="productTitle">
                    {{ product.name }}<br />
                    <strong>{{ numeric(product.price) }}</strong
                    ><br />
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
  </f7-page>
</template>
<script>
import axios from "axios";
const limit = 100;
export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      products: [],
      category: "",
      detail: {},
      showPreloader: true,
      productOffset: 0,
      productRecord: 0,
    };
  },
  methods: {
    getListProduct() {
      let params = {
        category: this.category,
        publish: "",
        limit: limit,
        offset: this.productOffset,
      };
      axios
        .post("https://api.tokocurah.com/product/", params)
        .then((res) => {
          let data = res.data.content;
          if (data.result.length) {
            data.result.map((el) => {
              this.products.push(el);
            });
          } else this.products = [];
          this.productRecord = data.record || 0;
          this.showPreloader = false;
        })
        .catch((err) => {
          this.showPreloader = false;
        });
    },
    loadMore() {
      console.log(this.productRecord);
      if (
        !this.showPreloader &&
        this.productRecord &&
        this.products.length < this.productRecord
      ) {
        this.productOffset += limit;
        this.getListProduct();
      }
    },
    getCategory() {
      axios
        .get(`https://api.tokocurah.com/category/get/${this.category}`)
        .then((res) => {
          this.detail = res.data.content;
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
    this.category = this.f7route.params.category;
    this.getListProduct(this.f7route.params.category);
    this.getCategory();
  },
};
</script>