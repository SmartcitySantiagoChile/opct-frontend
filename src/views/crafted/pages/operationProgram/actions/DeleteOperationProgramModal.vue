<template>
  <a :onclick="deleteOP" class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" type="button">
    <span class="svg-icon svg-icon-2">
      <inline-svg src="/media/icons/duotune/general/gen027.svg" />
    </span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "changeOP",
  props: {
    widgetClasses: String,
    url: String,
  },
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
              Swal.fire(translate("deleted"), translate("deleteOperationProgramSuccess"), "success").then(() =>
                location.reload()
              );
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
