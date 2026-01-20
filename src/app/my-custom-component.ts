import { Component, input } from '@angular/core';

@Component({
  selector: 'app-my-custom-component',
  template: `<div>{{ text() }}</div>`,
  host: {
    class: "contents",
  },
})
export class MyCustomComponent {
   text = input<string>();
}
