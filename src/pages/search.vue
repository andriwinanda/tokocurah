<template>
  <f7-page name="Pencarian">
    <f7-navbar back-link="">
      <f7-searchbar
        :value="f7route.params.keyword"
        inline
        @input="searchVal = $event.target.value"
        v-on:keyup.enter="search()"
        custom-search
        :disable-button="false"
      ></f7-searchbar>
      <f7-nav-right>
        <f7-link href="/" icon-f7="house_fill" color="gray"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-page
      infinite
      :infinite-distance="50"
      :infinite-preloader="showPreloader"
      @infinite="loadMore"
    >
      <f7-block class="margin-top-half">
        <small
          >Hasil penelusuran dari
          <strong>{{ f7route.params.keyword }}</strong></small
        >
        <div class="row">
          <div class="col-50" v-for="product in products" :key="product.id">
            <f7-link :href="`/product/${product.id}`" color="black">
              <div class="card demo-card-header-pic margin-vertical">
                <div class="card-header">
                  <img height="100" :src="product.image" alt="" />
                </div>
                <div class="card-content card-content-padding">
                  <p class="productTitle" color-theme="red">
                    {{ product.name }}<br />
                    <strong>{{ numeric(product.price) }} </strong><br />
                    <small v-if="product.discount">
                      <strike>Rp 48.000</strike> &#9899; <span>50% OFF</span>
                    </small>
                  </p>
                  <small color-theme="red"
                    >&starf;&starf;&starf;&starf; 12345</small
                  >
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
const limit = 6;
export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      products: [],
      searchVal: "",
      showPreloader: true,
      productOffset: 0,
      productRecord: 0,
    };
  },
  methods: {
    getListProduct(val) {
      let params = {
        filter: val,
        limit: limit,
        offset: this.productOffset,
      };
      axios
        .post(`https://api.tokocurah.com/product/search`, params)
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
    search() {
      this.f7router.navigate(`/search/${this.searchVal}`);
    },
  },
  mounted() {
    this.searchVal = this.f7route.params.keyword;
    this.getListProduct(this.f7route.params.keyword);
  },
};
</script>