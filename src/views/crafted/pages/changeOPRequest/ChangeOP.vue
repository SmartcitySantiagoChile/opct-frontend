<template>
  <!--begin::ChangeOP-->
  <div class="border">
    <div :class="widgetClasses" class="card">
      <!--begin::Body-->
      <div class="card-body pb-3">
        <!--begin::Header-->
        <el-header>
          {{ translate("changeOP") }}:
          <el-select v-model="value" :placeholder="currentOP" style="margin-left: 10px">
            <el-option
                v-for="item in changeOPOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-button size="small" style="margin-left: 10px" type="primary" @click="changeOP">
            {{ translate("send") }}
          </el-button>
        </el-header>
        <!--end::Header-->

        <!--begin::Form-->
        <!--end::Form-->
      </div>
      <!--end::Body-->
    </div>
    <!--end::Feeds changeOP-->
  </div>
  <!--end::ChangeOP-->
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {Actions} from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";


export default defineComponent({
  name: "changeOP",
  props: {
    widgetClasses: String,
  },
  setup() {
    const {t, te} = useI18n();
    const translate = (text) =>  te(text) ? t(text) : text;
    const store = useStore();
    const currentOP = computed(() => {
      const op = store.getters.getCurrentChangeOPRequestOP;
      return op ? op : "";
    });
    onMounted(() => {
      store.dispatch(Actions.GET_OPERATION_PROGRAMS);
    });
    const changeOPOptions = ref(computed(() => {
      const operationPrograms = store.getters.getCurrentOperationPrograms;
      return operationPrograms.flatMap(operationProgram =>
          (operationProgram.start_At === currentOP.value) ? [] : [{value: operationProgram.url, label: operationProgram.start_at}])
    }));
    const value = ref('');

    const changeOP = () => {
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
                text: "Estado cambiado exitosamente",
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
              text: "Debe seleccionar un estado",
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
      changeOPOptions,
      currentOP,
      changeOP
    };
  },
});
</script>
b