<template>
  <div class="wells">
    <HeaderL></HeaderL>
    <div class="main">
      <div class="left">
        <div class="form">
          <div class="side-menu">
            <DxMenu
              :data-source="wallList.list"
              :show-first-submenu-mode="showFirstSubmenuModes"
              :orientation="orientation"
              :hide-submenu-on-mouse-leave="hideSubmenuOnMouseLeave"
              display-expr="name"
              @item-click="itemClick"
            />
          </div>
        </div>
      </div>
      <div class="right-content">
        <LineChart
          :wellDatas="wellNames.names"
          :wellName="wellNameTitle"
        ></LineChart>
      </div>
    </div>
  </div>
</template>
<script>
// import SideMenu from  '../../components/SideMenu.vue'
import HeaderL from "@/components/HeaderL.vue";
import LineChart from "@/components/LineChart.vue";
import { onMounted, reactive, watchEffect, ref } from "vue";
import DxMenu from "devextreme-vue/menu";
import { getwellsList_API, getWellCharts_API } from "../../axios/wells.js";
import { dateFomat } from "@/utils/fromatDate";
export default {
  components: {
    // SideMenu,
    HeaderL,
    LineChart,
    DxMenu,
  },

  setup() {
    const showSubmenuModes = [
      {
        name: "onClick",
        delay: { show: 0, hide: 300 },
      },
    ];
    let wellNameTitle = ref(null);
    // const reload = ref(true)
    const showFirstSubmenuModes = reactive(showSubmenuModes[0]);
    const orientation = ref("vertical");
    const hideSubmenuOnMouseLeave = ref(false);
    const currentProduct = ref(null);
    async function itemClick(e) {
      console.log(e.itemData);
      wellNames.names = await reactive(getWellName(e.itemData.name));
      wellNameTitle = await e.itemData.name;
      console.log("wellNames", wellNames);
    }
    const wallList = reactive({ list: [] });
    function getwellsList() {
      let wellList = [];
      getwellsList_API().then((res) => {
        // const data = res
        res.forEach((el, index) => {
          let obj = {};
          obj.id = index + 1;
          obj.name = el;
          obj.items = [];
          wellList.push(obj);
        });
        wallList.list = reactive(wellList);
        console.log("then--->", wallList.list);
      });
      return wellList;
    }

    // 获取每个井对应的数据
    const wellNames = reactive({ names: [] });
    function getWellName(e) {
      let data = [];
      getWellCharts_API(e).then((res) => {
        res.forEach((el) => {
          let obj = reactive({});
          (obj.day = dateFomat(el[0])), (obj.value = el[1]);
          data.push(obj);
        });
      });
      // wellNames.names = reactive(data)
      return data;
    }

    watchEffect(async () => {
      wallList.list = await reactive(getwellsList());
      console.log("wallList--->", wallList.list);
    });

    console.log("******-->", wallList.list);
    onMounted(getwellsList());
    return {
      showFirstSubmenuModes,
      orientation,
      hideSubmenuOnMouseLeave,
      currentProduct,
      itemClick,
      wallList,
      getWellName,
      wellNames,
      wellNameTitle,
    };
  },
};
</script>
<style lang="less" scoped>
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
.wells {
  background: rgb(234, 234, 234);
  // display: flex;

  min-height: 100vh;
}
.left {
  // width: 200px;
  border-right: 1px solid #333;
}
.right-content {
  width: 1100px;
  padding: 30px;
}
.main {
  display: flex;
}
</style>
