import {AppLayout} from "./layouts";
import {RepoView, NewRepoView, BranchesView, BranchView, CommitView, PRListView} from './views';
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