import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private colorScheme: Theme = Theme.Dark;
  private colorSchemeAttrName = 'color-scheme';
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  init() {
    this._getColorScheme();
    this.renderer.setAttribute(document.firstElementChild, this.colorSchemeAttrName, this.colorScheme);
  }

  _detectPreferredColorScheme() {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light;
    } else {
      this.colorScheme = Theme.Light;
    }
  }

  _setColorScheme(scheme: Theme) {
    this.colorScheme = scheme;
    localStorage.setItem('scheme', scheme);
  }

  _getColorScheme() {
    const localStorageColorScheme = localStorage.getItem('scheme');
    localStorageColorScheme ? this.colorScheme = localStorageColorScheme as Theme : this._detectPreferredColorScheme();
  }

  set(scheme: Theme) {
    this._setColorScheme(scheme);
    this.renderer.setAttribute(document.firstElementChild, this.colorSchemeAttrName, scheme);
  }

  get(): Theme {
    return this.colorScheme;
  }
}
