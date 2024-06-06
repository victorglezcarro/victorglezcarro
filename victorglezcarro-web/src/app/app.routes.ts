import { Routes } from '@angular/router';
import { WorkingOnSaverComponent } from './components/working-on-saver/working-on-saver.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },
    { path: '**', redirectTo: ''}
];
