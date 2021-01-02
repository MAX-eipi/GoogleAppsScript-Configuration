import { RuntimeConfiguration } from "./RuntimeConfiguration";

export class JsonFileRuntimeConfiguration<TConfigSchema> implements RuntimeConfiguration<TConfigSchema> {
    properties: TConfigSchema;

    public static createByFileId<TConfigSchema>(fileId: string): JsonFileRuntimeConfiguration<TConfigSchema> {
        const file = DriveApp.getFileById(fileId);
        return new JsonFileRuntimeConfiguration<TConfigSchema>(file);
    }

    public constructor(private readonly _jsonFile: GoogleAppsScript.Drive.File) {
        const json = _jsonFile.getBlob().getDataAsString();
        this.properties = JSON.parse(json);
    }

    public hasProperty(key: string): boolean {
        return key in this.properties;
    }

    public getProperty<T>(key: string, defaultValue: T): T {
        return this.hasProperty(key) ? this.properties[key] as T : defaultValue;
    }

    public setProperty<T>(key: string, value: T): void {
        this.properties[key] = value;
    }

    public apply(): void {
        const json = JSON.stringify(this.properties, null, 4);
        this._jsonFile.setContent(json);
    }
}