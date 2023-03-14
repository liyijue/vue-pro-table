<script lang="ts" setup>
import { ArrowDownBold, ArrowUp } from "@element-plus/icons-vue";
import { ref } from "vue";
withDefaults(defineProps<{ columns: any }>(), { columns: [] });

const isExpand = ref(false);
</script>

<template>
  <el-card shadow="never" v-if="columns.length">
    <el-form class="pro_form" label-width="auto">
      <el-row :gutter="40">
        <el-col
          :xs="8"
          :sm="6"
          :md="6"
          :lg="4"
          v-for="col in columns"
          :key="columns.dataIndex"
        >
          <el-form-item :label="col.title" :name="col.dataIndex">
            <component
              :is="col.type || 'el-input'"
              placeholder="请输入"
              v-bind="col.filedProps"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="6" :md="6" :lg="4" :offset="isExpand ? 20 : 0">
          <el-form-item>
            <el-space>
              <el-button>重置</el-button>
              <el-button type="primary">查询</el-button>
              <div class="pro_form_expand" @click="isExpand = !isExpand">
                <template v-if="!isExpand">
                  <el-space>
                    <span>展开</span>
                    <el-icon><ArrowDownBold /></el-icon>
                  </el-space>
                </template>
                <template v-else>
                  <el-space>
                    <span>收起</span>
                    <el-icon><ArrowUp /></el-icon>
                  </el-space>
                </template>
              </div>
            </el-space>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<style lang="less" scoped>
.pro_form /deep/ .el-form-item__content {
  display: flex;
  justify-content: end;
}

.pro_form {
  .pro_form_expand {
    color: var(--blue);
    cursor: pointer;
  }
}
</style>
