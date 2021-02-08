import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  userData: any;
  userRole: string;
  constructor() { }
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role')
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

}
