import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Dictionary } from "@/store/modules/HelperModule";

export interface ChangeOPProcess {
  id: number;
  url: string;
  created_at: string;
  title: string;
  message: string;
  updated_at: string;
  creator: Dictionary<string>;
  operation_program: Dictionary<string>;
  status: Dictionary<string>;
  counterpart: Dictionary<string>;
  contract_type: Dictionary<string>;
  change_op_process_files: Array<any>;
  change_op_process_messages: Array<any>;
  change_op_process_status_logs: Array<any>;
  op_change_logs: Array<any>;
  status_logs: Array<any>;
  change_op_requests: Dictionary<string>;
  op_release_date: string;
  change_op_requests_count?: number;
}

export interface ChangeOPProcessInfo {
  errors: Dictionary<string>;
  changeOPProcess: ChangeOPProcess;
}

@Module
export default class ChangeOPProcessModule extends VuexModule implements ChangeOPProcessInfo {
  errors = {};
  changeOPProcess = {} as ChangeOPProcess;

  /**
   * Get change op process errors
   * @returns di
   */
  get getChangeOPProcessErrors(): Dictionary<string> {
    return this.errors;
  }

  /**
   * Get current change op process
   * @returns ChangeOPProcess
   */
  get getCurrentChangeOPProcess(): ChangeOPProcess {
    return this.changeOPProcess;
  }

  /**
   * Get current change op process url
   * @returns string
   */
  get getCurrentChangeOPProcessUrl(): string {
    return this.changeOPProcess.url;
  }

  /**
   * Get current change op process op
   * @returns string
   */
  get getCurrentChangeOPProcessOP(): string {
    return this.changeOPProcess.operation_program ? this.changeOPProcess.operation_program.start_at : "";
  }

  /**
   * Get current change op process id
   * @returns string
   */
  get getCurrentChangeOPProcessId(): number | null {
    if (this.changeOPProcess) {
      return this.changeOPProcess.id;
    } else {
      return null;
    }
  }

  /**
   * Get current change op process title
   * @returns string
   */
  get getCurrentChangeOPProcessTitle(): string {
    return this.changeOPProcess.title;
  }

  /**
   * Get current change op process contract type name
   * @returns string
   */
  get getCurrentChangeOPProcessContractTypeName(): string {
    return this.changeOPProcess.contract_type ? this.changeOPProcess.contract_type.name : "";
  }

  /**
   * Get current change op process status
   * @returns Dictionary
   */
  get getCurrentChangeOPProcessStatus(): Dictionary<string> {
    return this.changeOPProcess.status;
  }

  /**
   * Get current change op process requests
   * @returns Dictionary
   */
  get getCurrentChangeOPProcessRequests(): Dictionary<string> {
    return this.changeOPProcess.change_op_requests;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_PROCESS](changeOPProcess) {
    this.changeOPProcess = changeOPProcess;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_PROCESS_ERRORS](errors) {
    this.errors = errors;
  }

  @Action
  [Actions.CHANGE_OP_PROCESSES.DETAIL](changeOPProcessId) {
    ApiService.get("change-op-processes", changeOPProcessId + "/")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESS, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_ERRORS, [response.data.error]);
      });
  }

  @Action
  [Actions.CHANGE_OP_PROCESSES.CREATE](params) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("change-op-processes/", params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_ERRORS, response.data);
          reject();
        });
    });
  }

  @Action
  [Actions.CHANGE_OP_PROCESSES.UPDATE_STATUS](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`change-op-processes/${data.resource}/change-status/`, data.params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_ERRORS, [response.data.error]);
          reject(response);
        });
    });
  }

  @Action
  [Actions.CHANGE_OP_PROCESSES.UPDATE_OPERATION_PROGRAM](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`change-op-processes/${data.resource}/change-op/`, data.params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_ERRORS, [response.data.error]);
          reject(response);
        });
    });
  }

  @Action
  [Actions.CHANGE_OP_PROCESSES.CREATE_CHANGE_OP_REQUEST](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post(`change-op-processes/${data.resource}/create-change-op-request/`, data.params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_ERRORS, [response.data.error]);
          reject(response);
        });
    });
  }

  @Action
  [Actions.CHANGE_OP_PROCESSES.UPDATE_CHANGE_OP_REQUESTS](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`change-op-processes/${data.resource}/update-change-op-requests/`, data.params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_ERRORS, [response.data.error]);
          reject(response);
        });
    });
  }

  @Action
  [Actions.CHANGE_OP_PROCESSES.ADD_MESSAGE](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.postWithFiles(`/change-op-processes/${data.resource}/add_message/`, data.payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  }
}
