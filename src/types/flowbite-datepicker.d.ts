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
    setDate(selectedDate: Date) {
      throw new Error("Method not implemented.");
    }
    constructor(element: HTMLElement, options?: DatepickerOptions)
  }
}
