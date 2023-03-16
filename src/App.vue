<script setup lang="ts">
import { reactive } from "vue";
import ProTable from "./components/ProTable/ProTable.vue";

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
    id: key,
    [`xxx${key + 1}`]: `我是第 ${key + 1} 行`,
  }))
);
</script>

<template>
  <div class="container">
    <pro-table
      rowkey="id"
      :columns="columns"
      :dataSource="dataSource"
      :rowSelection="{ type: 'checkbox' }"
    >
    </pro-table>
  </div>
</template>

<style scoped>
.container {
  width: 1600px;
  margin: 60px auto;
}
</style>
