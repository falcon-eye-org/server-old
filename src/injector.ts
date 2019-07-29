// tslint:disable: tsr-detect-non-literal-fs-filename tsr-detect-non-literal-require
import { Injector } from '@booster-ts/core';
import * as fs from 'fs';
import * as path from 'path';

const inject = new Injector();
export default inject;

/**
 * loadFiles
 * @description Imports Recursively all files
 * @param dirName where to search the files
 */
export const loadFiles = (dirName: string): void => {
    let fileLoaded = false;
    let relativeDir;
    if (!path.isAbsolute(dirName))
        relativeDir = path.join(__dirname, dirName);
    else
        relativeDir = dirName;
    const contents = fs.readdirSync(relativeDir);
    for (const content of contents) {
        const filePath = path.join(relativeDir, content);
        if (fs.statSync(filePath).isDirectory())
            loadFiles(filePath);
        else if (!fileLoaded) {
            require(path.join(dirName, path.basename(dirName)));
            fileLoaded = true;
        }
    }
};

interface IDependency {
    /** Name of the Dependency */
    name?: string;
    /** Dependency */
    class: any;
}

/**
 * testBed
 * @description Declare mutliple dependecy
 * @param dependencies to declare
 */
export const testBed = (dependencies: Array<IDependency>): Injector => {
    dependencies.forEach((dependency) => {
        if (dependency.name === undefined)
            inject.register(dependency.class.name, dependency.class);
        else
            inject.register(dependency.name, dependency.class);
    });
    return inject;
};
