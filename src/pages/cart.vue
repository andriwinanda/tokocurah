
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
    <template>
      <div
        v-for="item in bag"
        :key="item.sku"
        class="display-flex padding justify-content-space-between align-items-center"
      >
        <div>
          <b style="font-size: 16px" class="capitalized">{{
            item.name || ""
          }}</b>
          <p>
            {{ item.currency }}
            <numeric :value="item.price" />
          </p>
        </div>
        <div>
          <f7-stepper
            :min="item.stock >= item.min ? item.min : item.stock"
            :max="item.stock"
            :value="item.stock >= item.qty ? item.qty : item.stock"
            @stepper:change="updateBag(item.sku, $event, item.stock)"
            raised
            large
          ></f7-stepper>
        </div>
      </div>
    </template>
  </f7-page>
</template>
<script>
import { mapState } from "vuex";
const limit = 10;
export default {
  data() {
    return {
      showPreloader: true,
      productOffset: 0,
      productRecord: 0,
      beforeAddSheet: false,
      bagSheet: false,
      productList: [],
      productFilter: {
        city: ""
      },
      edit: {},
      bagTemp: {
        item: null,
        qty: 0
      },
      popupOpened: false,
      dataBind: {}
    };
  },
  methods: {
    
  },
  computed: {
    ...mapState({
      bag: state => state.login.bag
    }),
    bagCount() {
      let total = 0;
      this.bag.map(el => {
        total += el.qty;
      });
      return total;
    },
    totalPrice() {
      let total = 0;
      this.bag.map(el => {
        total += el.totalPrice;
      });
      return total;
    }
  },
  created() {
    this.productList = [];
    this.loadProduct();
  }
};
</script>
