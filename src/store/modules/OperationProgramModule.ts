import {Module, VuexModule} from "vuex-module-decorators";
import {Dictionary} from "@/store/modules/HelperModule";

export interface OperationProgram {
    url: string;
    start_at: string;
    op_type: Dictionary<string>;

}

export interface OperationProgramInfo {
    errors: Array<any>;
    operationProgram: OperationProgram;
}

@Module
export default class OperationProgramModule extends VuexModule implements OperationProgramInfo {
    errors = [] as Array<any>;
    operationProgram = {} as OperationProgram;
}
