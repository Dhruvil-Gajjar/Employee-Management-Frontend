import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() emp:any;
  EmployeeId!:string;
  EmployeeName!:string;
  Department!:string;
  DateOfJoining!:string;
  ImageFileName!:string;
  ImageFilePath!:string;

  DepartmentsList:any=[];

  ngOnInit(): void {
    this.loadDepartmenList();
  }

  loadDepartmenList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentsList=data;

      this.EmployeeId=this.emp.EmployeeId;
      this.EmployeeName=this.emp.EmployeeName;
      this.Department=this.emp.Department;
      this.DateOfJoining=this.emp.DateOfJoining;
      this.ImageFileName=this.emp.ImageFileName;
      this.ImageFilePath=this.service.PhotoUrl+this.ImageFileName;
    });
  }

  addEmployee(){
    var val = {EmployeeId:this.EmployeeId,
               EmployeeName:this.EmployeeName,
               Department:this.Department,
               DateOfJoining:this.DateOfJoining,
               ImageFileName:this.ImageFileName
              };
    this.service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateEmployee(){
    var val = {EmployeeId:this.EmployeeId,
               EmployeeName:this.EmployeeName,
               Department:this.Department,
               DateOfJoining:this.DateOfJoining,
               ImageFileName:this.ImageFileName
              };
    this.service.updateEmployee(val).subscribe(res=>{
    alert(res.toString());
    });
  }

  uploadImage(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFILE', file, file.name);

    this.service.UploadImage(formData).subscribe((data:any)=>{
      this.ImageFileName=data.toString();
      this.ImageFilePath=this.service.PhotoUrl+this.ImageFileName;
    })
  }

}
