
export class Second {
  
  static get is() { return "test-second"; }

  static get properties() {
    return {
      "secondFoo": {
        "attribute": "second-foo",
      },
      "secondBar": {},
      "secondGoo": {
        "attribute": "second-goo",
      },
      "secondCar": {},
    }
  }
}