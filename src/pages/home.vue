<template>
  <f7-page name="home" :page-content="true">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <img width="70" src="../assets/logo.png" alt="" />
      </f7-nav-left>
      <f7-nav-title>
        <f7-searchbar 
          inline
          @input="searchVal = $event.target.value"
          v-on:keyup.enter="search"
          custom-search
          :disable-button="false"
        ></f7-searchbar>
      </f7-nav-title>
      <f7-nav-right>
        <f7-link href="/cart" icon-f7="cart_fill" color="gray"></f7-link>
        <f7-link icon-f7="person_fill" color="gray"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-page
      infinite
      :infinite-distance="50"
      :infinite-preloader="showPreloader"
      @infinite="loadMore"
    >
      <!-- Slider-->
      <f7-swiper pagination :speed="500">
        <f7-swiper-slide v-for="slide in slider" :key="slide.id">
          <f7-link :href="slide.id">
          <img height="180" :src="slide.image" alt="" />

          </f7-link>
        </f7-swiper-slide>
        <!-- <f7-swiper-slide>
          <img src="../assets/Banner.jpg" alt="" />
        </f7-swiper-slide>
        <f7-swiper-slide>
          <img src="../assets/Banner.jpg" alt="" />
        </f7-swiper-slide> -->
      </f7-swiper>
      <f7-block bg-color="white" class="no-margin padding-vertical">
      <f7-block-title>Kategori Produk</f7-block-title>
      <f7-block class="no-margin">
        <div class="row no-gap">
          <div
            class="col-25 text-align-center"
            bg-color="white"
            v-for="item in category"
            :key="item.id"
          >
            <f7-link color="black" :href="`/category/${item.id}`" class="align-content-center">
              <img :src="item.image" alt="" />
              <!-- <small class="capitalized">{{ item.name }}</small> -->
            </f7-link>
          </div>
         </div>
      </f7-block>
      </f7-block >
      <f7-block-title>Produk Terbaru</f7-block-title>
      <f7-block>
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
                    <strong>{{numeric(product.price)}} </strong
                    ><br />
                    <small v-if="product.discount">
                      <strike>Rp 48.000</strike> &#9899; <span>50% OFF</span>
                    </small>
                  </p>
                  <small color-theme="red">&starf;&starf;&starf;&starf; 12345</small>
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

const limit = 4;
export default {
  props: {
    f7route: Object,
    f7router: Object,
  },
  data() {
    return {
      products: [],
      category: [],
      slider:[],
      searchVal: "",
      showPreloader: true,
      productOffset: 0,
      productRecord: 0,
    };
  },
  methods: {
    getListProduct() {
      let params = {
        category: "",
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
    getCategory() {
      axios.get("https://api.tokocurah.com/category/").then((res) => {
        this.category = res.data.content.result;
      });
    },
    getSlider() {
      axios.get("https://api.tokocurah.com/slider").then((res) => {
        this.slider = res.data.content.result;
      });
    },
    search() {
      this.f7router.navigate(`/search/${this.searchVal}`);
    },
    loadMore() {
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
  },
  mounted() {
    this.getListProduct();
    this.getCategory();
    this.getSlider()
  },
};
</script>
