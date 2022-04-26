<template>
  <a
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#change_status_modal"
    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
  >
    <span class="svg-icon svg-icon-2">
      <inline-svg src="/media/icons/duotune/art/art005.svg" />
    </span>
  </a>
  <!--begin::ChangeStatus-->
  <div class="modal fade" tabindex="-1" id="change_status_modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ translate("changeStatus") }}</h5>

          <!--begin::Close-->
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span class="svg-icon svg-icon-2x"></span>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <el-select
            v-model="value"
            :placeholder="currentStatus"
            style="margin-left: 10px"
          >
            <el-option
              v-for="item in changeStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            {{ translate("cancel") }}
          </button>
          <button type="button" class="btn btn-primary" @click="changeStatus">
            {{ translate("send") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--end::ChangeStatus-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "changeStatus",
  props: {
    widgetClasses: String,
  },
  setup() {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const currentStatus = computed(() => {
      const status = store.getters.getCurrentChangeOPProcessStatus;
      return status ? status.name : "";
    });
    onMounted(() => {
      const contractTypeName =
        store.getters.getCurrentChangeOPProcessContractTypeName;
      store.dispatch(
        Actions.GET_CHANGE_OP_PROCESS_STATUSES_WITH_PARAMS,
        contractTypeName
      );
    });
    const changeStatusOptions = ref(
      computed(() => {
        const statuses = store.getters.getCurrentChangeOPProcessStatuses;
        return statuses.flatMap((status) =>
          status.name === currentStatus.value
            ? []
            : [{ value: status.url, label: status.name }]
        );
      })
    );
    const value = ref("");

    const changeStatus = () => {
      let status: Array<string> = value.value.split("/");
      status.pop();
      const statusId: number = parseInt(status.pop() as string);
      const changeOPProcessId = store.getters.getCurrentChangeOPProcessId;
      const params = {
        status: statusId,
      }
      if (statusId) {
        store
          .dispatch(Actions.CHANGE_CHANGE_OP_PROCESS_STATUS, {
            resource: changeOPProcessId,
            params: params,
          })
          .then(() => {
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
          text: translate("changeStatusError"),
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: translate("tryAgain"),
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          },
        });
      }
    };
    return {
      translate,
      value,
      changeStatusOptions,
      currentStatus,
      changeStatus,
    };
  },
});
</script>
b
