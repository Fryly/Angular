import { ProfileService } from './../shared/profile.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../shared/token-storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const PROFILE: string[] = [
  'Личный кабинет', 'Изменить учетную запись', 'Адрес доставки', 'История заказов'
];

const STATUS: string[] = [
  'Ожидание проверки', 'Оформление заказа', 'Заказ завершен'
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userToken: any
  userData: any
  historyData: any
  ordersData
  profileList: string[] = PROFILE;
  activeProfileList = this.profileList[0]
  change: boolean
  isAdmin: boolean
  userForm: FormGroup
  addressForm: FormGroup
  status: string[] = STATUS;

  constructor(
    private token: TokenStorageService, 
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    ) 
    { }

  ngOnInit(): void {
    this.userToken = this.token.getToken();
    this.isAdmin = this.userToken.data.admin 
    this.getUser();
    this.getHistoryOrders();
    if(this.isAdmin){
      this.getOrders();
    }
  }

  onSelectProfileList(profileList: string): void {
    this.activeProfileList = profileList;
  }

  onChange(){
    this.change = !this.change
  }

  getUser() {
    let id = this.userToken.data._id
    this.profileService.getUser(id).subscribe((data) => {
      this.userData = data
      this.userForm = this.formBuilder.group({
        name: [this.userData.name, Validators.required],
        email: [this.userData.email, Validators.required],
        telefon: [this.userData.telefon, Validators.required],
      })
      this.addressForm = this.formBuilder.group({
        city: [this.userData.city, Validators.required],
        street: [this.userData.street, Validators.required],
        house: [this.userData.house, Validators.required],
      })
    })
  }

  getHistoryOrders(){
    let id = this.userToken.data._id
    this.profileService.getHistoryOrders(id).subscribe(data => {
      this.historyData = data
    })
  }

  getOrders(){
    this.profileService.getOrders().subscribe(data => {
      this.ordersData = data
    })
  }

  onSubmitUser(){
    if (window.confirm('Вы хотите изменить данные?')){
      let id = this.userToken.data._id
      this.profileService.patchUser(
        this.userForm.get('name').value, 
        this.userForm.get('email').value,
        this.userForm.get('telefon').value,
        id
      ).subscribe((data) => {
        this.getUser()
      })
    }
  }

  onSubmitAddress(){
    if (window.confirm('Вы хотите изменить данные?')){
        let id = this.userToken.data._id
        this.profileService.patchAddress(
          this.addressForm.get('city').value, 
          this.addressForm.get('street').value,
          this.addressForm.get('house').value,
          id
        ).subscribe((data) => {
          this.getUser()
        })
      }
    }

  onStatusClick(number, status){
    if (window.confirm('Вы хотите изменить статус')){
      this.profileService.patchStatus(
        status,
        number
      ).subscribe((data) => {
        this.getOrders();
      })
    }
  }
}
