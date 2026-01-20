import { Component, effect, inputBinding, viewChild, ViewContainerRef } from "@angular/core";
import { MyCustomComponent } from "./my-custom-component";

@Component({
  selector: 'app-my-page',
  imports: [],
  template: `<ng-container #container />`,
  host: {
    class: "contents",
  },
})
export class MyPage {
  private vcr = viewChild('container', { read: ViewContainerRef });

   constructor() {
    effect(() => {
      const containerRef = this.vcr();
      if (containerRef) {
        containerRef.createComponent(MyCustomComponent, {
          bindings: [
            inputBinding('text', () => 'Hello World!'),
          ],
        });

        containerRef.createComponent(MyCustomComponent, {
          bindings: [
            inputBinding('text', () => 'Bonjour World!'),
          ],
        });
      }
    });
  }
}
