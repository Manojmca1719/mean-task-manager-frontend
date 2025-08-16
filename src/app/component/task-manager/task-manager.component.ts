import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/task.model';
import { List } from '../../models/list.model';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-task-manager',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent implements OnInit{

  tasks: Task[]= [];
  lists: List[]= [];
  public isListLoaded: boolean = false;
  public isListLoadedID: any;
  constructor(private taskService$: TaskService, private router:Router,private route:ActivatedRoute,private listService$:ListService) { }

  ngOnInit() {
    this.isListLoaded = this.route.snapshot.paramMap.get('id') ? true : false;
    this.isListLoadedID = this.isListLoaded ? this.route.snapshot.paramMap.get('id') : '';
    this.loadAllTasks();
    console.log(this.isListLoaded)
  }
  
  public loadAllLists(task:any ) {
    let id = task._id;
    this.isListLoaded = this.route.snapshot.paramMap.get('id') ? true : false;
    console.log(this.isListLoaded)
    this.router.navigate(['/task/'+task._id+'/list']);
    this.isListLoadedID = id;
    setTimeout(() => {   
      this.callLoadAllLists(id);
    }, 0);
  }

  public callLoadAllLists(id:any){
    this.listService$.getAllListTask(id).subscribe((lists: any[] | any) => {
      this.lists = lists;
    });
  }

  public loadAllTasks() {
    this.taskService$.getAllTask().subscribe((tasks:any[] | any) => {
      this.tasks = tasks;
    },(error) => {
      console.error('Error fetching loadAllTasks() data:', error);
    }, () => {
      if(this.isListLoaded) {
        let tasks = this.tasks;
        let task = tasks.find((item) => item._id == this.isListLoadedID);
        this.loadAllLists(task)
      }
    }
  )
    // setTimeout(() => {
    //   if(this.isListLoaded) {
    //     let tasks = this.tasks;
    //     let task = tasks.find((item) => item._id == this.isListLoadedID);
    //     console.log(tasks);
    //     console.log(task);
    //     this.loadAllLists(task)
    //   }
    // }, 100);
  }

  public editTask(task:any) {
    this.taskService$.updateMessage(task);
    this.router.navigate(['/edit-task',task._id]);
  }

  public deleteTask(id:any) {
    this.taskService$.deleteTask(id).subscribe((res:any)=> {
      if(res.message) {
        this.loadAllTasks();
      }
    })
  }

  public deleteList(id:any) {
    this.listService$.deleteListTask(this.isListLoadedID,id).subscribe((res:any)=>{
      if(res.message) {
        this.loadAllTasks();
      }
    })
  }

  public editList(list:any) {
    this.listService$.shareCurrentList(list);
    this.router.navigate([`/edit-todo/${this.isListLoadedID}/list/${list._id}`])
  }
}
