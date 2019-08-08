
export class FirstSub {
  
  static get is() { return "test-first-sub"; }

  static get events() {
    return [
      { "name": "somethingHappen" },
      { "name": "bigChange" }
    ]
  }
}