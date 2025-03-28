import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true, // ✅ Standalone component
  template: `
    <main>
      <router-outlet/>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = 'frontend';
}
