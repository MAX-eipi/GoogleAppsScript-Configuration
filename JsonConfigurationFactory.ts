import { Configuration } from "./Configuration";

class ConfigurationImpl<TConfigSchema> implements Configuration<TConfigSchema> {
    public properties: TConfigSchema;

    public hasProperty(key: string): boolean {
        return this.properties && (key in this.properties);
    }

    public getProperty<T>(key: string, defaultValue: T): T {
        return this.hasProperty(key) ? this.properties[key] as T : defaultValue;
    }
}

export class JsonConfigurationFactory {
    public static createByFile<TConfigSchema>(fileId: string): Configuration<TConfigSchema> {
        const file = DriveApp.getFileById(fileId);
        const json = file.getBlob().getDataAsString();
        return this.create(json);
    }

    public static create<TConfigSchema>(json: string): Configuration<TConfigSchema> {
        if (!json) {
            return null;
        }
        const config = new ConfigurationImpl<TConfigSchema>();
        config.properties = JSON.parse(json);
        return config;
    }
}