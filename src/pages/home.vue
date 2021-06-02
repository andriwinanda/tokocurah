<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <!-- <f7-nav-title sliding>Toko Curah</f7-nav-title> -->
      <f7-searchbar inline @input="searchVal=$event.target.value" v-on:keyup.enter="search" custom-search :disable-button="false"></f7-searchbar>
      </f7-nav-left>
      <f7-nav-right>
        <f7-link icon-f7="cart_fill" color="gray"></f7-link>
        <f7-link icon-f7="person_fill" color="gray"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <!-- Slider-->
    <f7-swiper pagination :speed="500">
      <f7-swiper-slide>
        <img src="../assets/Banner.jpg" alt="" />
      </f7-swiper-slide>
      <f7-swiper-slide>
        <img src="../assets/Banner.jpg" alt="" />
      </f7-swiper-slide>
      <f7-swiper-slide>
        <img src="../assets/Banner.jpg" alt="" />
      </f7-swiper-slide>
    </f7-swiper>

    <f7-block>
      <div class="row no-gap">
        <div class="col-25">
          <f7-link>
            <img src="../assets/kategori/image3.png" alt="" />
          </f7-link>
        </div>
        <div class="col-25">
          <f7-link>
            <img src="../assets/kategori/image4.png" alt="" />
          </f7-link>
        </div>
        <div class="col-25">
          <f7-link>
            <img src="../assets/kategori/image5.png" alt="" />
          </f7-link>
        </div>
        <div class="col-25">
          <f7-link>
            <img src="../assets/kategori/image6.png" alt="" />
          </f7-link>
        </div>
      </div>
      <div class="row no-gap">
        <div class="col">
          <f7-link>
            <img src="../assets/kategori/image7.png" alt="" />
          </f7-link>
        </div>
        <div class="col">
          <f7-link>
            <img src="../assets/kategori/image8.png" alt="" />
          </f7-link>
        </div>
        <div class="col">
          <f7-link>
            <img src="../assets/kategori/image9.png" alt="" />
          </f7-link>
        </div>
        <div class="col">
          <f7-link>
            <img src="../assets/kategori/image10.png" alt="" />
          </f7-link>
        </div>
      </div>
    </f7-block>

    <f7-block-title>Promo Hari Ini</f7-block-title>
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
import axios from 'axios'

export default {
   props: {
    f7route: Object,
    f7router: Object,
  },
  data(){
    return{
      products:[],
      searchVal: ""
    }
  },
  methods:{
    getListProduct(){
      axios
        .get("https://api.tokocurah.com/product/")
        .then(res => {
          this.products = res.data.content.result
        })
    },
    search(){
      this.f7router.navigate(`/search/${this.searchVal}`)
    }
  },
  mounted() {
    this.getListProduct()
  }
}
</script>
