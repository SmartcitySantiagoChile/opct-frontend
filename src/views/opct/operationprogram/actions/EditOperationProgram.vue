<template>
  <a
    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
    :data-bs-target="`#editOp${id}`"
    data-bs-toggle="modal"
    type="button"
  >
    <span class="svg-icon svg-icon-2">
      <inline-svg src="/media/icons/duotune/art/art005.svg" />
    </span>
  </a>
  <!--begin::EditOP-->
  <div :id="`editOp${id}`" class="modal fade" tabindex="-1" ref="changeOPModalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ translate("editOP") }}:</h5>

          <!--begin::Close-->
          <div aria-label="Close" class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
            <span class="svg-icon svg-icon-2x"></span>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <div class="d-flex flex-column">
            <div class="d-flex flex-row-auto mb-4">
              <span class="m-4">{{ translate("changeOpDate") }} </span>
              <el-date-picker
                v-model="changeOpDateValue"
                :default-value="new Date(opDate)"
                :placeholder="opDate"
                type="date"
              >
                style="margin-left: 10px" >
              </el-date-picker>
            </div>
            <div class="d-flex flex-row">
              <span class="m-4">{{ translate("changeOpType") }}</span>
              <el-select
                v-model="changeOpTypeValue"
                :placeholder="translate('selectPlaceholder')"
                style="margin-left: 10px"
              >
                <el-option v-for="item in opTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-light" data-bs-dismiss="modal" type="button">
            {{ translate("cancel") }}
          </button>
          <button class="btn btn-primary" type="button" @click="editOP">
            {{ translate("update") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--end::EditOP-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { hideModal } from "@/core/helpers/dom";

export default defineComponent({
  name: "changeOP",
  props: {
    widgetClasses: String,
    url: String,
    opDate: String,
    opTypeName: String,
    id: Number,
  },
  emits: ["update-data"],
  setup: function (props, { emit }) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const changeOPModalRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      store.dispatch(Actions.GET_OPERATION_PROGRAM_TYPES);
    });

    const changeOpDateValue = ref("");
    const changeOpTypeValue = ref("");
    const opTypes = computed(() => {
      let opTypesOptions: Array<any> = [];
      const options = store.getters.getCurrentOperationProgramTypes;
      options.forEach((option) => {
        opTypesOptions.push({
          value: option.url,
          label: option.name,
        });
      });
      return opTypesOptions;
    });
    const editOP = () => {
      const params = {};
      if (changeOpDateValue.value) {
        params["start_at"] = new Date(changeOpDateValue.value).toISOString().split("T")[0];
      } else {
        params["start_at"] = props.opDate;
      }

      if (changeOpTypeValue.value) {
        params["op_type"] = changeOpTypeValue.value;
      }
      if (changeOpTypeValue.value || changeOpDateValue.value) {
        store
          .dispatch(Actions.UPDATE_OPERATION_PROGRAM, {
            url: props.url,
            params: params,
          })
          .then(function () {
            Swal.fire({
              title: translate("updateOpSuccess"),
              icon: "success",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              emit("update-data");
              hideModal(changeOPModalRef.value);
            });
          })
          .catch(() => {
            const errors = store.getters.getCurrentOperationProgramErrors;
            const parsedErrors = Object.entries(errors).map((key) => {
              return `<b>${translate(key[0])}</b>: ${translate(key[1])}<br><br>`;
            });
            Swal.fire({
              html: parsedErrors.join(""),
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: translate("tryAgain"),
              customClass: {
                confirmButton: "btn fw-bold btn-light-danger",
              },
            });
          });
      } else {
        Swal.fire({
          text: translate("noDataEdited"),
          icon: "info",
          buttonsStyling: false,
          confirmButtonText: translate("tryAgain"),
          customClass: {
            confirmButton: "btn fw-bold btn-light-info",
          },
        });
      }
    };
    return {
      translate,
      changeOpDateValue,
      changeOpTypeValue,
      opTypes,
      editOP,
      changeOPModalRef,
    };
  },
});
</script>
b
