import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admim',
    templateUrl: 'admin.component.html',
    styles:[`
    .active-link{
        color:blue;
    }`]
})

export class AdminComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}