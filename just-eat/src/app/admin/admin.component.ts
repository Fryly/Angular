import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import {debounceTime, filter, switchMap} from 'rxjs/operators';
import { AdminService } from '../shared/admin.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';


const STATUS: string[] = [
  'Ожидание проверки', 'Оформление заказа', 'Заказ завершен'
];

const ADMIN: string[] = [
  'Заказы', 'Изменить данные ресторана', 'Добавить ресторан'
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ordersData: any;
  error: boolean = false;
  restaurant: any = null;
  status: string[] = STATUS;
  adminList: string[] = ADMIN;
  changeRestaurantForm: FormGroup;
  addRestaurantForm: FormGroup;
  findControl = new FormControl();
  activeAdminList = this.adminList[0]
  file: any;
  id: any = Math.floor(Math.random()*10)

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(
    private profileService: ProfileService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(){
      this.getOrders();
      this.getSearch();
      this.addRestaurantForm = this.formBuilder.group({
        addname: ['', Validators.required],
        addkitchen: ['', Validators.required],
        addeat: ['', Validators.required],
        addopen: ['', Validators.required],
        addclose: ['', Validators.required],
        adddelivery: false,
      })
  }

  getSearch(){
    this.findControl.valueChanges
      .pipe(
        filter(value => value.length > 2),
        debounceTime(1000),
        switchMap(value =>
          this.adminService.getRestaurant(value)
        )
      )
      .subscribe(data => {
        this.restaurant = data;
        if(this.restaurant !== null){
          this.changeRestaurantForm = this.formBuilder.group({
            name: [this.restaurant.name, Validators.required],
            kitchen: [this.restaurant.country.toString(), Validators.required],
            eat: [this.restaurant.food, Validators.required],
            open: [this.restaurant.openTime, Validators.required],
            close: [this.restaurant.closeTime, Validators.required],
            delivery: [this.restaurant.delivery],
          })
          this.error = false;
        }else{
          this.error = true;
        }
      });
  }

  getOrders(){
    this.profileService.getOrders().subscribe(data => {
      this.ordersData = data
    })
  }

  onSelectAdminList(adminList: string): void {
    this.activeAdminList = adminList;
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

  onChangeSubmit(){
    if (window.confirm('Вы хотите изменить данные?')){
      const imageLogo = this.fileInput.nativeElement.files[0]
      const file = new FormData();
      file.set('file',imageLogo)
      const strKitchen = this.changeRestaurantForm.get('kitchen').value.split(',')
      this.adminService.changeImg(file, this.restaurant._id).subscribe(() => {
       
      })
      this.adminService.changeRestaurant(
        this.changeRestaurantForm.get('name').value, 
        strKitchen,
        this.changeRestaurantForm.get('eat').value,
        this.changeRestaurantForm.get('open').value,
        this.changeRestaurantForm.get('close').value,
        this.changeRestaurantForm.get('delivery').value,
        this.restaurant._id,
      )
      .subscribe(() => { 
        this.findControl = new FormControl(''); 
        this.restaurant = null
        this.getSearch();
      });
    }
  }

  onFileSelect(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  onAddSubmit(){
    const addKitchen = this.addRestaurantForm.get('addkitchen').value.split(',')
    console.log(addKitchen)
    const formData = new FormData();
    formData.append('name', this.addRestaurantForm.get('addname').value);
    formData.append('kitchen', addKitchen);
    formData.append('eat', this.addRestaurantForm.get('addeat').value);
    formData.append('open', this.addRestaurantForm.get('addopen').value);
    formData.append('close', this.addRestaurantForm.get('addclose').value);
    formData.append('delivery', this.addRestaurantForm.get('adddelivery').value);
    formData.append('id', this.id);
    formData.append('file', this.file);
    this.adminService.addRestaurant(
      formData
    )
    .subscribe(
      data => {
        this.addRestaurantForm = this.formBuilder.group({
          addname: ['', Validators.required],
          addkitchen: ['', Validators.required],
          addeat: ['', Validators.required],
          addopen: ['', Validators.required],
          addclose: ['', Validators.required],
          adddelivery: false,
        })
      }
    )
  }

}
