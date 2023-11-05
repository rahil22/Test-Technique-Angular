import { Component, OnInit } from '@angular/core';
import { JsonServiceService } from '../Services/json-service.service';

@Component({
  selector: 'app-json-component',
  templateUrl: './json-component.component.html',
  styleUrls: ['./json-component.component.css']
})
export class JsonComponentComponent implements OnInit {

  constructor(private Service:JsonServiceService) { }

  ngOnInit(): void {
    this.Service.generateImageDataArray(); 
  }
}
