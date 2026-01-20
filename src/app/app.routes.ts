import { Routes } from '@angular/router';
import { BuilderPage } from './builder-page';
import { MyPage } from './my-page';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "my-page",
  },
  {
    path: "my-page",
    component: MyPage,
  },
  {
    path: "**",
    component: BuilderPage,
  }
];
