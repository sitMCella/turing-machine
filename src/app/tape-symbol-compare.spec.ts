import { TapeSymbolCompare } from "./tape-symbol-compare";
import { TapeSymbol } from "./tape-symbol";

describe("TapeSymbolCompare", () => {
  let tapeSymbolCompare: TapeSymbolCompare;

  beforeEach(() => {
    tapeSymbolCompare = new TapeSymbolCompare();
  });

  it("should return true if first symbol is NONE and second symbol is NONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.NONE),
        new TapeSymbol(TapeSymbol.NONE),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is ONE and second symbol is ONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ONE),
        new TapeSymbol(TapeSymbol.ONE),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is ZERO and second symbol is ZERO", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ZERO),
        new TapeSymbol(TapeSymbol.ZERO),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is SCHWA and second symbol is SCHWA", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.SCHWA),
        new TapeSymbol(TapeSymbol.SCHWA),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is X and second symbol is X", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.X),
        new TapeSymbol(TapeSymbol.X),
      ),
    ).toEqual(true);
  });

  it("should return false if first symbol is NONE and second symbol is ONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.NONE),
        new TapeSymbol(TapeSymbol.ONE),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is NONE and second symbol is ZERO", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.NONE),
        new TapeSymbol(TapeSymbol.ZERO),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is NONE and second symbol is SCHWA", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.NONE),
        new TapeSymbol(TapeSymbol.SCHWA),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is NONE and second symbol is X", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.NONE),
        new TapeSymbol(TapeSymbol.X),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is ONE and second symbol is NONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ONE),
        new TapeSymbol(TapeSymbol.NONE),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is ONE and second symbol is ZERO", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ONE),
        new TapeSymbol(TapeSymbol.ZERO),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is ONE and second symbol is SCHWA", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ONE),
        new TapeSymbol(TapeSymbol.SCHWA),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is ONE and second symbol is X", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ONE),
        new TapeSymbol(TapeSymbol.X),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is ZERO and second symbol is NONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ZERO),
        new TapeSymbol(TapeSymbol.NONE),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is ZERO and second symbol is ONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ZERO),
        new TapeSymbol(TapeSymbol.ONE),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is ZERO and second symbol is SCHWA", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ZERO),
        new TapeSymbol(TapeSymbol.SCHWA),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is ZERO and second symbol is X", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ZERO),
        new TapeSymbol(TapeSymbol.X),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is SCHWA and second symbol is NONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.SCHWA),
        new TapeSymbol(TapeSymbol.NONE),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is SCHWA and second symbol is ONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.SCHWA),
        new TapeSymbol(TapeSymbol.ONE),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is SCHWA and second symbol is ZERO", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.SCHWA),
        new TapeSymbol(TapeSymbol.ZERO),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is SCHWA and second symbol is X", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.SCHWA),
        new TapeSymbol(TapeSymbol.X),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is X and second symbol is NONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.X),
        new TapeSymbol(TapeSymbol.NONE),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is X and second symbol is ONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.X),
        new TapeSymbol(TapeSymbol.ONE),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is X and second symbol is ZERO", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.X),
        new TapeSymbol(TapeSymbol.ZERO),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is X and second symbol is SCHWA", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.X),
        new TapeSymbol(TapeSymbol.SCHWA),
      ),
    ).toEqual(false);
  });

  it("should return true if first symbol is ANY and second symbol is ONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ANY),
        new TapeSymbol(TapeSymbol.ONE),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is ANY and second symbol is ZERO", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ANY),
        new TapeSymbol(TapeSymbol.ZERO),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is ANY and second symbol is SCHWA", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ANY),
        new TapeSymbol(TapeSymbol.SCHWA),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is ANY and second symbol is X", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ANY),
        new TapeSymbol(TapeSymbol.X),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is ONE and second symbol is ANY", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ONE),
        new TapeSymbol(TapeSymbol.ANY),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is ZERO and second symbol is ANY", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ZERO),
        new TapeSymbol(TapeSymbol.ANY),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is SCHWA and second symbol is ANY", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.SCHWA),
        new TapeSymbol(TapeSymbol.ANY),
      ),
    ).toEqual(true);
  });

  it("should return true if first symbol is X and second symbol is ANY", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.X),
        new TapeSymbol(TapeSymbol.ANY),
      ),
    ).toEqual(true);
  });

  it("should return false if first symbol is ANY and second symbol is NONE", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.ANY),
        new TapeSymbol(TapeSymbol.NONE),
      ),
    ).toEqual(false);
  });

  it("should return false if first symbol is NONE and second symbol is ANY", () => {
    expect(
      tapeSymbolCompare.compare(
        new TapeSymbol(TapeSymbol.NONE),
        new TapeSymbol(TapeSymbol.ANY),
      ),
    ).toEqual(false);
  });
});
