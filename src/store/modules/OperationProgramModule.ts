import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Dictionary } from "@/store/modules/HelperModule";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";

export interface OperationProgram {
  url: string;
  start_at: string;
  op_type: Dictionary<string>;
  op_change_data_logs: Dictionary<string>;
}

export interface OperationProgramInfo {
  errors: Dictionary<string>;
  operationProgram: OperationProgram;
}

@Module
export default class OperationProgramModule extends VuexModule implements OperationProgramInfo {
  errors = {} as Dictionary<string>;
  operationProgram = {} as OperationProgram;

  /**
   * Get current operation programs
   * @returns Dictionary<string>
   */
  get getCurrentOperationProgramErrors(): Dictionary<string> {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_OPERATION_PROGRAM_ERRORS](errors) {
    this.errors = errors;
  }

  @Action({ rawError: true })
  [Actions.CREATE_OPERATION_PROGRAM](params) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("operation-programs/", params)
        .then(({ data }) => {
          console.log(data);
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(Mutations.SET_OPERATION_PROGRAM_ERRORS, response.data);
          reject();
        });
    });
  }

  @Action({ rawError: true })
  [Actions.UPDATE_OPERATION_PROGRAM](params) {
    return new Promise<void>((resolve, reject) => {
      ApiService.patch(params["url"], params["params"])
        .then(({ data }) => {
          console.log(data);
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(Mutations.SET_OPERATION_PROGRAM_ERRORS, response.data);
          reject();
        });
    });
  }

  @Action({ rawError: true })
  [Actions.DELETE_OPERATION_PROGRAM](url) {
    return new Promise<void>((resolve, reject) => {
      ApiService.delete(url)
        .then(({ data }) => {
          console.log(data);
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(Mutations.SET_OPERATION_PROGRAM_ERRORS, response.data);
          reject();
        });
    });
  }
}
