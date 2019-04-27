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
  userUrl = '/search/users?q=';
  userUpdated = new Subject();
  countUpdated = new Subject();

  constructor(private http: HttpClient) { }

  onGetData(value: string): Observable<any> {
    return this.http.get( this.userUrl + value ).pipe(map((data) => {
      this.userData = data;
      this.setUserData(data['items']);
      this.setTotalData(data['total_count']);
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

  getUserData() {
    return this.users;
  }

  getTotalCount() {
    return this.count;
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


}
