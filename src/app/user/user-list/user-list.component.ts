import { Component, OnInit } from '@angular/core';
import { UseroneService } from '../user.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:any;
  total: any;
  data: any;
  searchQuery: any;

  constructor( private useroneService: UseroneService,
               private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.useroneService.userUpdated.subscribe(user => this.users = user);
    this.useroneService.countUpdated.subscribe(total => this.total = total);

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['value'];
      console.log(this.searchQuery);
      this.useroneService.onGetData(this.searchQuery).subscribe((data) => {
        this.data = data;
        this.total = this.useroneService.getTotalCount();
        this.users = this.useroneService.getUserData();
      });
    });
  }
}
