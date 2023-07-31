import AppRouter  from "../Routers/App";
import AdminRouter  from "../Routers/Admin";
import MasterAdminRouter from "../Routers/MasterAdmin";

export const APPS = [
    {
        subdomain: "admin",
        app: AppRouter,
        main: false
    },
    {
        subdomain: "www",
        app: AdminRouter,
        main: true
    },
    {
        subdomain: "master",
        app: MasterAdminRouter,
        main: false
    }
]