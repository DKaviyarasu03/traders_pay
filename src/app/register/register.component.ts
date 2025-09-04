import { Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../shared/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  implements OnInit{
  registerData = {
    name: '',
    number: '',
    email: '' 
  };
  submitted: boolean = false;

  constructor(
    private registerService: LandingService,
    private toaster:ToastrService,
    private loader: LoaderService,
    private router: Router 
  ) {}

  ngOnInit(): void {

  }

  onSubmit() {
    this.loader.start()
    if (!this.registerData.name || !this.registerData.number || !this.registerData.email) {
      this.toaster.error("Fill all fields...")
      this.loader.stop();
      return;
    }

 
    const fd = new FormData();
    fd.append('name', this.registerData.name);
    fd.append('number', this.registerData.number);
    fd.append('email', this.registerData.email);

    this.registerService.register(fd).subscribe((data:any)=>{
          
      if(data.result == "success"){
        this.registerData.email = "";
        this.registerData.name = "";
        this.registerData.number = "";
        this.submitted = false;
        this.toaster.success(data.description)
        this.router.navigate(['/login']);

        this.loader.stop();
        
      }else{
        this.toaster.warning(data.description)
        this.loader.stop();
      }

    });
     
  
}

}