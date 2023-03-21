<script lang="ts" setup>
import { ArrowDownBold, ArrowUp } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { calculateExpandSpanMaxIndex } from "../../utils/utils";
import "element-plus/theme-chalk/display.css";

const props = withDefaults(defineProps<{ columns: any; span: any }>(), {
  columns: [],
  span: { xs: 8, sm: 6, md: 6, lg: 4, xl: 4 },
});

const ruleFormRef = ref<FormInstance>();
const isExpand = ref(false);
const hiddenLayoutIndex = reactive(calculateExpandSpanMaxIndex(props.span));
const form = reactive<any>({});

const handleReset = () => {
  ruleFormRef.value?.resetFields();
};
const handleSubmit = () => {
  console.log(form);
};
</script>

<template>
  <el-card shadow="never" v-if="columns.length">
    <el-form
      :model="form"
      ref="ruleFormRef"
      class="pro_form"
      label-width="auto"
    >
      <el-row :gutter="40">
        <el-col
          v-bind="span"
          v-for="(col, index) in columns"
          :key="columns.dataIndex"
          :class="{
            'hidden-xl-only': index > hiddenLayoutIndex.lg && !isExpand,
            'hidden-lg-only': index > hiddenLayoutIndex.lg && !isExpand,
            'hidden-md-only': index > hiddenLayoutIndex.md && !isExpand,
            'hidden-sm-only': index > hiddenLayoutIndex.sm && !isExpand,
            'hidden-xs-and-down': index > hiddenLayoutIndex.xs && !isExpand,
          }"
        >
          <el-form-item
            :label="col.title"
            :name="col.dataIndex"
            :prop="col.dataIndex"
          >
            <component
              v-model="form[col.dataIndex]"
              :is="col.type || 'el-input'"
              placeholder="请输入"
              v-bind="col.filedProps"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="8" :sm="6" :md="6" :lg="4" :offset="isExpand ? 20 : 0">
          <el-form-item>
            <el-space>
              <el-button @click="handleReset">重置</el-button>
              <el-button type="primary" @click="handleSubmit">查询</el-button>
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
