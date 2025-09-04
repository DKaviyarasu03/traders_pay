import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  // environment:any = "https://profitapi.bestyfood.com/"
  environment:any = "https://backend.profittraders.in/"

  constructor(private http: HttpClient) { }


   register(fd: FormData) {
    return this.http.post(this.environment + 'offlinestore/post_offline_store_form_temp/', fd);
  }
   login(fd: FormData) {
    return this.http.post(this.environment + 'offlinestore/get_login_offline_store_temp/', fd);
  }
  
   shops() {
    return this.http.get(this.environment + 'offlinestore/get_temp_offline_stores/');
  }
  

}
