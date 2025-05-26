export interface VueFormDisableOptions {
    /**
     * Custom selectors to include in disable rules
     */
    customSelectors?: string[];

    /**
     * Whether to respect the novalidate attribute on forms
     * @default true
     */
    respectNoValidate?: boolean;

    /**
     * Theme to use (default, minimal, modern)
     * @default 'default'
     */
    theme?: 'default' | 'minimal' | 'modern' | string;
}

export interface PurgeOptions {
    /**
     * Enable purging of unused classes
     * @default false
     */
    enabled?: boolean;

    /**
     * File patterns to scan for used classes
     */
    content?: string[];

    /**
     * Classes to always keep (safelist)
     */
    safelist?: string[];
}

export interface BuildConfig {
    input: {
        main: string;
        themes: string;
    };
    output: {
        css: string;
        dist: string;
    };
    sass: {
        outputStyle: 'expanded' | 'compressed';
        sourceMap: boolean;
        includePaths: string[];
        quietDeps: boolean;
    };
    purge: PurgeOptions;
}

declare const VueFormDisable: {
    install(app: any, options?: VueFormDisableOptions): void;
};

export default VueFormDisable;

export declare function vueFormDisablePlugin(options?: {
    purge?: boolean;
    content?: string[];
    customSelectors?: string[];
    outputFile?: string;
}): any;
