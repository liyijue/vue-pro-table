<script lang="ts" setup>
import { reactive } from "vue";
import ProForm from "../ProForm/ProForm.vue";

const columns = reactive(
  Array.from({ length: 10 }, (_, key) => ({
    title: `xxx${key + 1}`,
    dataIndex: `xxx${key + 1}`,
    filedProps: {
      placeholder: "测试",
    },
  }))
);

const dataSource = reactive(
  Array.from({ length: 10 }, (_, key) => ({
    [`xxx${key + 1}`]: `我是第 ${key + 1} 行`,
  }))
);
</script>

<template>
  <pro-form :columns="columns"></pro-form>
  <el-card class="pro_table_container">
    <div class="pro_table_header">
      <div class="left">
        <slot name="headerTitle">
          <div>表格标题 (预留)</div>
        </slot>
      </div>
      <div class="right">
        <slot name="toolBar">
          <div>工具栏 (预留)</div>
        </slot>
      </div>
    </div>
    <el-table :data="dataSource" style="width: 100%">
      <el-table-column
        v-for="col in columns"
        :prop="col.dataIndex"
        :label="col.title"
      />
    </el-table>
    <el-pagination
      class="pro_table_pagination"
      layout="prev, pager, next"
      :total="dataSource.length"
      :page-size="5"
    />
  </el-card>
</template>

<style lang="less" scoped>
.pro_table_container {
  margin-top: 20px;
  .pro_table_header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      flex: 1;
      display: flex;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
  .pro_table_pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
