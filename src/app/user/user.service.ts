import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class UseroneService {
  users: any;
  count: any;
  userData: any;
  repoData: any;
  repository: any;
  userUrl = '/search/users?q=';
  repoUrl = '/users/';
  userUpdated = new Subject();
  countUpdated = new Subject();
  repositoryUpdated = new Subject();

  constructor(private http: HttpClient) { }

  onGetData(value: string): Observable<any> {
    return this.http.get( this.userUrl + value ).pipe(map((data) => {
      this.userData = data;
      this.setUserData(data['items']);
      this.setTotalData(data['total_count']);
    }));
  }

  onGetRepoData(name: string): Observable<any> {
    return this.http.get( this.repoUrl + name + ['/repos']).pipe(map((repoData) => {
      // console.log(JSON.stringify(repoData));
      this.setRepositoryData(repoData);
    }));
  }

  setUserData(usersData: any) {
    this.users = usersData;
    this.userUpdated.next(this.users);
  }

  setTotalData(countData: string) {
    this.count = countData;
    this.countUpdated.next(this.count);
  }

  setRepositoryData(repoData: any) {
    this.repository = repoData;
    this.repositoryUpdated.next(this.repository);
  }

  sortUsersAZ() {
    this.users.sort(function(a, b) {
      const nameA = a.login.toUpperCase(); // ignore upper and lowercase
      const nameB = b.login.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  sortUsersZA() {
    this.sortUsersAZ();
    this.users.reverse();
  }

  sortByScoreAsc() {
    this.users.sort(function(a, b) {
      const nameA = +a.score;
      const nameB = +b.score;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
  sortByScoreDes() {
    this.sortByScoreAsc();
    this.users.reverse();
  }

  getUserData() {
    return this.users;
  }

  getTotalCount() {
    return this.count;
  }

  getRepoData() {
    return this.repository;
  }
}
