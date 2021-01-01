import {AppLayout} from "./layouts";
import {RepoView, NewRepoView, BranchesView, BranchView, CommitView, PRListView, PRCreateView} from './views';
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
    {
        path: '/prs',
        component: PRListView
    },
    {
        path: '/prs/add',
        component: PRCreateView
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