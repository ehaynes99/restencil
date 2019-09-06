import { Component, Prop, h, State, Watch } from '@stencil/core'

export interface ListItem {
  id: number
  text: string
}

@Component({
  tag: 'restencil-list',
  styleUrl: 'list.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The count of the list
   */
  @Prop() items: ListItem[] = []

  @State() sortedItems: ListItem[] = []

  @State() ascending: boolean = true

  @Watch('items')
  sortItems() {
    console.log('items changed', this.items)
    const sortedItems = this.items.slice().sort((a, b) => {
      return a.text.localeCompare(b.text)
    })
    if (!this.ascending) {
      sortedItems.reverse()
    }
    console.log('new sorted items', sortedItems)
    this.sortedItems = sortedItems
  }

  componentWillLoad() {
    return Promise.resolve().then(() => this.sortItems())
  }

  toggleSort() {
    this.ascending = !this.ascending
    this.sortItems()
  }

  render() {
    console.log(this.items)
    const direction = this.ascending ? 'z-a' : 'a-z'
    return (
      <div class="list">
        <button onClick={() => this.toggleSort()}>Sort {direction}</button>
        <ul>
          {this.sortedItems.map(item => (
            <li>{item.text}</li>
          ))}
        </ul>
      </div>
    )
  }
}
