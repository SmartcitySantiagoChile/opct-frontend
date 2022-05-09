<template>
  <a
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#change_request_status_modal"
    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
  >
    <span class="svg-icon svg-icon-2">
      <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
    </span>
  </a>
  <!--begin::ChangeStatus-->
  <div class="modal fade" tabindex="-1" id="change_request_status_modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ translate("changeOPRequests") }}</h5>

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
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table
              class="table align-middle table-rounded table-striped border"
            >
              <!--begin::Table head-->
              <thead>
                <tr
                  class="
                    fw-bold
                    fs-5
                    align-middle
                    text-gray-800
                    border-bottom-2 border-gray-200
                  "
                >
                  <th class="ps-4 rounded-start">
                    {{ translate("Id") }}
                  </th>
                  <th class="ps-4 min-w-100px rounded-start">
                    {{ translate("changeOPRequest") }}
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
                <template
                  v-for="(item, index) in currentChangeOPRequests"
                  :key="index"
                >
                  <tr
                    class="
                      fw-bold
                      fs-5
                      align-middle
                      text-gray-800
                      border-bottom-2 border-gray-200
                    "
                  >
                    <td class="ps-4 rounded-start">
                      {{
                        item.request.url
                          .split("change-op-requests/")[1]
                          .slice(0, -1)
                      }}
                    </td>
                    <td class="ps-4 min-w-50px rounded-start">
                      {{ item.request.title }}
                    </td>
                    <td class="ps-4 min-w-50px rounded-start">
                      <template v-if="hasChangeStatusOption">
                        <el-select
                          v-model="opSelectValues[index]"
                          :placeholder="item.request.op.start_at"
                        >
                          <el-option
                            v-for="op in item.ops"
                            :key="op.url"
                            :label="op.start_at"
                            :value="op.url"
                          >
                          </el-option>
                        </el-select>
                      </template>
                      <template v-else>
                        <template v-if="item.request.op">
                          {{ item.request.op.start_at }} ({{
                            item.request.op.op_type.name
                          }})
                        </template>
                        <template v-else>
                          {{ translate("withoutAssign") }}
                        </template>
                      </template>
                    </td>
                    <td class="ps-4 min-w-50px rounded-start">
                      <template v-if="hasChangeStatusOption">
                        <el-select
                          v-model="reasonSelectValues[index]"
                          :placeholder="item.request.reason"
                        >
                          <el-option
                            v-for="reason in item.reasons"
                            :key="reason[0]"
                            :label="reason[1]"
                            :value="reason[0]"
                          >
                          </el-option>
                        </el-select>
                      </template>
                      <template v-else>
                        {{ item.request.reason }}
                      </template>
                    </td>
                    <td>
                      <template v-if="hasChangeStatusOption">
                        <el-select
                          v-model="statusSelectValues[index]"
                          :placeholder="item.request.status.name"
                        >
                          <el-option
                            v-for="status in item.statuses"
                            :key="status.url"
                            :label="status.name"
                            :value="status.url"
                          >
                          </el-option>
                        </el-select>
                      </template>
                      <template v-else>
                        {{ item.request.status.name }}
                      </template>
                    </td>
                    <td></td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-footer">
          <template v-if="hasChangeStatusOption">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              {{ translate("cancel") }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="changeRequests"
            >
              {{ translate("save") }}
            </button>
          </template>
          <template v-else>
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              {{ translate("continue") }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
  <!--end::ChangeStatus-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "changeOPRequestsStatus",
  props: ["widgetClasses", "hasChangeStatusOption"],
  setup: function (props) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();

    onMounted(() => {
      // Call actions to get all selectors data to use in modal
      store.dispatch(Actions.GET_CHANGE_OP_REQUEST_STATUSES);
      store.dispatch(Actions.GET_OPERATION_PROGRAMS);
      store.dispatch(Actions.GET_CHANGE_OP_REQUEST_REASONS);
    });

    // Create selectors lists.
    const statusSelectValues: string[] = reactive([]);
    const opSelectValues: string[] = reactive([]);
    const reasonSelectValues: string[] = reactive([]);

    // Process current change op requests to create selectors with no repeated data.
    const currentChangeOPRequests = computed(() => {
      // Get selectors data.
      const requests = store.getters.getCurrentChangeOPProcessRequests;
      const statuses = store.getters.getCurrentChangeOPRequestStatuses;
      const ops = store.getters.getCurrentOperationPrograms;
      const reasons = store.getters.getChangeOPRequestReason;
      const currentContractType =
        store.getters.getCurrentChangeOPProcessContractTypeName;
      const requestsWithSelectors: any[] = [];
      // Process change op request only when the selector data exist.
      if (requests && currentContractType && reasons) {
        requests.forEach((request) => {
          // Process status selector data
          const requestStatuses = JSON.parse(JSON.stringify(statuses)).filter(
            (status) =>
              status.name != request.status.name &&
              status.contract_type.name === currentContractType
          );
          // Process op selector data
          const requestOps = JSON.parse(JSON.stringify(ops)).filter(
            (op) => op.start_at != request.op.start_at
          );

          //Process reason selector data
          const requestReasons = JSON.parse(JSON.stringify(reasons)).filter(
            (reason) => reason[1] != request.reason
          );
          // Add processed data to return statement,
          requestsWithSelectors.push({
            request: request,
            statuses: requestStatuses,
            ops: requestOps,
            reasons: requestReasons,
          });
          // Add empty values to selector lists.
          statusSelectValues.push("");
          opSelectValues.push("");
          reasonSelectValues.push("");
        });
      }
      return requestsWithSelectors;
    });
    const value = ref("");

    const changeRequests = () => {
      const requestStatus: any[] = [];
      const requestOps: any[] = [];
      const requestReasons: any[] = [];
      let requestsArray: any[] = [];

      // Create GET request for all status selector edited.
      statusSelectValues.forEach((status, index) => {
        let currentStatus: Array<string> = status.split("/");
        currentStatus.pop();
        const statusId: number = parseInt(currentStatus.pop() as string);
        let changeOPRequest =
          currentChangeOPRequests.value[index].request.url.split("/");
        changeOPRequest.pop();
        const changeOPRequestId: number = parseInt(
          changeOPRequest.pop() as string
        );
        const params = {
          params: {
            status: statusId,
          },
          requestId: changeOPRequestId,
        };
        if (statusId) {
          requestStatus.push(params);
        }
      });
      // Add status GET requests to request list.
      if (requestStatus) {
        requestStatus.forEach((param) => {
          requestsArray.push(
            store.dispatch(Actions.CHANGE_CHANGE_OP_REQUEST_STATUS, {
              resource: param.requestId,
              params: param.params,
            })
          );
        });
      }
      // Create GET request for all op selector edited.
      opSelectValues.forEach((op, index) => {
        let currentOp: Array<string> = op.split("/");
        currentOp.pop();
        const opId: number = parseInt(currentOp.pop() as string);
        let changeOPRequest =
          currentChangeOPRequests.value[index].request.url.split("/");
        changeOPRequest.pop();
        const changeOPRequestId: number = parseInt(
          changeOPRequest.pop() as string
        );
        const params = {
          params: {
            op: opId,
          },
          requestId: changeOPRequestId,
        };
        if (opId) {
          requestOps.push(params);
        }
      });
      // Add op GET requests to request list.
      if (requestOps) {
        requestOps.forEach((param) => {
          requestsArray.push(
            store.dispatch(Actions.CHANGE_CHANGE_OP_REQUEST_OP, {
              resource: param.requestId,
              params: param.params,
            })
          );
        });
      }
      // Create GET request for all status selector edited.
      reasonSelectValues.forEach((reason, index) => {
        let changeOPRequest =
          currentChangeOPRequests.value[index].request.url.split("/");
        changeOPRequest.pop();
        const changeOPRequestId: number = parseInt(
          changeOPRequest.pop() as string
        );
        const params = {
          params: {
            reason: reason,
          },
          requestId: changeOPRequestId,
        };
        if (reason) {
          requestReasons.push(params);
        }
      });
      // Add status GET requests to request list.
      if (requestReasons) {
        requestReasons.forEach((param) => {
          requestsArray.push(
            store.dispatch(Actions.CHANGE_CHANGE_OP_REQUEST_REASON, {
              resource: param.requestId,
              params: param.params,
            })
          );
        });
      }
      // Send all requests.
      Promise.all(requestsArray)
        .then(
          Swal.fire({
            text: translate("changeStatusSuccess"),
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: translate("continue"),
            customClass: {
              confirmButton: "btn fw-bold btn-light-success",
            },
            allowOutsideClick: false,
          }).then(() => location.reload())
        )
        .catch(() => {
          Swal.fire({
            text: translate("genericError"),
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: translate("tryAgain"),
            customClass: {
              confirmButton: "btn fw-bold btn-light-danger",
            },
          });
        });
    };
    return {
      translate,
      value,
      changeRequests,
      currentChangeOPRequests,
      statusSelectValues,
      opSelectValues,
      reasonSelectValues,
    };
  },
});
</script>
b
