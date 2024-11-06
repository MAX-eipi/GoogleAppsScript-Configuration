class ScriptPropertyRuntimeConfiguration<TConfigSchema> implements RuntimeConfiguration<TConfigSchema> {
    properties: TConfigSchema;

    public static createByPropertyKey<TConfigSchema>(key: string): ScriptPropertyRuntimeConfiguration<TConfigSchema> {
        const properties = PropertiesService.getScriptProperties();
        return new ScriptPropertyRuntimeConfiguration<TConfigSchema>(properties, key);
    }

    public constructor(
        private readonly _properties: GoogleAppsScript.Properties.Properties,
        private readonly _key: string
    ) {
        const value = _properties.getProperty(_key);
        if (value) {
            this.properties = JSON.parse(value);
        }
        else {
            this.properties = {} as TConfigSchema;
        }
    }

    hasProperty(key: string): boolean {
        return key in this.properties;
    }

    getProperty<T>(key: string, defaultValue: T): T {
        return this.hasProperty(key) ? this.properties[key] as T : defaultValue;
    }

    setProperty<T>(key: string, value: T): void {
        this.properties[key] = value;
    }

    apply(): void {
        const json = JSON.stringify(this.properties);
        this._properties.setProperty(this._key, json);
    }
}
