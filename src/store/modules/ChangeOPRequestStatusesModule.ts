import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ChangeOPRequestStatus } from "@/store/modules/ChangeOPRequestStatusModule";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";

export interface ChangeOPRequestStatusesInfo {
  errors: Array<any>;
  changeOPRequestStatuses: Array<ChangeOPRequestStatus>;
  count: number;
  next: string;
  previous: string;
}

@Module
export default class ChangeOPRequestStatusesModule extends VuexModule implements ChangeOPRequestStatusesInfo {
  errors = [];
  changeOPRequestStatuses = [] as ChangeOPRequestStatus[];
  count = 0;
  next = "";
  previous = "";

  /**
   * Get current change op request statuses
   * @returns ChangeOPRequestStatus[]
   */
  get getCurrentChangeOPRequestStatuses(): ChangeOPRequestStatus[] {
    return this.changeOPRequestStatuses;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_REQUEST_STATUSES](changeOPRequestStatusList) {
    this.changeOPRequestStatuses = changeOPRequestStatusList.results;
    this.count = changeOPRequestStatusList.count;
    this.next = changeOPRequestStatusList.next;
    this.previous = changeOPRequestStatusList.previous;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_REQUEST_STATUSES_ERRORS](errors) {
    this.errors = errors;
  }

  @Action({ rawError: true })
  [Actions.GET_CHANGE_OP_REQUEST_STATUSES]() {
    ApiService.get("change-op-request-statuses")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_REQUEST_STATUSES, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_REQUEST_STATUSES_ERRORS, [response.data.error]);
      });
  }

  @Action({ rawError: true })
  [Actions.GET_CHANGE_OP_REQUEST_STATUSES_WITH_PARAMS](params) {
    ApiService.query("change-op-request-statuses", { params: params })
      .then(({ data }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_REQUEST_STATUSES, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_REQUEST_STATUSES_ERRORS, [response.data.error]);
      });
  }
}
