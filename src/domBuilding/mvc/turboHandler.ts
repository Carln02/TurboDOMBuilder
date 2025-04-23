import {TurboModel} from "./turboModel";

class TurboHandler<ModelType extends TurboModel = TurboModel> {
    public keyName: string;

    protected readonly model: ModelType;

    public constructor(model: ModelType) {
        this.model = model;
    }
}

export {TurboHandler};