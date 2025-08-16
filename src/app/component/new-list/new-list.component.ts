import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-new-list',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent implements OnInit{
  public isFormValid: boolean = false;
  public listForm!: FormGroup;
  public curTaskId: any;
  public isEditUrl: boolean = false;
  public editList:any;

  constructor(private router:Router, private listService$:ListService, private route: ActivatedRoute){
    this.listForm = new FormGroup({
      listTitle : new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern(/\S+/)])
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.curTaskId = params.get('id');
      this.isEditUrl = this.router.url.startsWith('/edit-todo');
      if(this.isEditUrl) {
        this.listService$.currentList$.subscribe((curList:any)=> {
          this.editList = curList
          this.listForm.patchValue({
            listTitle: this.editList.listTitle
          });
        })
      }
    });
 }

 listFormSubmit() {
    this.isFormValid = false;
    if(this.listForm.value) {
      let listTitle = this.listForm.value;
      if(this.isEditUrl) {
        this.listService$.updateListTask(this.editList._taskId,this.editList._id,listTitle).subscribe(()=>{
          this.router.navigate(['/task', this.editList._taskId,'list']);
        })
      }else {
        this.listService$.createNewListTask(this.curTaskId,listTitle).subscribe(()=>{
          this.router.navigate(['/task',this.curTaskId,'list']);
        })
      }
      this.listForm.reset();
    }else {
      this.isFormValid = true;
    }
  }
}
