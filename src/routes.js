import {AppLayout} from "./layouts";
import {RepoView, NewRepoView} from './views';
const defaultRoutes = [
    {
        path: '/repo',
        component: RepoView
    }
];

const routes = [
    {
        path: '/',
        exact: true,
        component: NewRepoView
    },
    {
        path: '/*',
        exact: true,
        component: AppLayout,
        routes: defaultRoutes,
    },


];

export default routes;