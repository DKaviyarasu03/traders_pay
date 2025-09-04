import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LandingService } from '../services/landing.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { LoaderService } from '../shared/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginData = {
    number: '',
    password: ''
  };
  showPassword: boolean = false;

  constructor(private toastr:ToastrService, private registerService: LandingService, private loader: LoaderService,private router: Router ) {}

  onLogin() {
    this.loader.start()
    const fd = new FormData();
    fd.append('number', this.loginData.number);
    fd.append('password', this.loginData.password);

    this.registerService.login(fd).subscribe((data:any)=>{

      if(data.result == "success"){
        this.loader.stop()
        this.toastr.success('Login successful', 'Success');
         this.router.navigate(['/dashboard']);
      }else{
        this.loader.stop()
        this.toastr.error('Login fail', 'fail');
      }

    })
    
  }

togglePassword(): void {
  this.showPassword = !this.showPassword;
}

}
