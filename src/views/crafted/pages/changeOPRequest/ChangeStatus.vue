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
          <el-button size="small" style="margin-left: 10px" type="primary" @click="changeStatus">
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
  <!--end::ChangeStatus-->
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {Actions} from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";


export default defineComponent({
  name: "changeStatus",
  props: {
    widgetClasses: String,
  },
  setup() {
    const {t, te} = useI18n();
    const translate = (text) =>  te(text) ? t(text) : text;
    const store = useStore();
    const currentStatus = computed(() => {
      const status = store.getters.getCurrentChangeOPRequestStatus;
      return status ? status.name : "";
    });
    onMounted(() => {
      const contractTypeName = store.getters.getCurrentChangeOPRequestContractTypeName;
      store.dispatch(Actions.GET_CHANGE_OP_REQUEST_STATUSES_WITH_PARAMS, contractTypeName);
    });
    const changeStatusOptions = ref(computed(() => {
      const statuses = store.getters.getCurrentChangeOPRequestStatuses;
      return statuses.flatMap(status =>
          (status.name === currentStatus.value) ? [] : [{value: status.url, label: status.name}])
    }));
    const value = ref('');

    const changeStatus = () => {
          let status: Array<string> = value.value.split("/");
          status.pop();
          const statusId: number = parseInt(status.pop() as string);
          const changeOPRequestId = store.getters.getCurrentChangeOPRequestId;
          const params = {
            status: statusId,
          };
          if (statusId) {
            store.dispatch(Actions.CHANGE_CHANGE_OP_REQUEST_STATUS, {
              resource: changeOPRequestId,
              params: params
            }).then(() => {
              Swal.fire({
                text: translate("changeStatusSuccess"),
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: translate("continue"),
                customClass: {
                  confirmButton: "btn fw-bold btn-light-success",
                },
                allowOutsideClick: false,
              }).then(() => location.reload());
            });
          } else {
            Swal.fire({
              text:  translate("mustSelectState"),
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: translate("tryAgain"),
              customClass: {
                confirmButton: "btn fw-bold btn-light-danger",
              },
            });
          }
        }
    ;
    return {
      translate,
      value,
      changeStatusOptions,
      currentStatus,
      changeStatus
    };
  },
});
</script>
b