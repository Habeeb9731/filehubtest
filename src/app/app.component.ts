import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div class="container">
      <header>
        <h1>🍳 Recipe Manager</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    header {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 300;
    }
    
    main {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      overflow: hidden;
    }
  `]
})
export class AppComponent {
    title = 'recipe-app';
} 