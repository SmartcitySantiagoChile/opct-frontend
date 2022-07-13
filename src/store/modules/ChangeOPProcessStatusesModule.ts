import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ChangeOPProcessStatus } from "@/store/modules/ChangeOPProcessStatusModule";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";

export interface ChangeOPProcessStatusesInfo {
  errors: Array<any>;
  changeOPProcessStatuses: Array<ChangeOPProcessStatus>;
  count: number;
  next: string;
  previous: string;
}

@Module
export default class ChangeOPProcessStatusesModule extends VuexModule implements ChangeOPProcessStatusesInfo {
  errors = [];
  changeOPProcessStatuses = [] as ChangeOPProcessStatus[];
  count = 0;
  next = "";
  previous = "";

  /**
   * Get  change op process statuses
   * @returns ChangeOPProcessStatus[]
   */
  get getCurrentChangeOPProcessStatuses(): ChangeOPProcessStatus[] {
    return this.changeOPProcessStatuses;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_PROCESS_STATUSES](changeOPProcessStatusList) {
    this.changeOPProcessStatuses = changeOPProcessStatusList.results;
    this.count = changeOPProcessStatusList.count;
    this.next = changeOPProcessStatusList.next;
    this.previous = changeOPProcessStatusList.previous;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_PROCESS_STATUSES_ERRORS](errors) {
    this.errors = errors;
  }

  @Action
  [Actions.GET_CHANGE_OP_PROCESS_STATUSES]() {
    ApiService.get("change-op-process-statuses")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_STATUSES, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_STATUSES_ERRORS, [response.data.error]);
      });
  }

  @Action
  [Actions.GET_CHANGE_OP_PROCESS_STATUSES_WITH_PARAMS](params) {
    ApiService.query("change-op-process-statuses", { params: params })
      .then(({ data }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_STATUSES, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_STATUSES_ERRORS, [response.data.error]);
      });
  }
}
