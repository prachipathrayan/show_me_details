/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const nest = async (p: Promise<any> | Promise<any>[]) => {
    try {
        if (Array.isArray(p)) {
            const result = await Promise.all(p);
            return [null, result];
        } else {
            const result = await p;
            return [null, result];
        }
    } catch (err) {
        return [err, null];
    }
};
