import {Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppConfig} from'./demo/domain/appconfig';
import {ConfigService} from './demo/service/app.config.service';
import {Subscription} from 'rxjs';
@Component({
    selector: 'app-config',
    template: ``
})
export class AppConfigComponent implements OnInit {

    themes: any[];

    flatLayoutColors: any[];

    themeColor = 'purple';

    layout = 'purple';
    
    config: AppConfig;

    subscription: Subscription;

    constructor(public app: AppComponent, public appMain: AppMainComponent, public configService: ConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });

        this.flatLayoutColors = [
            {name: 'Blue', file: 'blue', color: '#0d6efd'},
            {name: 'Indigo', file: 'indigo', color: '#6610f2'},
            {name: 'Purple', file: 'purple', color: '#6f42c1'},
            {name: 'Pink', file: 'pink', color: '#d63384'},
            {name: 'Orange', file: 'orange', color: '#fd7e14'},
            {name: 'Yellow', file: 'yellow', color: '#ffc107'},
            {name: 'Green', file: 'green', color: '#198754'},
            {name: 'Teal', file: 'teal', color: '#20c997'},
            {name: 'Cyan', file: 'cyan', color: '#0dcaf0'},
        ];
        this.themes = [
            {name: 'Blue', file: 'blue', color: '#0d6efd'},
            {name: 'Indigo', file: 'indigo', color: '#6610f2'},
            {name: 'Purple', file: 'purple', color: '#6f42c1'},
            {name: 'Pink', file: 'pink', color: '#d63384'},
            {name: 'Orange', file: 'orange', color: '#fd7e14'},
            {name: 'Yellow', file: 'yellow', color: '#ffc107'},
            {name: 'Green', file: 'green', color: '#198754'},
            {name: 'Teal', file: 'teal', color: '#20c997'},
            {name: 'Cyan', file: 'cyan', color: '#0dcaf0'},
        ];
    }

    onLayoutColorChange(event, color) {
        this.app.layoutColor = color;
        this.app.darkMenu = color === 'dark';

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + this.app.layoutColor + '.css';
        const newURL = urlTokens.join('/');

        this.replaceLink(themeLink, newURL);

        this.configService.updateConfig({...this.config, ...{dark:this.app.layoutColor === 'dark'}});
    }

    changeLayout(layout: string) {
        this.layout = layout;

        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + layout + '.css';
        this.replaceLink(layoutLink, layoutHref);
    }

    changeComponentTheme(theme: string) {
        this.themeColor = theme;

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/' + theme + '/theme-' + this.app.layoutColor + '.css';
        this.replaceLink(themeLink, themeHref);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        }
        else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.appMain.configActive = false;
        event.preventDefault();
    }
}
