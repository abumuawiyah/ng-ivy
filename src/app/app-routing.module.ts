import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {path: 'feature', loadChildren: './feature/feature.module#FeatureModule'}
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module')
      .then(({ FeatureModule }) => FeatureModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
