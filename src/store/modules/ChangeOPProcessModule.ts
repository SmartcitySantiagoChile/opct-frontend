import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Dictionary } from "@/store/modules/HelperModule";

export interface ChangeOPProcess {
  url: string;
  created_at: string;
  title: string;
  message: string;
  updated_at: string;
  creator: Dictionary<string>;
  base_op: Dictionary<string>;
  status: Dictionary<string>;
  counterpart: Dictionary<string>;
  contract_type: Dictionary<string>;
  change_op_process_files: Array<any>;
  change_op_process_messages: Array<any>;
  change_op_process_status_logs: Array<any>;
  op_change_logs: Array<any>;
  status_logs: Array<any>;
  change_op_requests: Dictionary<string>;
}

export interface ChangeOPProcessInfo {
  errors: Dictionary<string>;
  changeOPProcess: ChangeOPProcess;
}

@Module
export default class ChangeOPProcessModule
  extends VuexModule
  implements ChangeOPProcessInfo
{
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
    return this.changeOPProcess.base_op ? this.changeOPProcess.base_op.start_at : "";
  }

  /**
   * Get current change op process id
   * @returns string
   */
  get getCurrentChangeOPProcessId(): string {
    if (this.changeOPProcess.url) {
      const IdArray: Array<string> = this.changeOPProcess.url.split("/");
      IdArray.pop();
      return IdArray.pop() as string;
    } else {
      return "";
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
    return this.changeOPProcess.contract_type
      ? this.changeOPProcess.contract_type.name
      : "";
  }

  /**
   * Get current change op process status
   * @returns Dictionary
   */
  get getCurrentChangeOPProcessStatus(): Dictionary<string> {
    return this.changeOPProcess.status;
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
  [Actions.GET_CHANGE_OP_PROCESS](changeOPProcessId) {
    ApiService.get("change-op-processes", changeOPProcessId)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESS, data);
      })
      .catch(({ response }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_ERRORS, [
          response.data.error,
        ]);
      });
  }

  // @Action
  // [Actions.CREATE_CHANGE_OP_REQUEST](params) {
  //   return new Promise<void>((resolve, reject) => {
  //     ApiService.postWithFiles("change-op-requests/", params)
  //       .then(({ data }) => {
  //         console.log(data);
  //         resolve();
  //       })
  //       .catch(({ response }) => {
  //         console.log(response);
  //         this.context.commit(
  //           Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS,
  //           response.data
  //         );
  //         reject();
  //       });
  //   });
  // }
  //
  @Action
  [Actions.CHANGE_CHANGE_OP_PROCESS_STATUS](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(
        `change-op-processes/${data.resource}/change-status/`,
        data.params
      )
        .then(({ data }) => {
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_ERRORS, [
            response.data.error,
          ]);
          reject();
        });
    });
  }

  @Action
  [Actions.CHANGE_CHANGE_OP_PROCESS_OP](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(
        `change-op-processes/${data.resource}/change-op/`,
        data.params
      )
        .then(({ data }) => {
          console.log(data);
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(Mutations.SET_CHANGE_OP_PROCESS_ERRORS, [
            response.data.error,
          ]);
          reject();
        });
    });
  }
  //
  // @Action
  // [Actions.GET_CHANGE_OP_REQUEST_REASONS]() {
  //   ApiService.get("change-op-request-reasons")
  //     .then(({ data }) => {
  //       this.context.commit(Mutations.SET_CHANGE_OP_REQUEST_REASONS, data);
  //     })
  //     .catch(({ response }) => {
  //       console.log(response);
  //       this.context.commit(Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS, [
  //         response.data.error,
  //       ]);
  //     });
  // }
  //
  // @Action
  // [Actions.CHANGE_CHANGE_OP_REQUEST_RELATED_REQUESTS](data) {
  //   return new Promise<void>((resolve, reject) => {
  //     ApiService.put(
  //       `change-op-requests/${data.resource}/change-related-requests/`,
  //       data.params
  //     )
  //       .then(({ data }) => {
  //         console.log(data);
  //         resolve();
  //       })
  //       .catch(({ response }) => {
  //         console.log(response);
  //         this.context.commit(Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS, [
  //           response.data.error,
  //         ]);
  //         reject();
  //       });
  //   });
  // }
}