interface RuntimeConfiguration<TConfigSchem> {
    readonly properties: TConfigSchem;
    hasProperty(key: string): boolean;
    getProperty<T>(key: string, defaultValue: T): T;
    setProperty<T>(key: string, value: T): void;
    apply(): void;
}
