<script setup lang="ts">
import { reactive, ref } from "vue";
import ProTable from "./components/ProTable/ProTable.vue";

const columns = reactive(
  Array.from({ length: 10 }, (_, key) => ({
    title: `xxx${key + 1}`,
    dataIndex: `content${key}`,
    filedProps: {
      placeholder: "测试",
    },
  }))
);
const dataSource = ref([{ content: 123 }]);

const fetchDataRequest = (
  data: {
    pageSize: number;
    current: number;
  },
  callback: (data: any) => void
) => {
  fetch(
    `http://localhost:8080/list?pageSize=${data.pageSize}&current=${data.current}`,
    { method: "GET" }
  )
    .then((response) => response.json())
    .then((data) =>
      callback({
        loading: data?.code === 200,
        dataSource: data?.data?.list,
        total: data?.data?.total,
      })
    );
};
</script>

<template>
  <div class="container">
    <pro-table
      rowkey="id"
      :dataSource="dataSource"
      :total="dataSource.length"
      :columns="columns"
      :rowSelection="{ type: 'checkbox' }"
      @request="fetchDataRequest"
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
