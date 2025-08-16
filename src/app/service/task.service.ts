import { Injectable } from '@angular/core';
import { WerRequestService } from './wer-request.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private editTaskTitle = new BehaviorSubject<string>('');
  currentMessage$ = this.editTaskTitle.asObservable();
  
  constructor(private webRequest:WerRequestService) { }

  getAllTask() {
    return this.webRequest.get('task')
  }

  createTask(taskTitle:object) {
    return this.webRequest.post('task', taskTitle)
  }

  updateTask(taskId:string, taskTitle:object) {
    return this.webRequest.put(`task/${taskId}`,taskTitle)
  }

  deleteTask(taskId:string) {
    return this.webRequest.delete(`task/${taskId}`)
  }

  updateMessage(newMessage: string) {
    this.editTaskTitle.next(newMessage);
  }
}
