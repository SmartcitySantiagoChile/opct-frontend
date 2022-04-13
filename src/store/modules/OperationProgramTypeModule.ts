import { Module, VuexModule } from "vuex-module-decorators";

export interface OperationProgramType {
  url: string;
  name: string;
}

export interface OperationProgramTypeInfo {
  errors: Array<any>;
  operationProgramType: OperationProgramType;
}

@Module
export default class OperationProgramTypeModule
  extends VuexModule
  implements OperationProgramTypeInfo
{
  errors = [] as Array<any>;
  operationProgramType = {} as OperationProgramType;
}
