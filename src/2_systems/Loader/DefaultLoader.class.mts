import AbstractDefaultLoader from "../../1_infrastructure/AbstractDefaultLoader.class.mjs";
import IOR from "../../3_services/IOR.interface.mjs";
import Loader, { LoaderID, LoaderStatic, loadingConfig } from "../../3_services/Loader.interface.mjs";
import FileSystemLoader from "./FileSystemLoader.class.mjs";

export default class DefaultLoader extends AbstractDefaultLoader {
    removeObjectFromStore(object: any): void {
        throw new Error("Method not implemented.");
    }
    addObject2Store(ior: IOR, object: any): void {
        throw new Error("Method not implemented.");
    }
    load(ior: IOR, config: loadingConfig): Promise<any> {
        throw new Error("Method not implemented.");
    }
    canHandle(ior: IOR): number {
        return 0;
    }

    static discover(): LoaderStatic[] {
        // TODO again find by implemeantations
        // return [FileSystemLoader]
        return LoaderID.implementations.map(d => d.class)
    }

    static findLoader(ior: IOR): Loader | undefined {
        const loaderList = this.discover();

        let ratedLoader = loaderList.map(loader => {
            return { rating: loader.canHandle(ior), loader }
        })
            .filter(loader => loader.rating > 0)
            .sort((a, b) => b.rating - a.rating);

        if (ratedLoader.length > 0) {
            return ratedLoader[0].loader.factory(ior);
        }
    }
}