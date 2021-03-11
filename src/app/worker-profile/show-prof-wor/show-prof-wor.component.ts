import {Component, Input, OnInit} from '@angular/core';
import {WorkersService} from '../../services/workers.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-show-prof-wor',
  templateUrl: './show-prof-wor.component.html',
  styleUrls: ['./show-prof-wor.component.css']
})
export class ShowProfWorComponent implements OnInit {

  @Input() wor: any;
  @Input() categ: any;

  worker: any;

  Workers: any = [];

  status;

  user: any = [];

  WorkersNameFilter: string = '';
  WorkersPhoneFilter: string = '';
  WorkersEmailFilter: string = '';
  WorkersPosFilter: string = '';


  WorkersWithoutFilter: any = [];

  ModalTitle2: string;
  ActivateAddEditWor = false;

  categ_id = '';

  constructor(private apiWorkers: WorkersService,
              private apiUser: UserService) {
  }


  ngOnInit(): void {


    this.categ_id = window.location.href.split('/').pop();
    console.log(this.categ_id);
    this.getAllByCatalog();
    this.getUserWithToken(localStorage.getItem('my-token'));

    if (this.user != null) {
      this.status = Boolean(this.user.is_staff);
    }
  }


  getAllByCatalog = () => {
    this.apiWorkers.getAllWorkersByCategory(this.categ_id).subscribe(
      data => {
        this.Workers = data;
        this.WorkersWithoutFilter = data;
      },
      error => {
        console.log(error);
      }
    );
  };


  addClick() {
    this.worker = {
      id: 0,
      name: '',
      phone: '',
      email: '',
      position: '',
      category: {
        id: 1,
        parent_id: 0,
        name: ''
      },
      opt: 'add'
    };
    this.ModalTitle2 = 'Добавление сотрудников';
    this.ActivateAddEditWor = true;
  }

  editClick(item) {
    this.worker = item;
    this.worker.opt = 'edit';
    this.ModalTitle2 = 'Редактирование сотрудников';
    this.ActivateAddEditWor = true;
  }

  closeClick() {
    this.ActivateAddEditWor = false;
    this.getAllByCatalog();
  }

  deleteClick(item) {
    if (confirm('Вы уверены?')) {
      this.apiWorkers.delWorkers(item.id).subscribe(data => {
          alert('Запись удачно удалена');
          this.getAllByCatalog();
        },
        error => {
          console.log(error);
        });
    }
  }

  FilterFn() {
    let WorkersNameFilter = this.WorkersNameFilter;
    let WorkersPhoneFilter = this.WorkersPhoneFilter;
    let WorkersEmailFilter = this.WorkersEmailFilter;
    let WorkersPosFilter = this.WorkersPosFilter;

    this.Workers = this.WorkersWithoutFilter.filter(function(el) {
      return el.name.toString().toLowerCase().includes(
        WorkersNameFilter.toString().trim().toLowerCase()
        ) && el.email.toString().toLowerCase().includes(
        WorkersEmailFilter.toString().trim().toLowerCase()) &&
        el.phone.toString().toLowerCase().includes(
          WorkersPhoneFilter.toString().trim().toLowerCase()
        ) && el.position.toString().toLowerCase().includes(
          WorkersPosFilter.toString().trim().toLowerCase());
    });
  }

  getUserWithToken(MyToken) {
    this.apiUser.getUserWithToken(MyToken).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
