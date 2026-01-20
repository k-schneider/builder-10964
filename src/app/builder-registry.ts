import { RegisteredComponent } from "@builder.io/sdk-angular";
import { MyCustomComponent } from "./my-custom-component";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: MyCustomComponent,
    name: "MyCustomComponent",
    inputs: [
      {
        name: "text",
        type: "string",
      }
    ]
  }
];
