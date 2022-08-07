<template>
  <a
    @click="setModal"
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#change_status_modal"
    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
  >
    <span class="svg-icon svg-icon-2"> <inline-svg src="/media/icons/duotune/art/art005.svg" /> </span>
  </a>
  <!--begin::ChangeStatus-->
  <div class="modal fade" tabindex="-1" id="change_status_modal" ref="statusModalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ translate("changeStatus") }}</h5>

          <!--begin::Close-->
          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
            <span class="svg-icon svg-icon-2x"></span>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <el-select v-model="value" :placeholder="translate('selectPlaceholder')">
            <el-option v-for="item in changeStatusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            {{ translate("cancel") }}
          </button>
          <button type="button" class="btn btn-primary" @click="changeStatus">
            {{ translate("update") }}
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
import { hideModal } from "@/core/helpers/dom";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "changeStatus",
  props: {
    widgetClasses: String,
  },
  emits: ["status-updated"],
  setup(props, { emit }) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const value = ref("");
    const statusModalRef = ref<HTMLElement | null>(null);
    const currentStatus = computed(() => store.getters.getCurrentChangeOPProcessStatus);

    const changeStatusOptions = computed(() => {
      const statuses = store.getters.getCurrentChangeOPProcessStatuses;
      if (statuses) {
        return statuses.map((status) => ({ value: status.id, label: status.name }));
      }
      return [];
    });

    onMounted(() => {
      const contractTypeName = store.getters.getCurrentChangeOPProcessContractTypeName;
      store.dispatch(Actions.GET_CHANGE_OP_PROCESS_STATUSES_WITH_PARAMS, contractTypeName);
    });

    const setModal = () => {
      value.value = currentStatus.value.id;
    };

    const changeStatus = () => {
      const changeOPProcessId = store.getters.getCurrentChangeOPProcessId;
      const params = {
        status: value.value,
      };

      store
        .dispatch(Actions.CHANGE_OP_PROCESSES.UPDATE_STATUS, {
          resource: changeOPProcessId,
          params: params,
        })
        .then(() => {
          Swal.fire({
            text: translate("changeStatusSuccess"),
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            emit("status-updated");
            hideModal(statusModalRef.value);
          });
        });
    };
    return {
      translate,
      value,
      changeStatusOptions,
      changeStatus,
      statusModalRef,
      setModal,
    };
  },
});
</script>
