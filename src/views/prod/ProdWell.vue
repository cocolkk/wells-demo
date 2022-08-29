<template>
  <HeaderL />
  <div class="prod-well">
    <div class="side">
      <DxMenu
        :adaptivity-enabled="true"
        :data-source="wallList.list"
        :show-first-submenu-mode="showFirstSubmenuModes"
        :orientation="orientation"
        :hide-submenu-on-mouse-leave="hideSubmenuOnMouseLeave"
        display-expr="name"
        @item-click="itemClick"
      >
      </DxMenu>
    </div>
    <DxChart
      id="chart"
      :data-source="chartDataSource.list"
      :title="wellNameTitle.title"
    >
      <DxSize :height="480" />
      <!-- 设置y轴刻度 -->
      <DxValueAxis :grid="{ opacity: 0.2 }" value-type="numeric">
        <DxLabel :customize-text="customizeLabelText" />
      </DxValueAxis>
      <!-- 设置x轴刻度 -->
      <DxArgumentAxis type="discrete">
        <DxGrid :visible="true" :opacity="0.5" />
      </DxArgumentAxis>

      <DxCommonPaneSettings>
        <DxBorder :visible="true" :width="2" :top="false" :right="false" />
      </DxCommonPaneSettings>

      <!-- 坐标轴取值 -->
      <DxSeries argument-field="day" value-field="value" type="spline" />
      <DxLegend :visible="false" />
      <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip" />
      <!-- <DxExport :enabled="true" /> -->
      <DxLoadingIndicator :enabled="true" />
    </DxChart>
  </div>
</template>
<script>
import { reactive, ref, onMounted, watchEffect } from "vue";
import { getwellsList_API, getWellCharts_API } from "../../axios/wells.js";
import DxMenu from "devextreme-vue/menu";
import { dateFomat } from "@/utils/fromatDate";

import HeaderL from "@/components/HeaderL.vue";
import {
  DxChart,
  DxValueAxis,
  DxArgumentAxis,
  DxCommonPaneSettings,
  DxGrid,
  DxSeries,
  DxLegend,
  DxSize,
  DxBorder,
  DxLabel,
  DxTooltip,
  //   DxExport,
  DxLoadingIndicator,
} from "devextreme-vue/chart";
export default {
  components: {
    DxChart,
    DxMenu,
    DxValueAxis,
    DxArgumentAxis,
    DxCommonPaneSettings,
    DxGrid,
    DxSeries,
    DxLegend,
    DxSize,
    DxBorder,
    DxLabel,
    DxTooltip,
    DxLoadingIndicator,
    HeaderL,
  },
  setup() {
    let wellNameTitle = reactive({ title: "dd" });
    let wallList = reactive({ list: [] });
    let wellRes = reactive({ list: [] });

    // 侧边栏获取左侧列表
    async function getwellsList() {
      let wellList = [];
      await getwellsList_API().then((res) => {
        wallList.list = res;
        res.forEach((el, index) => {
          let obj = {};
          obj.id = index + 1;
          obj.name = el;
          obj.items = [];
          wellList.push(obj);
        });
        wallList.list = wellList;
      });
      return wellList;
    }
    const showFirstSubmenuModes = reactive({
      name: "onClick",
      delay: { show: 0, hide: 300 },
    });
    const orientation = ref("vertical");
    const hideSubmenuOnMouseLeave = ref(false);

    // 图表数据源
    const chartDataSource = reactive({ list: [] });
    function itemClick(e) {
      const clickData = getWellName(e.itemData.name);
      wellNameTitle.title = e.itemData.name;
      chartDataSource.list = [];
      clickData?.forEach((el) => {
        chartDataSource.list.push(el);
      });
    }

    // 图表
    // 获取每个井对应的数据
    function getWellName(e) {
      let data = [];
      getWellCharts_API(e).then((res) => {
        let resData = res;
        chartDataSource.list = [];
        resData?.forEach((el) => {
          let obj = {};
          obj.day = dateFomat(el[0]);
          obj.value = el[1];
          data.push(obj);
        });
        chartDataSource.list = data;
        return data;
      });
    }
    function customizeLabelText({ valueText }) {
      return `${valueText}`;
    }

    function customizeTooltip({ valueText }) {
      return {
        text: `${valueText}`,
      };
    }

    // watchEffect
    watchEffect(async () => {
      wallList.list = await getwellsList();
      chartDataSource.list = await getWellName(wallList?.list[0]?.name);
      wellNameTitle.title = wallList?.list[0]?.name;
    });

    onMounted(() => {
      getwellsList();
    });
    return {
      getwellsList,
      showFirstSubmenuModes,
      orientation,
      hideSubmenuOnMouseLeave,
      itemClick,
      wallList,
      chartDataSource,
      wellRes,
      wellNameTitle,
      customizeLabelText,
      customizeTooltip,
    };
  },
};
</script>
<style lang="less">
.side {
  padding: 20px 40px 0 0;
  border-right: 1px solid #ddd;
  margin-right: 30px;
  &-title {
    height: 60px;
    // background: #151515;
    color: rgb(203, 203, 203);
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    font-size: 18px;
  }
}
.prod-well {
  display: flex;
  padding: 0 20px;
  height: calc(100vh - 70px);
}
.main {
  // height: calc(100vh - 70px);
}
#chart {
  width: 88%;
  height: 70%;
  padding: 20px 0;
  tspan {
    color: yellow;
  }
  .dxc-arg-elements {
  }
}
</style>