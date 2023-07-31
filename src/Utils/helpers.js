import { APPS } from '../Utils/constants';

export const GetApp = () => {

    const subDomain = getSubDomain(window.location.hostname);
    const main = APPS.find((app) => app.main);
    if (!main) throw new Error("Must have main app");
    if (subDomain === "") return main.app;

    const app = APPS.find((app) => subDomain === app.subdomain);
    if (!app) return main.app;
    return app.app;

}

const getSubDomain = (host) => {
    const locationParts = host.split(".");

    let sliceTill = -2;

    //localhost
    const isLocalHost = locationParts.slice(-1)[0] === "localhost";
    if (isLocalHost)
        sliceTill = -1;

    return locationParts.slice(0, sliceTill).join("");


}