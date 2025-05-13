declare module "flowbite-datepicker/Datepicker" {
  interface DatepickerOptions {
    autohide?: boolean;
    format?: string;
    defaultDate?: Date;
    minDate?: Date;
    inline?: boolean;
    // puedes extender esto luego si necesitas más
  }

  export default class Datepicker {
    constructor(element: HTMLElement, options?: DatepickerOptions)
  }
}
