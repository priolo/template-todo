import { UrlParamsService } from "./url";


export function buildUrlParamsMock(): UrlParamsService {

    let mockParams: URLSearchParams = new URLSearchParams();

    return {

        get(name) {
            const values = mockParams.getAll(name);
            if (values.length === 0) return null;
            if (values.length === 1) return values[0];
            return values;
        },

        set(name, value) {
            if (value === null || value === undefined) {
                mockParams.delete(name);
            } else if (Array.isArray(value)) {
                mockParams.delete(name);
                value.forEach(v => mockParams.append(name, v));
            } else {
                mockParams.set(name, value);
            }
        }

    }

}