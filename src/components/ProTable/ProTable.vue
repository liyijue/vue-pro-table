<script lang="ts" setup>
import type { max } from "lodash";
import { ref } from "vue";
import ProForm from "../ProForm/ProForm.vue";

// TODO: any transform interface
const props = withDefaults(
  defineProps<{
    rowkey: string;
    columns: any;
    dataSource: any;
    rowSelection: any;
  }>(),
  {
    columns: [],
    dataSource: [],
    rowSelection: null,
  }
);

const formRef = ref();
const radioSelectKey = ref(undefined);
const checkSelectKeys = ref([]);

const handleRadioChange = (row: any) => {
  radioSelectKey.value = row[props.rowkey];
};
const handleSelectChange = (val: []) => {
  checkSelectKeys.value = val;
};
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
    <el-alert
      class="select_altert"
      type="info"
      :closable="false"
      v-if="checkSelectKeys.length > 0 && rowSelection?.type === 'checkbox'"
    >
      <template #default>
        <div class="select_altert_content">
          <slot name="tableAlertRender">
            <span>{{ `已选择 ${checkSelectKeys.length} 项 ` }}</span>
          </slot>
          <slot name="tableAlertOptionRender">
            <a
              style="cursor: pointer; font-size: 14px"
              @click="formRef.clearSelection()"
              >取消选择
            </a>
          </slot>
        </div>
      </template>
    </el-alert>
    <el-table
      style="width: 100%"
      ref="formRef"
      :data="dataSource"
      @selection-change="handleSelectChange"
    >
      <el-table-column
        v-if="rowSelection?.type === 'radio'"
        :width="Math.max(rowSelection?.width, 55)"
      >
        <template #default="{ row }">
          <el-radio
            :label="row[rowkey]"
            v-model="radioSelectKey"
            @change.native.stop="handleRadioChange(row)"
            >{{ "" }}</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column
        v-if="rowSelection?.type === 'checkbox'"
        type="selection"
        :width="Math.max(rowSelection?.width, 55)"
      />
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
  .select_altert /deep/ .el-alert__content {
    width: 100%;
    .select_altert_content {
      display: flex;
      justify-content: space-between;
    }
  }

  .pro_table_pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
