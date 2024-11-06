interface Configuration<TConfigSchema> {
    readonly properties: Readonly<TConfigSchema>;
    hasProperty(key: string): boolean;
    getProperty<T>(key: string, defaultValue: T): T;
}
