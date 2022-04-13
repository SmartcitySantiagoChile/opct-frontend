import { Module, VuexModule } from "vuex-module-decorators";
import { Dictionary } from "@/store/modules/HelperModule";

export interface OperationProgramStatus {
  url: string;
  name: string;
  contract_type: Dictionary<string>;
  time_threshold: number;
}

export interface OperationProgramStatusInfo {
  errors: Array<any>;
  operationProgramStatus: OperationProgramStatus;
}

@Module
export default class OperationProgramStatusModule
  extends VuexModule
  implements OperationProgramStatusInfo
{
  errors = [] as Array<any>;
  operationProgramStatus = {} as OperationProgramStatus;
}
