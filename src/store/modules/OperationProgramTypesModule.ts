import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { OperationProgramType } from "@/store/modules/OperationProgramTypeModule";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";

export interface OperationProgramTypesInfo {
  errors: Array<any>;
  operationProgramTypes: Array<OperationProgramType>;
  count: number;
  next: string;
  previous: string;
}

@Module
export default class OperationProgramTypesModule extends VuexModule implements OperationProgramTypesInfo {
  errors = [];
  operationProgramTypes = [] as OperationProgramType[];
  count = 0;
  next = "";
  previous = "";

  /**
   * Get current operation program types
   * @returns OperationProgramType[]
   */
  get getCurrentOperationProgramTypes(): OperationProgramType[] {
    return this.operationProgramTypes;
  }

  @Mutation
  [Mutations.SET_OPERATION_PROGRAM_TYPES](operationProgramTypeList) {
    this.operationProgramTypes = operationProgramTypeList.results;
    this.count = operationProgramTypeList.count;
    this.next = operationProgramTypeList.next;
    this.previous = operationProgramTypeList.previous;
  }

  @Mutation
  [Mutations.SET_OPERATION_PROGRAM_TYPES_ERRORS](errors) {
    this.errors = errors;
  }

  @Action({ rawError: true })
  [Actions.GET_OPERATION_PROGRAM_TYPES]() {
    ApiService.get("operation-program-types")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_OPERATION_PROGRAM_TYPES, data);
      })
      .catch(({ response }) => {
        console.log(response);
        this.context.commit(Mutations.SET_OPERATION_PROGRAM_TYPES_ERRORS, [response.data.error]);
      });
  }
}
