import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  projId: number;
  newProject: Project = {};
  editForm = new FormGroup({
    projectName: new FormControl(''),
    projectDescription: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<EditProjectComponent>,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.displayProjectData();
    this.editForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.dialogRef.close();
      const userIdLC = parseInt(localStorage.getItem("userId"));
      const formData = this.editForm.value;
      const projectData: Project = {
        id: this.newProject.id,
        userId: userIdLC,
        name: formData.projectName,
        description: formData.projectDescription,
        status: 'testing',
      }

      this.projectService.updateProject(projectData).subscribe(() => {
        this._snackBar.open('Project updated', 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
    } else {
      this._snackBar.open('Error while updating project', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  displayProjectData() {
    const idLS = parseInt(localStorage.getItem("projectId"));
    this.projectService.getProjectById(idLS).subscribe((res: Project) => {
      this.newProject = res;
      // Update the form values with user data
      this.editForm.patchValue({
        projectName: this.newProject.name,
        projectDescription: this.newProject.description
      });
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
