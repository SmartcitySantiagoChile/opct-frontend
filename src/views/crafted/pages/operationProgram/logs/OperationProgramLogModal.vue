<template>
  <a
    :data-bs-target="`#logOp${id}`"
    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
    data-bs-toggle="modal"
    type="button"
  >
    <span class="svg-icon svg-icon-2">
      <inline-svg src="/media/icons/duotune/coding/cod002.svg" />
    </span>
  </a>
  <!--begin::OPLog-->
  <div :id="`logOp${id}`" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ translate("opLog") }}</h5>

          <!--begin::Close-->
          <div
            aria-label="Close"
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-2x"></span>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <!--begin::Tab Content-->
          <div class="tab-content">
            <!--begin::Tab panel-->
            <div
              id="`logOpActivity${id}`"
              aria-labelledby="kt_activity_today_tab"
              class="card-body p-0 tab-pane fade show active"
              role="tabpanel"
            >
              <!--begin::Timeline-->
              <div class="timeline">
                <template
                  v-for="(item, index) in opChangeDataLogs"
                  :key="index"
                >
                  <OperationProgramLog :changeOPDataLog="item">
                  </OperationProgramLog>
                </template>
              </div>
              <!--end::Timeline-->
            </div>
            <!--end::Tab panel-->
          </div>
          <!--end::Tab Content-->
        </div>

        <div class="modal-footer">
          <button class="btn btn-light" data-bs-dismiss="modal" type="button">
            {{ translate("back") }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--end::OPLog-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import { Swal } from "sweetalert2/dist/sweetalert2.min.js";
import OperationProgramLog from "@/views/crafted/pages/operationProgram/logs/OperationProgramLog.vue";

export default defineComponent({
  name: "opLogModal",
  props: {
    widgetClasses: String,
    url: String,
    id: String,
    opChangeDataLogs: Array,
  },
  components: { OperationProgramLog },
  setup: function (props) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const deleteOP = () => {
      Swal.fire({
        title: translate("secureToDeleteOp"),
        text: translate("cannotRevertOperation"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: translate("delete"),
        cancelButtonText: translate("cancel"),
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          store
            .dispatch(Actions.DELETE_OPERATION_PROGRAM, props.url)
            .then(function () {
              Swal.fire(
                translate("deleted"),
                translate("deleteOperationProgramSuccess"),
                "success"
              ).then(() => location.reload());
            })
            .catch(() => {
              const errors = store.getters.getCurrentOperationProgramErrors[0];
              const parsedErrors = Object.entries(errors).map((key) => {
                return `${translate(key[0])}: ${translate(key[1])}`;
              });
              Swal.fire({
                title: translate("deleteOpError"),
                text: parsedErrors,
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: translate("tryAgain"),
                customClass: {
                  confirmButton: "btn fw-bold btn-light-danger",
                },
              });
            });
        }
      });
    };
    return {
      translate,
      deleteOP,
    };
  },
});
</script>
b
