declare module "number-suffix" {
  interface IOptions {
    measurement?: string;
    precision?: number;
    style?: string;
  }

  enum IStyles {
    "Thousand" = "Thousand",
    "Million" = "Million",
    "Billion" = "Billion",
    "Trillion" = "Trillion"
  }

  function format(num: number, options?: IOptions): string;

  class NumberSuffix {
    constructor(options?: IOptions);
    public addStyle(name: string, values: IStyles[]): void;
    public setDefaultStyle(name: string): void;
    public setOptions(options: IOptions): void;
  }
}
