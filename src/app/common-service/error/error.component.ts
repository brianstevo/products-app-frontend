import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: 'error.component.html',
    styles:[`
    .active-link{
        color:blue;
    }`]
})

export class ErrorComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}