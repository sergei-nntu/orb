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

// const options = {
//             method: "POST",
//             body: JSON.stringify({
//                 "x": 0.1,
//                 "y": 0.20,
//                 "z": 0.4,
//                 "pitch": 0.0,
//                 "roll": 0.0,
//                 "yaw": 0.0
//             })
//         };
//
//         const result = await request("/convert_pose", options);
//         console.log(result);
