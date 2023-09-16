export default function useHttp() {
    // FIXME: Function should be done with useCallback
    const request = async (url: string, options?: RequestInit | undefined) => {
        try {
            insertHeaders(options);

            const response = await fetch(url, options);
            const result = await response.json();

            if (response.ok) {
                return result;
            } else {
                console.log(response.status);
                return;
            }
        } catch (e){
            console.log((e as Error).message);
        }
    };

    return { request };
}

function insertHeaders(options?: RequestInit | undefined) {
    if (!options) {
        return;
    }

    options.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
    };

    return options;
}