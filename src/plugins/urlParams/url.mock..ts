

export function buildExternalParamsMock() {

    let mockParams: URLSearchParams = new URLSearchParams();

    return {

        getUrlParamMock(name: string): string | string[] | null {
            const values = mockParams.getAll(name);
            if (values.length === 0) return null;
            if (values.length === 1) return values[0];
            return values;
        },

        setUrlParamMock(name: string, value: string | string[] | null) {
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