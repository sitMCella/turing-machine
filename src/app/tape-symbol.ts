export class TapeSymbol {
  static NONE: String = "";
  static ANY: String = "any";
  static ONE: String = "1";
  static ZERO: String = "0";
  static SCHWA: String = "s";
  static X: String = "x";

  public value: String;

  constructor(value) {
    this.value = value;
  }
}
