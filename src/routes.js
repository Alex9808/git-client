import {AppLayout} from "./layouts";
import {RepoView, NewRepoView, BranchesView, BranchView, CommitView} from './views';
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
    {
        path: '/commit/:commit',
        component: CommitView
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