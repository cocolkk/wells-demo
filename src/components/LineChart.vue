<template>
  <div id="chart-demo">
    <DxChart id="chart" :data-source="dataSource.list" palette="Violet">
      <DxCommonSeriesSettings
        :type="type"
        argument-field="day"
        color="#132afc"
      />
      <DxSeries
        v-for="energy in energySources"
        :key="energy.value"
        :value-field="energy.value"
        :name="energy.name"
      />
      <DxMargin :bottom="20" />
      <DxArgumentAxis
        :value-margins-enabled="false"
        discrete-axis-division-mode="crossLabels"
      >
        <!-- <DxLabel overlapping-behavior="rotate" word-wrap="none" /> -->
        <DxGrid :visible="true" />
      </DxArgumentAxis>
      <DxLegend
        vertical-alignment="bottom"
        horizontal-alignment="center"
        item-text-position="bottom"
      />
      <!-- <DxExport :enabled="true"/> -->
      <DxTitle :text="dataName">
        <DxSubtitle text="(Millions of Tons, Oil Equivalent)" />
      </DxTitle>
      <!-- <DxTooltip :enabled="true"/> -->
    </DxChart>
  </div>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  //   DxExport,
  DxGrid,
  DxMargin,
  DxLegend,
  DxTitle,
  DxSubtitle,
  //   DxTooltip,
} from "devextreme-vue/chart";
// import DxSelectBox from 'devextreme-vue/select-box';
import { watchEffect, reactive, ref } from "vue";
import service from "./lineData.js";

export default {
  props: {
    wellDatas: {
      type: Array,
    },
    wellName: {
      type: String,
    },
  },

  components: {
    // DxSelectBox,
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    // DxExport,
    DxGrid,
    DxMargin,
    DxLegend,
    DxTitle,
    DxSubtitle,
    // DxTooltip,
  },
  setup(props) {
    console.log("lineChart---?", reactive(props.wellDatas));
    const dataSource = reactive({ list: [] });
    const energySources = service.getEnergySources();
    const type = "line";
    console.log("dataSource.list111-->", dataSource.list);
    let dataName = ref(null);
    watchEffect(async () => {
      dataName = await ref(props.wellName);
      console.log("dataName-->", dataName);
      dataSource.list = await reactive(props.wellDatas);
      console.log("dataSource.list5656-->", dataSource.list);
    });

    return {
      dataSource,
      energySources,
      type,
      dataName,
    };
  },
};
</script>
<style>
.options {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  margin-top: 20px;
}

.option {
  margin-top: 10px;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option > span {
  margin-right: 14px;
}

.option > .dx-widget {
  display: inline-block;
  vertical-align: middle;
}
</style>
