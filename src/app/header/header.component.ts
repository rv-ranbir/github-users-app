import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UseroneService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private useroneService: UseroneService) { }

  ngOnInit() {
  }

  onSubmit(value: string, form: NgForm){
    this.router.navigate(['/search'],{queryParams: {value: value}});
    form.reset();
  }

}
