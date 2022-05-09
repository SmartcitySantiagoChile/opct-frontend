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
                        <!--                      <el-select-->
                        <!--                        v-model="opSelectValues[index]"-->
                        <!--                        :placeholder="item.request.op.start_at"-->
                        <!--                      >-->
                        <!--                        <el-option-->
                        <!--                          v-for="op in item.ops"-->
                        <!--                          :key="op.url"-->
                        <!--                          :label="op.start_at"-->
                        <!--                          :value="op.url"-->
                        <!--                        >-->
                        <!--                        </el-option>-->
                        <!--                      </el-select>-->
                        <!--                      <template v-if="item.request.op">-->
                        <!--                        {{ item.request.op.start_at }}-->
                        <!--                      </template>-->
                        <!--                      <template v-else>-->
                        <!--                        {{ translate("withoutAssign") }}-->
                        <!--                      </template>-->
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
                        {{ item.request.reason }}
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
            <button type="button" class="btn btn-primary" @click="changeStatus">
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
      store.dispatch(Actions.GET_CHANGE_OP_REQUEST_STATUSES);
      store.dispatch(Actions.GET_OPERATION_PROGRAMS);
    });
    const statusSelectValues: string[] = reactive([]);
    const opSelectValues: string[] = reactive([]);

    const currentChangeOPRequests = computed(() => {
      const statuses = store.getters.getCurrentChangeOPRequestStatuses;
      const requests = store.getters.getCurrentChangeOPProcessRequests;
      const currentContractType =
        store.getters.getCurrentChangeOPProcessContractTypeName;
      const ops = store.getters.getCurrentOperationProgams;
      const requestsWithStatuses: any[] = [];
      if (requests && currentContractType) {
        requests.forEach((request) => {
          const requestStatuses = JSON.parse(JSON.stringify(statuses)).filter(
            (status) =>
              status.name != request.status.name &&
              status.contract_type.name === currentContractType
          );
          // requestStatuses.filter((status) => {
          //   status === request.status ||
          //   status.contract_type.name !== request.status.contract_type.name
          //     ? []
          //     : [{ value: status.url, label: status.name }];
          // });
          console.log(requestStatuses);
          // let requestOps = [...ops];
          // requestOps.flatMap((op) => {
          //   op === request.op ? [] : [{ value: op.url, label: op.start_at }];
          // });

          requestsWithStatuses.push({
            request: request,
            statuses: requestStatuses,
            // ops: requestOps,
          });
          statusSelectValues.push("");
          // opSelectValues.push("");
        });
      }
      requestsWithStatuses.sort(function (a, b) {
        return a.request["url"] - b.request["url"];
      }); // TODO: verificar este orden
      return requestsWithStatuses;
    });
    const value = ref("");
    const changeStatus = () => {
      const requestStatus: any[] = [];
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
      if (requestStatus) {
        requestStatus.forEach((param, index) => {
          store
            .dispatch(Actions.CHANGE_CHANGE_OP_REQUEST_STATUS, {
              resource: param.requestId,
              params: param.params,
            })
            .then(() => {
              if (index == requestStatus.length - 1) {
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
              }
            });
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
      changeStatus,
      currentChangeOPRequests,
      statusSelectValues,
      opSelectValues,
    };
  },
});
</script>
b
