export default class Generator {
    args: {
        [k: string]: any;
    };
    flags: {
        [k: string]: any;
    };
    inputs: {
        [k: string]: any;
    };
    skeleton_dir: string;
    target_dir: string;
    constructor(args: object, flags: object, inputs: object, skeleton_dir: string, target_dir: string);
    setLowerAndUpperCaseValues(): void;
    scanRecursiveFiles(dir: string, files?: any[]): any[];
    getFilesFromSkeletonDirector(): any[];
    files(): void;
    getFileDestination(file_path: string): string;
    copyFilesToDestination(file_path: string): void;
}
