import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProfileResultsMock } from './profile-results.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Student Profile';
  studentForm = new FormGroup({})
  profileResults:any = ProfileResultsMock;
  paginationConfig = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.profileResults.count
  };
  finalDisplayResults: any;

  constructor() {
    this.studentForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      createdDate: new FormControl()
    });
    this.paginationIdsCalculation();
  }

  paginationIdsCalculation() {
    this.profileResults.forEach((element,index) => {
      element.id = index + 1;
    });
    this.finalDisplayResults = JSON.parse(JSON.stringify(this.profileResults));
  }

  onStudentFormSubmit() {
    if(this.studentForm.valid) {
      this.studentForm.value.createdDate = Date.now();
      console.log(this.studentForm.value);
    }
  }
  pageChanged(event) {
    this.paginationConfig.currentPage = event;
  }
}
