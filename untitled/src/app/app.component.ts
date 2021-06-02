import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled';

  language = 'ru';

  obj: any = [];

  answers = [];
  leng = 0;
  answer = '';

  values_ru = [
    {value: 'transfer', mean: 'Сделай перевод'},
    {value: 'mobile', mean: 'Оплати мобильный телефон'},
    {value: 'balans', mean: 'Покажи баланс'},
    {value: 'curs', mean: 'Какой сейчас курс валют?'},
    {value: 'weather', mean: 'Какая погода?'},
    {value: 'isday', mean: 'Какой сегодня день?'},
    {value: 'time', mean: 'Часы работы банка'}

  ];

  constructor() {
    if (this.language === 'ru'){
      this.obj.push('q:Здравствуйте, я бот мобильного приложения БелВЭБ банка. Чем я могу помочь? (Нужно выбрать ответ)');
    }
  }

  ngOnInit() {
  }

  changeCity(value: string) {

    this.obj.push('a:' + this.values_ru[(this.values_ru.findIndex(it => it.value ===  value))].mean);
    switch (value){
      case 'transfer':
        this.obj.push('q:Хорошо, делаем перевод. Введите номер карты получателя и сумму перевода. (Через пробел)');
        break;
      case 'mobile':
        this.obj.push('q:Отлично, давайте пополним счет телефона. Введите номер телефона и сумму пополнения.');
        break;
      case 'balans':
        this.obj.push('q:Это ваш текущий баланс: ');
        break;
      case 'curs':
        this.obj.push('q:Курс валют на 20.05.2021:');
        break;
      case 'weather':
        this.obj.push('q:Исходя данных сайта сейчас . ');
        break;
      case 'isday':
        this.obj.push('q:Сегодня 20 мая, четверг.');
        break;
      case 'time':
        this.obj.push('q:Часы работы банка сегодня такие: . Банкоматы и инфокиоски работаеют круглосуточно.');
        break;
    }
    console.log(this.obj);
    // @ts-ignore
   /* this.answers.push(value);
    this.leng = this.answers.length;
    this.answer = this.answers[this.leng - 1];*/
    //console.log(value, this.answers, this.leng, this.answers[this.leng - 1]);
  }
}
