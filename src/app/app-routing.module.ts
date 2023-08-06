import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import { ComunicadosComponent } from './pages/Comunicados/comunicados/comunicados.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: ComunicadosComponent}
                ]
            },
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
