import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   constructor(
      private toastr:ToastrService
    ) {}
  ngOnInit(): void {

  }
  title = 'tradersPay';
}
