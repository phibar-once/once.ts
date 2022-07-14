import EAMDInterface from "../3_services/EAMD.interface.mjs";
import Once, { OnceMode, OnceNodeImportLoader, OnceState } from "../3_services/Once.interface.mjs";
import EAMDInterface2 from "../3_services/UCP/EAMD.interface.mjs";

export default abstract class BaseOnce implements Once {
    abstract ENV: NodeJS.ProcessEnv;
    abstract mode: OnceMode;
    private _onceLoader: OnceNodeImportLoader | undefined;
    abstract start(): Promise<void>;
    abstract global: typeof globalThis;
    abstract eamd: EAMDInterface2;

    get OnceLoader(): OnceNodeImportLoader | undefined { return this._onceLoader };
    set OnceLoader(value: OnceNodeImportLoader | undefined) { this._onceLoader = value; }

    creationDate: Date;
    state: OnceState = OnceState.DISCOVER;

    constructor() {
        this.creationDate = new Date();
    }
    abstract oldEamd: EAMDInterface;
    get isNodeJSEnvironment(): boolean {
        throw new Error("Method not implemented.");
    }
}

