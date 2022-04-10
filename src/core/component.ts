import EventBus from './event-bus'
import * as Handlebars from 'handlebars'
import { nanoid } from 'nanoid'

interface ComponentMeta<P = any> {
  props: P
}

type Events = Values<typeof Component.EVENTS>

export default class Component<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const

  public id = nanoid(6)
  private readonly _meta: ComponentMeta

  eventBus: () => EventBus<Events>

  protected _element: Nullable<HTMLElement> = null
  protected readonly props: P
  protected state: any = {}
  protected children: { [id: string]: Component } = {}
  protected refs: { [key: string]: HTMLElement } = {}
  protected events?: Record<string, (...arg: any[]) => void>

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>()

    this._meta = {
      props,
    }

    this.getStateFromProps(props)

    this.props = this._makePropsProxy(props || ({} as P))
    this.state = this._makePropsProxy(this.state)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Component.EVENTS.INIT, this.props)
  }

  get element() {
    return this._element
  }

  private _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Component.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources() {
    this._element = this._createDocumentElement('div')
  }

  private _init() {
    this.init()
    this._createResources()
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER, this.props)
  }

  protected init() {}

  private _componentDidMount(props: P) {
    this.componentDidMount(props)
  }

  protected componentDidMount(props: P) {}

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    return true
  }

  protected setProps = (nextProps: P) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  protected setChildProps = (childRefName: string, nextProps: P) => {
    if (!nextProps || !childRefName) {
      return
    }

    const childComponent = this.getChildByRef(childRefName)
    childComponent.setProps(nextProps)
    this.refs[childRefName] = childComponent.getContent()
  }

  protected getChildByRef = (ref: string) => {
    const childBlocks = Object.values(this.children).filter(c => c.element === this.refs[ref])
    return childBlocks[0]
  }

  protected setState = (nextState: any) => {
    if (!nextState) {
      return
    }

    Object.assign(this.state, nextState)
  }

  public getString = () => ''

  private _render() {
    const fragment = this._compile()

    this._removeEvents()
    const newElement = fragment.firstElementChild!

    this._element!.replaceWith(newElement)

    this._element = newElement as HTMLElement
    this._addEvents()
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Component.EVENTS.FLOW_CDM)
        }
      }, 100)
    }

    return this.element!
  }

  private _makePropsProxy(props: any): any {
    const self = this
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Component.EVENTS.FLOW_CDU, { ...target }, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    }) as unknown as P
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events

    if (!events || !this._element) {
      return
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener)
    })
  }

  private _addEvents() {
    if (!this.events) {
      return
    }

    Object.entries(this.events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener)
    })
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template')

    const template = Handlebars.compile(this.render())
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    })

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`)

      if (!stub) {
        return
      }

      stub.replaceWith(component.getContent())
    })

    return fragment.content
  }

  protected show() {
    this.getContent().style.display = 'block'
  }

  protected hide() {
    this.getContent().style.display = 'none'
  }

  protected getStateFromProps(props: any): void {
    this.state = {}
  }

  protected render(): string {
    return ''
  }
}
