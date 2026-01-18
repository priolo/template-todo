
export interface UrlParamsService {
    /**
     * Get URL parameter value(s)
     */
    get(name: string): string | string[] | null;
    /**
     * Set URL parameter value(s)
     */
    set(name: string, value: string | string[] | null): void;
}

/**
 * URL Parameters Types
 */
export enum URL_PARAMS_TYPE {
    TASK_SELECTED = "sel",
    TASK_TEXT_FILTER = "flt",
    TASK_SORT_BY = "sby",
}

export function buildUrlParams(): UrlParamsService {
    return {
        get(name) {
            const url = new URL(window.location.href);
            const values = url.searchParams.getAll(name);
            if (values.length === 0) return null;
            if (values.length === 1) return values[0];
            return values;
        },
        set(name, value) {
            const url = new URL(window.location.href);

            if (value === null || value === undefined) {
                url.searchParams.delete(name);
            } else if (Array.isArray(value)) {
                url.searchParams.delete(name);
                value.forEach(v => url.searchParams.append(name, v));
            } else {
                url.searchParams.set(name, value);
            }

            window.history.pushState({}, "", url);
        }
    }
}
