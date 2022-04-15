import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import ChangeOPProcess from "@/store/modules/ChangeOPProcessModule";

export interface ChangeOPRequestsInfo {
  errors: Array<string>;
  changeOPProcesses: Array<ChangeOPProcess>;
  count: number;
  next: string;
  previous: string;
}

@Module
export default class ChangeOPProcessesModule
  extends VuexModule
  implements ChangeOPRequestsInfo
{
  errors = [];
  changeOPProcesses = [] as ChangeOPProcess[];
  count = 0;
  next = "";
  previous = "";

  /**
   * Get change op processes errors
   * @returns array
   */
  get getChangeOPProcessesErrors(): Array<string> {
    return this.errors;
  }

  /**
   * Get current change op processes
   * @returns ChangeOPProcess[]
   */
  get getCurrentChangeOPProcesses(): ChangeOPProcess[] {
    return this.changeOPProcesses;
  }

  /**
   * Get current change op processes count
   * @returns number
   */
  get getCurrentChangeOPProcessesCount(): number {
    return this.count;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_PROCESSES](changeOPProcessesList) {
    this.changeOPProcesses = changeOPProcessesList.results;
    this.count = changeOPProcessesList.count;
    this.next = changeOPProcessesList.next;
    this.previous = changeOPProcessesList.previous;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_PROCESSES_ERRORS](changeOPProcessesList) {
    this.errors = changeOPProcessesList;
  }

  @Action
  [Actions.GET_CHANGE_OP_PROCESSES]() {
    ApiService.get("change-op-processes")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESSES, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESSES_ERRORS, [
          response.data.error,
        ]);
      });
  }

  @Action
  [Actions.GET_CHANGE_OP_PROCESSES_WITH_PARAMS](params) {
    ApiService.query("change-op-processes", { params: params })
      .then(({ data }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESSES, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESSES_ERRORS, [
          response.data.error,
        ]);
      });
  }
}
