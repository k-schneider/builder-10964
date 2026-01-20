import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <li><a routerLink="/my-page">My Page</a></li>
          <li><a routerLink="/builder-10964">Builder Page</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
})
export class App {
}
