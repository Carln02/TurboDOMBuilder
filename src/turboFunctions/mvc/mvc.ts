import {TurboSelector} from "../turboSelector";
import {MvcFunctionsUtils} from "./mvc.utils";
import {TurboSubstrate} from "../../mvc/substrate/substrate";
import {TurboTool} from "../../mvc/tool/tool";
import {TurboInteractor} from "../../mvc/interactor/interactor";
import {TurboHandler} from "../../mvc/handler/handler";
import {TurboOperator} from "../../mvc/operator/operator";
import {TurboEmitter} from "../../mvc/emitter/emitter";
import {turbo} from "../turboFunctions";
import {MvcGenerationProperties, MvcProperties} from "./mvc.types";

export const MvcFields = ["model", "view", "emitter", "operators", "handlers", "interactors", "tools", "substrates"];
const utils = new MvcFunctionsUtils();

export function setupMvcFunctions() {
    Object.defineProperty(TurboSelector.prototype, "mvc", {
        get(this: TurboSelector): MvcProperties {
            const data = utils.peek(this.element);
            if (!data) return {};
            return {
                model: data.model,
                view: data.view,
                operators: Array.from(data.operators?.values() ?? []),
                handlers: Array.from(data.model?.handlers?.values() ?? []),
                interactors: Array.from(data.interactors?.values() ?? []),
                tools: Array.from(data.tools?.values() ?? []),
                substrates: Array.from(data.substrates?.values() ?? []),
            };
        }, configurable: true, enumerable: true,
    });

    // -------------------------------------------------------------------------
    // Singular pieces
    // -------------------------------------------------------------------------

    Object.defineProperty(TurboSelector.prototype, "model", {
        get(this: TurboSelector) {
            return utils.peek(this.element)?.model;
        },
        set(this: TurboSelector, value) {
            if (!this.element) return;
            const mvc = utils.data(this.element);
            utils.attachModel(this.element, this.model, false);
            utils.updateModel(this.element, mvc.model, false);
            mvc.model = utils.generateInstance(value);
            utils.attachModel(this.element, mvc.model);
            utils.linkPieces(this.element);
        },
        configurable: true, enumerable: true,
    });

    Object.defineProperty(TurboSelector.prototype, "view", {
        get(this: TurboSelector) {
            return utils.peek(this.element)?.view;
        },
        set(this: TurboSelector, value) {
            if (!this.element) return;
            utils.data(this.element).view = utils.generateInstance(value, this.element);
            utils.linkPieces(this.element);
        },
        configurable: true, enumerable: true,
    });

    Object.defineProperty(TurboSelector.prototype, "emitter", {
        get(this: TurboSelector) {
            return utils.peek(this.element)?.emitter;
        },
        set(this: TurboSelector, value) {
            if (!this.element) return;
            utils.data(this.element).emitter = utils.generateInstance(value);
            utils.linkPieces(this.element);
        },
        configurable: true, enumerable: true,
    });

    // -------------------------------------------------------------------------
    // Data
    // -------------------------------------------------------------------------

    Object.defineProperty(TurboSelector.prototype, "data", {
        get(this: TurboSelector) {
            return utils.peek(this.element)?.model?.data;
        },
        set(this: TurboSelector, value) {
            if (!this.element) return;
            const mvc = utils.data(this.element);
            if (!mvc.model) return;
            mvc.model.data = value;
        },
        configurable: true, enumerable: true,
    });

    Object.defineProperty(TurboSelector.prototype, "dataId", {
        get(this: TurboSelector) {
            return utils.peek(this.element)?.model?.id;
        },
        set(this: TurboSelector, value) {
            if (!this.element) return;
            const mvc = utils.data(this.element);
            if (!mvc.model) return;
            mvc.model.id = value;
        },
        configurable: true, enumerable: true,
    });

    Object.defineProperty(TurboSelector.prototype, "dataIndex", {
        get(this: TurboSelector) {
            return Number.parseInt(this.dataId);
        },
        set(this: TurboSelector, value) {
            this.dataId = value;
        },
        configurable: true, enumerable: true,
    });

    Object.defineProperty(TurboSelector.prototype, "dataSize", {
        get(this: TurboSelector) {
            return utils.peek(this.element)?.model?.size;
        },
        configurable: true, enumerable: true,
    });

    // -------------------------------------------------------------------------
    // Collections
    // -------------------------------------------------------------------------

    Object.defineProperty(TurboSelector.prototype, "operators", {
        get(this: TurboSelector) {
            return Array.from(utils.peek(this.element)?.operators.values() ?? []);
        },
        set(this: TurboSelector, value) {
            if (!this.element) return;
            utils.generateInstances(value, this.element).forEach(instance => this.addOperator(instance));
            utils.linkPieces(this.element);
        },
        configurable: true, enumerable: true,
    });

    Object.defineProperty(TurboSelector.prototype, "handlers", {
        get(this: TurboSelector) {
            return Array.from(utils.peek(this.element)?.model?.handlers.values() ?? []);
        },
        set(this: TurboSelector, value) {
            if (!this.element) return;
            utils.generateInstances(value).forEach(instance => this.addHandler(instance));
        },
        configurable: true, enumerable: true,
    });

    Object.defineProperty(TurboSelector.prototype, "interactors", {
        get(this: TurboSelector) {
            return Array.from(utils.peek(this.element)?.interactors.values() ?? []);
        },
        set(this: TurboSelector, value) {
            if (!this.element) return;
            utils.generateInstances(value, this.element).forEach(instance => this.addInteractor(instance));
            utils.linkPieces(this.element);
        },
        configurable: true, enumerable: true,
    });

    Object.defineProperty(TurboSelector.prototype, "tools", {
        get(this: TurboSelector) {
            return Array.from(utils.peek(this.element)?.tools.values() ?? []);
        },
        set(this: TurboSelector, value) {
            if (!this.element) return;
            utils.generateInstances(value, this.element).forEach(instance => this.addTool(instance));
            utils.linkPieces(this.element);
        },
        configurable: true, enumerable: true,
    });

    Object.defineProperty(TurboSelector.prototype, "substrates", {
        get(this: TurboSelector) {
            return Array.from(utils.peek(this.element)?.substrates.values() ?? []);
        },
        set(this: TurboSelector, value) {
            if (!this.element) return;
            utils.generateInstances(value, this.element).forEach(instance => this.addSubstrate(instance));
            utils.linkPieces(this.element);
        },
        configurable: true, enumerable: true,
    });

    // -------------------------------------------------------------------------
    // Main methods
    // -------------------------------------------------------------------------

    TurboSelector.prototype.setMvc = function (this: TurboSelector, properties: MvcGenerationProperties): TurboSelector {
        const mvc = utils.data(this.element);
        for (const [key, value] of Object.entries(turbo(properties).extract(MvcFields))) {
            try {this[key] = value;} catch {}
        }
        if (!mvc.emitter) mvc.emitter = new TurboEmitter();
        if (properties.data && mvc.model) mvc.model.setDataWithoutInitializing(properties.data);
        if (properties.initialize === undefined || properties.initialize) this.initializeMvc();
        return this;
    };

    TurboSelector.prototype.initializeMvc = function (this: TurboSelector): TurboSelector {
        if (!this.element) return this;
        const mvc = utils.peek(this.element);
        if (!mvc) return this;
        mvc.view?.initialize();
        mvc.operators.forEach(operator => operator.initialize());
        mvc.interactors.forEach(interactor => interactor.initialize());
        mvc.tools.forEach(tool => tool.initialize());
        mvc.substrates.forEach(substrate => substrate.initialize());
        mvc.model?.initialize();
        return this;
    }

    TurboSelector.prototype.getMvcDifference = function (
        this: TurboSelector,
        properties: MvcGenerationProperties = {}
    ): MvcGenerationProperties<any, any, any, any> {
        const difference: MvcGenerationProperties = {};

        const toConstructor = <Type>(x: any): (new (...args: any[]) => Type) => {
            if (!x) return;
            if (typeof x === "function") return x;
            if (typeof x === "object") return x.constructor;
        };

        const toConstructorList = <Type>(x: any): (new (...args: any[]) => Type)[] => {
            if (!x) return [];
            const arr = Array.isArray(x) ? x : [x];
            return arr.map(toConstructor).filter(Boolean) as any;
        };

        const processField = (field: string) => {
            if (!this[field]) return;
            const current = toConstructor(this[field]);
            const external = toConstructor(properties[field]);
            if (current === external) return;
            difference[field] = current;
        };

        const processArray = (field: string) => {
            if (!this[field] || this[field].length === 0) return;
            const current = new Set(toConstructorList(this[field]));
            const external = new Set(toConstructorList(properties[field] ?? []));
            const result = [];
            for (const entry of current) if (!external.has(entry)) result.push(entry);
            if (result.length > 0) difference[field] = result;
        };

        processField("view");
        processField("model");
        processField("emitter");
        processArray("operators");
        processArray("handlers");
        processArray("interactors");
        processArray("tools");
        processArray("substrates");
        return difference;
    }


    // -------------------------------------------------------------------------
    // Manipulations
    // -------------------------------------------------------------------------

    TurboSelector.prototype.getOperator = function (this: TurboSelector, key: string) {
        return utils.peek(this.element)?.operators.get(key);
    };

    TurboSelector.prototype.addOperator = function (this: TurboSelector, operator: TurboOperator) {
        if (!this.element) return this;
        if (!operator.keyName) operator.keyName =
            utils.extractClassEssenceName(this.element, operator.constructor as new (...args: any[]) => any, "Operator");
        utils.data(this.element).operators.set(operator.keyName, operator);
        utils.updateOperator(this.element, operator);
        return this;
    };

    TurboSelector.prototype.removeOperator = function (this: TurboSelector, keyOrInstance: string | TurboOperator) {
        if (!this.element) return this;
        utils.removeInstance(this.element, "operator", keyOrInstance);
        return this;
    };

    TurboSelector.prototype.getHandler = function (this: TurboSelector, key: string) {
        return utils.peek(this.element)?.model?.handlers.get(key);
    };

    TurboSelector.prototype.addHandler = function (this: TurboSelector, handler: TurboHandler) {
        if (!this.element) return this;
        if (!handler.keyName) handler.keyName =
            utils.extractClassEssenceName(this.element, handler.constructor as new (...args: any[]) => any, "Handler");
        utils.data(this.element).model?.handlers.set(handler.keyName, handler);
        utils.updateHandler(this.element, handler);
        return this;
    };

    TurboSelector.prototype.removeHandler = function (this: TurboSelector, keyOrInstance: string | TurboHandler) {
        if (!this.element) return this;
        utils.removeInstance(this.element, "handler", keyOrInstance);
        return this;
    };

    TurboSelector.prototype.getInteractor = function (this: TurboSelector, key: string) {
        return utils.peek(this.element)?.interactors.get(key);
    };

    TurboSelector.prototype.addInteractor = function (this: TurboSelector, interactor: TurboInteractor) {
        if (!this.element) return this;
        if (!interactor.keyName) interactor.keyName =
            utils.extractClassEssenceName(this.element, interactor.constructor as any, "Interactor");
        utils.data(this.element).interactors.set(interactor.keyName, interactor);
        utils.updateInteractor(this.element, interactor);
        return this;
    };

    TurboSelector.prototype.removeInteractor = function (this: TurboSelector, keyOrInstance: string | TurboInteractor) {
        if (!this.element) return this;
        utils.removeInstance(this.element, "interactor", keyOrInstance);
        return this;
    };

    TurboSelector.prototype.getTool = function (this: TurboSelector, key: string) {
        return utils.peek(this.element)?.tools.get(key);
    };

    TurboSelector.prototype.addTool = function (this: TurboSelector, tool: TurboTool) {
        if (!this.element) return this;
        if (!tool.keyName) tool.keyName =
            utils.extractClassEssenceName(this.element, tool.constructor as any, "Tool");
        utils.data(this.element).tools.set(tool.keyName, tool);
        utils.updateTool(this.element, tool);
        return this;
    };

    TurboSelector.prototype.removeTool = function (this: TurboSelector, keyOrInstance: string | TurboTool) {
        if (!this.element) return this;
        utils.removeInstance(this.element, "tool", keyOrInstance);
        return this;
    };

    TurboSelector.prototype.getSubstrate = function (this: TurboSelector, key: string) {
        return utils.peek(this.element)?.substrates.get(key);
    };

    TurboSelector.prototype.addSubstrate = function (this: TurboSelector, substrate: TurboSubstrate) {
        if (!this.element) return this;
        if (!substrate.keyName) substrate.keyName =
            utils.extractClassEssenceName(this.element, substrate.constructor as any, "Substrate");
        utils.data(this.element).substrates.set(substrate.keyName, substrate);
        utils.updateSubstrate(this.element, substrate);
        return this;
    };

    TurboSelector.prototype.removeSubstrate = function (this: TurboSelector, keyOrInstance: string | TurboSubstrate) {
        if (!this.element) return this;
        utils.removeInstance(this.element, "substrate", keyOrInstance);
        return this;
    };
}
