import { Module, VuexModule } from "vuex-module-decorators";
import { Dictionary } from "@/store/modules/HelperModule";

export interface ChangeOPProcessStatus {
  id: number;
  url: string;
  name: string;
  contract_type: Dictionary<string>;
}

export interface ChangeOPProcessStatusInfo {
  errors: Array<unknown>;
  changeOPProcessStatus: ChangeOPProcessStatus;
}

@Module
export default class ChangeOPProcessStatusModule extends VuexModule implements ChangeOPProcessStatusInfo {
  errors = [] as Array<unknown>;
  changeOPProcessStatus = {} as ChangeOPProcessStatus;
}
