<template>
  <div class="hello">
    <!-- 初始化echarts -->
    <div
      ref="mapbox"
      style="height:400px;width:600px;background-color:#f8f9fa"
    ></div>
  </div>
</template>

<script>
import "echarts/map/js/china.js";
import areaData from "../data/area.json";
import buildOrigin from '../scripts/build-origin.js'

export default {
  data() {
    return {
      title: "2020新型冠状病毒疫情地图",
      mapData: [
        {
          name: "广东",
          value: 1000
        }
      ]
    };
  },
  name: "HelloWorld",
  created() {
    this.updateDate();
  },

  mounted() {
    let mychart = this.$echarts.init(this.$refs.mapbox);
    mychart.setOption({
      title: {
        text: this.title,
        link: "https://ncov.dxy.cn/ncovh5/view/pneumonia_peopleapp"
      },
      tooltip: {
        trigger: "item",
        formatter: "地区：{b}<br/>确诊：{c}"
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      visualMap: {
        type: "piecewise",
        pieces: [
          { gte: 10000, color: "#660208" }, // (1500, Infinity]
          { gte: 1000, lte: 9999, color: "#8c0d0d" }, // (900, 1500]
          { gte: 100, lte: 999, color: "#cc2929" }, // (310, 1000]
          { gte: 10, lte: 99, color: "#ff7b69" }, // (200, 300]
          { gte: 1, lte: 9, color: "#ffaa85" }, // (10, 200]
          { value: 0, color: "#ffffff" } // (-Infinity, 5)
        ],
        itemGap: 1
      },
      series: {
        type: "map",
        map: "china",
        label: {
          show: true,
          fontSize: 7
        },
        emphasis: {
          itemStyle: {
            areaColor: "#c7fffd"
          }
        },
        data: this.mapData
      }
    });
    console.log(areaData);
    window["_test"] = this;
  },
  methods: {
    getData() {
      this.mapData = areaData.map(item => {
        const result = {};
        result.name = item.provinceShortName;
        result.value = item.currentConfirmedCount;
        return result;
      });
      console.log("this.mapData", this.mapData);
    },
    async updateDate(){
       this.getData()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
