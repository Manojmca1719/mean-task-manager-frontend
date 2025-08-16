import { Routes } from '@angular/router';
import { TaskManagerComponent } from './component/task-manager/task-manager.component';
import { NewTaskComponent } from './component/new-task/new-task.component';
import { NewListComponent } from './component/new-list/new-list.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'task',
        pathMatch:'full'
    },
    {
        path:'task',
        component:TaskManagerComponent,
        title: 'Task Manager'
    },
    {
        path:'task/:id',
        component:TaskManagerComponent,
        title: 'Task Manager'
    },
    {
        path:'task/:id/list',
        component:TaskManagerComponent,
        title: 'Task Manager'
    },
    {
        path:'new-task',
        component:NewTaskComponent,
        title:'New Task'
    },
    {
        path:'edit-task/:id',
        component:NewTaskComponent,
        title:'Edit Task'
    },
    {
        path:'new-todo/:id',
        component:NewListComponent,
        title:'New Todo'
    },
    // {
    //     path:'edit-todo',
    //     component:NewListComponent,
    //     title:'Edit Todo'
    // }
    {
        path:'edit-todo/:taskId/list/:listId',
        component:NewListComponent,
        title:'Edit Todo'
    },
];
