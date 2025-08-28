import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingMaskComponent } from './shared/component/LoadingMask/loadingMask.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoadingMaskComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Blog Admin System');
}
