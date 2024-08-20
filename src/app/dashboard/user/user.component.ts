import { Component, OnInit } from '@angular/core';
import { UsrerecipeserService } from './services/usrerecipeser.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(
    private _UsrerecipeserService: UsrerecipeserService,

  ) { }




}
