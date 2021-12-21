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
    errors: Array<Dictionary<string>>;
    operationProgram: OperationProgram;
}


@Module
export default class OperationProgramModule extends VuexModule implements OperationProgramInfo {
    errors = [{}] as Array<Dictionary<string>>;
    operationProgram = {} as OperationProgram;

    /**
     * Get current operation programs
     * @returns Array<Dictionary<string>>
     */
    get getCurrentOperationProgramErrors(): Array<Dictionary<string>>{
        return this.errors;
    }

    @Mutation
    [Mutations.SET_OPERATION_PROGRAM_ERRORS](errors) {
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
                    this.context.commit(Mutations.SET_OPERATION_PROGRAM_ERRORS,[response.data.error]);
                    reject();
                });
        });
    }

    @Action
    [Actions.UPDATE_OPERATION_PROGRAM](params) {
        return new Promise<void>((resolve, reject) => {
            ApiService.put(params["url"], params["params"])
                .then(({data}) => {
                    console.log(data);
                    resolve()
                })
                .catch(({response}) => {
                    console.log(response);
                    this.context.commit(Mutations.SET_OPERATION_PROGRAM_ERRORS,[response.data]);
                    reject();
                });
        });
    }
}

