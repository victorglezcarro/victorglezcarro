import { Routes } from '@angular/router';
import { WorkingOnSaverComponent } from './components/working-on-saver/working-on-saver.component';

export const routes: Routes = [
    { path: '', component: WorkingOnSaverComponent, pathMatch: 'full' },
    { path: '**', redirectTo: ''}
];
