declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module "*.js";
declare module "*.scss";

declare module "vue-hooks" {}

// Date
declare interface Date {
  Format(format: string): string;
  ToString(): string;
}
