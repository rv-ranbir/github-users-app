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
  repository: any;
  reposData: any;

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
    console.log(this.users);
  }

  showDetails(login: string){
    this.repository = null;
    this.useroneService.onGetRepoData(login).subscribe((repoData) => {
      this.repository = this.useroneService.getRepoData();
      this.reposData = repoData;
      console.log(JSON.stringify(repoData));
      console.log(login);
      console.log(this.reposData);
    });
  }
}
