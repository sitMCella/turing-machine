import { TuringMachinePage } from "./app.po";

describe("turing-machine App", () => {
  let page: TuringMachinePage;

  beforeEach(() => {
    page = new TuringMachinePage();
  });

  it("should display welcome message", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("Welcome to app!");
  });
});
