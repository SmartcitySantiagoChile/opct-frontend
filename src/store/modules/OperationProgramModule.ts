import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {Dictionary} from "@/store/modules/HelperModule";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";

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

    @Mutation
    [Mutations.SET_CREATE_OPERATION_PROGRAM_ERRORS](errors) {
        this.errors = errors;
    }

    @Action
    [Actions.CREATE_OPERATION_PROGRAM](params) {
        return new Promise<void>((resolve, reject) => {
            ApiService.post("operation-programs/", params)
                .then(({data}) => {
                    console.log(data);
                    resolve()
                })
                .catch(({response}) => {
                    console.log(response);
                    this.context.commit(Mutations.SET_CREATE_OPERATION_PROGRAM_ERRORS,[response.data.error]);
                    reject();
                });
        });
    }
}

