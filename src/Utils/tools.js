export const uuid = () => {
    return 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const kebabize = str => {
    return str.split('').map((letter, idx) => {
        return letter.toUpperCase() === letter
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter;
    }).join('');
};


export const GenerateUrl = (object, methods = ["GET"]) => {
    const base = window?.ajaxurl || "";
    return Object.fromEntries(methods?.map(method => {
        return [method.toLowerCase(), Object.fromEntries(Object.keys(object[method.toLowerCase()])?.map(keys => {
            const host = new URL(`${window.location.origin}${base}`);
            const c = object[method.toLowerCase()][keys];
            c.map(({ param, value }) => host.searchParams.append(param, value));
            return [keys, host]
        }))]
    }))
}