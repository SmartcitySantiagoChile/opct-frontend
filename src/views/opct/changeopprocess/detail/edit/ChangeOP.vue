<template>
  <a
    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
    data-bs-target="#change_op"
    data-bs-toggle="modal"
    type="button"
  >
    <span class="svg-icon svg-icon-2"> <inline-svg src="/media/icons/duotune/art/art005.svg" /> </span>
  </a>
  <!--begin::ChangeOP-->
  <div id="change_op" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ translate("changeOP") }}:</h5>

          <!--begin::Close-->
          <div aria-label="Close" class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
            <span class="svg-icon svg-icon-2x"></span>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <el-select v-model="value" :placeholder="currentOP" style="margin-left: 10px">
            <el-option v-for="item in changeOPOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="modal-footer">
          <button class="btn btn-light" data-bs-dismiss="modal" type="button">
            {{ translate("cancel") }}
          </button>
          <button class="btn btn-primary" type="button" @click="changeOP">
            {{ translate("send") }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--end::ChangeOP-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "changeOP",
  props: {
    widgetClasses: String,
  },
  setup: function () {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const currentOP = computed(() => {
      const op = store.getters.getCurrentChangeOPProcessOP;
      return op ? op : translate("withoutAssign");
    });

    onMounted(() => {
      store.dispatch(Actions.GET_OPERATION_PROGRAMS);
    });
    const changeOPOptions = ref(
      computed(() => {
        const operationPrograms = store.getters.getCurrentOperationPrograms;
        let options = operationPrograms.flatMap((operationProgram) =>
          operationProgram.start_at === currentOP.value
            ? []
            : [
                {
                  value: operationProgram.url,
                  label: operationProgram.start_at + " (" + operationProgram.op_type.name + ")",
                },
              ]
        );
        if (currentOP.value !== translate("withoutAssign")) {
          options.push({ value: "None", label: translate("deallocateOP") });
        }
        return options;
      })
    );
    const value = ref("");

    const changeOP = () => {
      let op: Array<string> = [];
      if (value.value !== "None") {
        op = value.value.split("/");
        op.pop();
      } else {
        op = ["None"];
      }
      let opId: string = op.pop() as string;
      const changeOPProcessId = store.getters.getCurrentChangeOPProcessId;
      const params = {
        op: opId === "None" ? null : opId,
        update_deadlines: false,
      };
      if (opId && opId !== "None") {
        Swal.fire({
          title: translate("wantToUpdateDeadlines"),
          icon: "info",
          showCancelButton: true,
          confirmButtonText: translate("update"),
          cancelButtonText: translate("notUpdate"),
          customClass: {
            confirmButton: "btn fw-bold btn-light-success",
            cancelButton: "btn fw-bold btn-light-danger",
          },
          allowOutsideClick: false,
        })
          .then((result) => {
            if (result.isConfirmed) {
              params["update_deadlines"] = true;
            }
            store.dispatch(Actions.CHANGE_CHANGE_OP_PROCESS_OP, {
              resource: changeOPProcessId,
              params: params,
            });
            return result;
          })
          .then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: translate("changeOPSuccess"),
                message: translate("deadlinesUpdated"),
                icon: "success",
              });
            } else {
              Swal.fire({
                title: translate("changeOPSuccess"),
                message: translate("deadlinesNotUpdated"),
                icon: "success",
              });
            }
          })
          .then(() => location.reload());
      } else if (opId === "None") {
        store
          .dispatch(Actions.CHANGE_CHANGE_OP_PROCESS_OP, {
            resource: changeOPProcessId,
            params: params,
          })
          .then(() => {
            Swal.fire({
              title: translate("changeOPSuccess"),
              icon: "success",
            });
          })
          .then(() => location.reload());
      } else {
        Swal.fire({
          text: translate("mustSelectOP"),
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
      changeOPOptions,
      currentOP,
      changeOP,
    };
  },
});
</script>
b
