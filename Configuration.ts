type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
}

export interface Configuration<TConfigSchema> {
    readonly properties: ReadOnly<TConfigSchema>;
    hasProperty(key: string): boolean;
    getProperty<T>(key: string, defaultValue: T): T;
}