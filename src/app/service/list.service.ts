import { Injectable } from '@angular/core';
import { WerRequestService } from './wer-request.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private editListTitle = new BehaviorSubject<string>('');
  currentList$ = this.editListTitle.asObservable();

  constructor(private webRequest: WerRequestService) { }

  getAllListTask(taskId: string) {
    return this.webRequest.get(`task/${taskId}/list`)
  }

  createNewListTask(taskId: String, listTitle: object) {
    return this.webRequest.post(`task/${taskId}/list`,listTitle)
  }

  updateListTask(taskId: String,listId:String, listTitle: object) {
    return this.webRequest.put(`task/${taskId}/list/${listId}`,listTitle)
  }

  deleteListTask(taskId: String,listId:String) {
    return this.webRequest.delete(`task/${taskId}/list/${listId}`)
  }

  shareCurrentList(List:string) {
    this.editListTitle.next(List);
  }
}
