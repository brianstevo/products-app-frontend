import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styles:[`
    .active-link{
        color:blue;
    }`]
})

export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}