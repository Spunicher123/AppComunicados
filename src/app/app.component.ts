import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    layoutMode = 'static';

    layoutColor = 'light';

    darkMenu = false;

    profileMode = 'inline';

    ripple = false;

    inputStyle = 'filled';

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
