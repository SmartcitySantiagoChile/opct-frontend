<template>
  <!--begin::ChangeStatus-->
  <div class="border">
    <div :class="widgetClasses" class="card">
      <!--begin::Body-->
      <div class="card-body pb-3">
        <!--begin::Header-->
        <el-header>
          {{ translate("changeStatus") }}:
          <el-select v-model="value" :placeholder="currentStatus" style="margin-left: 10px">
            <el-option
                v-for="item in changeStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-button size="small" style="margin-left: 10px" type="primary">
            {{ translate("send") }}
          </el-button>
        </el-header>
        <!--end::Header-->

        <!--begin::Form-->
        <!--end::Form-->
      </div>
      <!--end::Body-->
    </div>
    <!--end::Feeds ChangeStatus-->
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {Actions} from "@/store/enums/StoreEnums";


export default defineComponent({
  name: "changeStatus",
  props: {
    widgetClasses: String,
  },
  setup() {
    const {t, te} = useI18n();
    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const store = useStore();
    const currentStatus = computed(() => {
      const status = store.getters.getCurrentChangeOPRequestStatus;
      if (status) {
        return status.name
      } else {
        return "";
      }
    });
    const changeStatusOptions = ref(computed(() => {
      const contractTypeName = store.getters.getCurrentChangeOPRequestContractTypeName;
      store.dispatch(Actions.GET_CHANGE_OP_REQUEST_STATUSES_WITH_PARAMS, contractTypeName);
      const statuses = store.getters.getCurrentChangeOPRequestStatuses;
      return statuses.flatMap(status =>
          (status.name === currentStatus.value) ? [] : [{value: status.url, label: status.name}])
    }));

    const value = ref('');
    return {
      translate,
      value,
      changeStatusOptions,
      currentStatus
    };
  },
});
</script>
