<template>
  <a
    @click="prepareModalData"
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#change_request_status_modal"
    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
  >
    <span class="svg-icon svg-icon-2"> <inline-svg src="/media/icons/duotune/arrows/arr064.svg" /> </span>
  </a>
  <!--begin::ChangeStatus-->
  <div class="modal fade" tabindex="-1" id="change_request_status_modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <h5 class="modal-title">{{ translate("changeOPRequests") }}</h5>
          </div>
          <!--begin::Close-->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table class="table align-middle table-rounded table-striped border">
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bold fs-5 align-middle text-gray-800 border-bottom-2 border-gray-200">
                  <th class="ps-4 rounded-start">
                    {{ translate("Id") }}
                  </th>
                  <th class="ps-4 min-w-100px rounded-start">
                    {{ translate("title") }}
                  </th>
                  <th class="ps-4 min-w-100px rounded-start">
                    {{ translate("relatedRoutes") }}
                  </th>
                  <th class="ps-4 min-w-100px rounded-start">
                    {{ translate("operationProgram") }}
                  </th>
                  <th class="ps-4 min-w-100px rounded-start">
                    {{ translate("reason") }}
                  </th>
                  <th class="ps-4 min-w-100px rounded-start">
                    {{ translate("status") }}
                  </th>
                  <th class="ps-4 min-w-100px rounded-start">
                    {{ translate("relatedRequests") }}
                  </th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody>
                <template v-for="(item, index) in requestsToEdit" :key="index">
                  <tr class="fw-bold fs-5 align-middle text-gray-800 border-bottom-2 border-gray-200">
                    <td class="ps-4 rounded-start">
                      {{ item.id }}
                    </td>
                    <td class="ps-4 min-w-50px rounded-start">
                      <el-input v-model="item.title" :placeholder="translate('title')" :disabled="item.id !== null" />
                    </td>
                    <td class="ps-4 min-w-50px rounded-start">
                      <el-select
                        v-model="item.related_routes"
                        multiple
                        filterable
                        :disabled="!enableEdition"
                        collapse-tags
                        collapse-tags-tooltip
                        style="width: 200px"
                      >
                        <el-option
                          v-for="route in routeDefinitionsOption"
                          :key="route.value"
                          :label="route.label"
                          :value="route.value"
                        >
                        </el-option>
                      </el-select>
                    </td>
                    <td class="ps-4 min-w-50px rounded-start">
                      <el-select
                        v-model="item.operation_program"
                        :placeholder="translate('withoutOP')"
                        :disabled="!enableEdition"
                      >
                        <el-option v-for="op in OPOptions" :key="op.value" :label="op.label" :value="op.value">
                        </el-option>
                      </el-select>
                    </td>
                    <td class="ps-4 min-w-50px rounded-start">
                      <el-select v-model="item.reason" :disabled="!enableEdition">
                        <el-option
                          v-for="reason in reasonOptions"
                          :key="reason.value"
                          :label="reason.label"
                          :value="reason.value"
                        >
                        </el-option>
                      </el-select>
                    </td>
                    <td>
                      <el-select v-model="item.status" :disabled="!enableEdition">
                        <el-option
                          v-for="status in statusOption"
                          :key="status.value"
                          :label="status.label"
                          :value="status.value"
                        >
                        </el-option>
                      </el-select>
                    </td>
                    <td></td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <button class="btn btn-success" v-show="enableEdition" @click="addNewRow">
            {{ translate("createChangeOPRequest") }}
          </button>
        </div>

        <div class="modal-footer">
          <template v-if="enableEdition">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              {{ translate("cancel") }}
            </button>
            <button type="button" class="btn btn-primary" @click="updateRequests">
              {{ translate("save") }}
            </button>
          </template>
          <template v-else>
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              {{ translate("close") }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
  <!--end::ChangeStatus-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
//import Swal from "sweetalert2/dist/sweetalert2.min.js";
//import { cloneDeep } from "lodash";
import { OperationProgramOption, SelectOption } from "@/typings/globals.d.ts";
//import { ChangeOPRequest } from "@/store/modules/ChangeOPRequestModule";

interface ChangeOPRequestToEdit {
  id: number | null;
  title: string;
  status: string;
  operation_program: string;
  reason: string;
  related_routes: Array<string>;
  related_requests: Array<string>;
}

export default defineComponent({
  name: "changeOPRequestsStatus",
  props: ["widgetClasses", "enableEdition"],
  emits: ["change-op-requests-updated"],
  setup(props) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const changeOPProcessId = computed(() => store.getters.getCurrentChangeOPProcessId);
    const requestsToEdit: Ref<Array<ChangeOPRequestToEdit>> = ref([]);

    const reasonOptions = computed(() => {
      const reasons: Array<Array<string>> = store.getters.getChangeOPRequestReason;
      if (reasons.length) {
        return reasons.map((v) => ({ value: v[0], label: v[1] }));
      }
      return [];
    });

    const OPOptions = computed(() => {
      const operationPrograms = store.getters.getCurrentOperationPrograms;
      let options: Array<OperationProgramOption> = [];
      if (operationPrograms.length && props.enableEdition) {
        operationPrograms.forEach((operationProgram) => {
          options.push({
            value: operationProgram.url,
            label: operationProgram.start_at + " (" + operationProgram.op_type.name + ")",
            release: operationProgram.start_at,
          });
        });
      }
      options.push({ value: "withoutOP", label: translate("withoutOP"), release: "" });
      return options;
    });

    const routeDefinitionsOption = computed(() => {
      const routeDefinitions = store.getters.getAllRouteDefinitions;
      let options: Array<SelectOption> = [];
      if (routeDefinitions.length) {
        routeDefinitions.forEach((routeDefinition) => {
          options.push({ value: routeDefinition.auth_route_code, label: routeDefinition.auth_route_code });
        });
      }
      return options;
    });

    const statusOption = computed(() => {
      const currentContractType = store.getters.getCurrentChangeOPProcessContractTypeName;
      return store.getters.getCurrentChangeOPRequestStatuses
        .filter((status) => status.contract_type.name === currentContractType)
        .map((status) => ({ value: status.url, label: status.name }));
    });

    onMounted(() => {
      // Call actions to get all selector data to use in modal
      store.dispatch(Actions.GET_ROUTE_DEFINITIONS);
      store.dispatch(Actions.GET_CHANGE_OP_REQUEST_STATUSES);
      store.dispatch(Actions.GET_OPERATION_PROGRAMS);
      store.dispatch(Actions.GET_CHANGE_OP_REQUEST_REASONS);
    });

    const prepareModalData = () => {
      console.log("preparing data...");
      const requests = store.getters.getCurrentChangeOPProcessRequests;
      requestsToEdit.value.splice(0);
      if (requests) {
        requests.forEach((el) => {
          requestsToEdit.value.push({
            id: el.id,
            title: el.title,
            status: el.status.url,
            related_routes: el.related_routes,
            operation_program: el.operation_program ? el.operation_program.url : null,
            reason: el.reason,
            related_requests: el.related_requests,
          });
        });
      }
    };

    const addNewRow = () => {
      requestsToEdit.value.push({
        id: null,
        title: "",
        status: "",
        related_routes: [],
        related_requests: [],
        operation_program: "",
        reason: "",
      });
    };

    const updateRequests = () => {
      requestsToEdit.value.forEach((request) => {
        if (request.id === null) {
          store.dispatch(Actions.CHANGE_OP_PROCESSES.CREATE_CHANGE_OP_REQUEST, {
            resource: changeOPProcessId.value,
            params: { change_op_request: request },
          });
        } else {
          //store.dispatch(Actions.CHANGE_OP_REQUESTS, {resource: param.resourceId, param.params})
        }
      });
    };

    return {
      translate,
      reasonOptions,
      OPOptions,
      routeDefinitionsOption,
      statusOption,
      updateRequests,
      prepareModalData,
      requestsToEdit,
      addNewRow,
    };
  },
});
</script>
b
