
export class First {
  
  static get is() { return "test-first"; }

  static get properties() {
    return {
      "firstFoo": {
        "attribute": "first-foo",
      },
      "firstBar": {},
      "firstGoo": {
        "attribute": "first-goo",
      },
      "firstCar": {},
    }
  }

  static get events() {
    return [
      { "name": "fooChange" },
      { "name": "barUpdate" }
    ]
  }
}