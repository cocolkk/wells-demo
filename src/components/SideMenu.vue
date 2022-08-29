<template>
  <div class="form">
    <div class="side-menu">
      <DxMenu
        :data-source="wells.list"
        :show-first-submenu-mode="showFirstSubmenuModes"
        :orientation="orientation"
        :hide-submenu-on-mouse-leave="hideSubmenuOnMouseLeave"
        display-expr="name"
        @item-click="itemClick"
      />
    </div>
  </div>
</template>
<script>
import DxMenu from "devextreme-vue/menu";
// import service from './data.js';
import { reactive, ref, watchEffect } from "vue";

export default {
  components: {
    DxMenu,
  },
  props: {
    products: {
      type: Array,
    },
  },
  computed(props) {
    console.log("computed--->", props);
  },
  setup(props, ctx) {
    const showSubmenuModes = [
      {
        name: "onClick",
        delay: { show: 0, hide: 300 },
      },
    ];
    const showFirstSubmenuModes = reactive(showSubmenuModes[0]);
    const orientation = ref("vertical");
    const hideSubmenuOnMouseLeave = ref(false);
    const currentProduct = ref(null);
    function itemClick(e) {
      console.log(e.itemData);
      ctx.emit("wellName", e.itemData.name);
    }
    const wells = reactive({ list: [] });
    watchEffect(() => {
      setTimeout(() => {
        wells.list = props.products;
      }, 200);
    });

    return {
      wells,
      showFirstSubmenuModes,
      orientation,
      hideSubmenuOnMouseLeave,
      currentProduct,
      itemClick,
    };
  },
};
</script>
<style scoped>
.form {
  margin-left: 3px;
  max-height: 100vh;
  width: 300px;
  /* overflow-y: scroll; */
  background: rgb(234, 234, 234);
}

.form > div:first-child {
  margin-right: 320px;
}

.label {
  font-size: 22px;
}

#product-details {
  width: 400px;
  height: 400px;
  margin: 20px auto 0;
}

#product-details > img {
  height: 300px;
  width: 400px;
}

#product-details > .name {
  text-align: center;
  font-size: 20px;
}

#product-details > .price {
  text-align: center;
  font-size: 24px;
}

.dark #product-details > div {
  color: #f0f0f0;
}

.options {
  padding: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 260px;
  top: 0;
  background-color: rgba(191, 191, 191, 0.15);
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
}

.hidden {
  visibility: hidden;
}
.side-menu {
  height: 100vh;
  width: 160px;
  /* min-height: calc(100vh - 60px) ; */
  overflow: hidden;
  overflow-y: scroll;
  color: #132afc;
}
</style>
