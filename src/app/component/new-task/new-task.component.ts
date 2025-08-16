import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-new-task',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit {
  public isFormValid: boolean = false;
  public taskForm!: FormGroup;
  public isEditForm: boolean = false;
  public editTask:any;
  constructor(private router: Router, private taskService: TaskService, private route: ActivatedRoute) {
    this.taskForm = new FormGroup({
      taskTitle: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/\S+/)])
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.isEditForm = params.get('id') ? true : false;
      if (this.isEditForm) {
        this.taskService.currentMessage$.subscribe((msg: any) => {
          this.editTask = msg
          this.taskForm.patchValue({
            taskTitle: this.editTask.taskTitle
          });
        });
      }
    })
  }

  taskFormSubmit() {
    this.isFormValid = false;
    if (this.taskForm.value) {
      let taskTitle = this.taskForm.value;
      if(this.isEditForm) {
        this.taskService.updateTask(this.editTask._id, taskTitle).subscribe((res: Task | any) => {
          this.router.navigate(['/task', this.editTask._id]);
        })
      } else {
        this.taskService.createTask(taskTitle).subscribe((res: Task | any) => {
          this.router.navigate(['/task', res._id]);
        })
      }
      this.taskForm.reset();
      // this.router.navigate(['/']);
    } else {
      this.isFormValid = true;
    }
  }
}
