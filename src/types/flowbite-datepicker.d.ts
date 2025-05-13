declare module "flowbite-datepicker/Datepicker" {
  interface DatepickerOptions {
    autohide?: boolean;
    format?: string;
    defaultDate?: Date;
    minDate?: Date;
    inline?: boolean;
  }

  export default class Datepicker {
    constructor(element: HTMLElement, options?: DatepickerOptions);

    /**
     * Establece la fecha seleccionada del datepicker.
     * @param date Fecha a establecer
     */
    setDate(date: Date): void;
  }
}
