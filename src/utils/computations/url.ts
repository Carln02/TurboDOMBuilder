function replaceUrlParams(...params: {name: string, value: string}[]) {
    const url = new URL(window.location.href);
    params.forEach(({name, value}) => url.searchParams.set(name, value));
    history.replaceState(null, "", url);
}

function getUrlParam(name: string) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function pushUrlParams(...params: {name: string, value: string}[]) {
    const url = new URL(window.location.href);
    params.forEach(({name, value}) => url.searchParams.set(name, value));
    history.pushState(null, "", url);
}

function clearUrlParams() {
    const url = new URL(window.location.href);
    url.searchParams.forEach((_, name) => url.searchParams.delete(name));
    history.replaceState(null, "", url);
}

export {replaceUrlParams, getUrlParam, pushUrlParams, clearUrlParams};