class JsonConfiguration<TConfigSchema> implements Configuration<TConfigSchema> {
    public static createByFile<TConfigSchema>(fileId: string): Configuration<TConfigSchema> {
        const file = DriveApp.getFileById(fileId);
        const json = file.getBlob().getDataAsString();
        return this.create(json);
    }

    public static create<TConfigSchema>(json: string): Configuration<TConfigSchema> {
        if (!json) {
            return null;
        }
        const config = new JsonConfiguration<TConfigSchema>();
        config.properties = JSON.parse(json);
        return config;
    }

    private _properties: Readonly<TConfigSchema>;
    public get properties(): Readonly<TConfigSchema> { return this._properties; }
    private set properties(value: TConfigSchema) { this._properties = value; }

    hasProperty(key: string): boolean {
        return this.properties && (key in this.properties);
    }

    getProperty<T>(key: string, defaultValue: T): T {
        return this.hasProperty(key) ? this.properties[key] as T : defaultValue;
    }
}
