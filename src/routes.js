import {AppLayout} from "./layouts";
import {RepoView, NewRepoView, BranchesView, BranchView} from './views';
const defaultRoutes = [
    {
        path: '/repo',
        component: RepoView
    },
    {
        path: '/branches',
        component: BranchesView
    },
    {
      path: '/branch',
      component: BranchView
    },

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