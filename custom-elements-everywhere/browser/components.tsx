// deno-lint-ignore-file no-explicit-any
/// <reference lib="dom" />

import {Component, EmptyAttrs, RenderBasic, ChildrenAttr, GenericEventHandler} from "jsr:@velotype/velotype"

import './shared/ce-without-children.js'
import './shared/ce-with-children.js'
import './shared/ce-with-properties.js'
import './shared/ce-with-event.js'

declare module 'jsr:@velotype/velotype/jsx-runtime' {
    namespace JSX {
        interface IntrinsicElements {
            'ce-without-children': {id: string}
            'ce-with-children': {id: string} & ChildrenAttr
            'ce-with-properties': {
                id: string
                bool: boolean
                num: number
                str: string
                arr: string[]
                obj: {org: string, repo: string}
                camelCaseObj: {label: string}
            }
            'ce-with-event': {
                id: string
                onlowercaseevent?: GenericEventHandler<HTMLElement>
                'on-kebab-event'?: GenericEventHandler<HTMLElement>
                'on-camelEvent'?: GenericEventHandler<HTMLElement>
                'on-CAPSevent'?: GenericEventHandler<HTMLElement>
                'on-PascalEvent'?: GenericEventHandler<HTMLElement>
            } & ChildrenAttr

            // ce-unregistered is unregistered, this line just makes the IDE happy
            'ce-unregistered': any
        }
    }
}

export class ComponentWithoutChildren extends Component<EmptyAttrs> {
    render() {
        return <div>
            <ce-without-children id="wc"></ce-without-children>
        </div>
    }
}

export class ComponentWithChildren extends Component<EmptyAttrs> {
  render() {
    return <div>
        <ce-with-children id="wc"></ce-with-children>
    </div>
  }
}

export class ComponentWithChildrenRerender extends Component<EmptyAttrs> {
    count: number = 1
    override mount() {
        Promise.resolve().then(_ => {
            this.count += 1
            this.refresh()
        })
    }
    render () {
        return <div>
            <ce-with-children id="wc">{this.count}</ce-with-children>
        </div>
    }
}

export class ComponentWithDifferentViews extends Component<EmptyAttrs> {
    showWC: boolean = true
    toggle = () => {
        this.showWC = !this.showWC
        this.refresh()
    }
    render () {
        return <div onClick={this.toggle}>
            {this.showWC ? (
                <ce-with-children id="wc"></ce-with-children>
            ) : (
                <div id="dummy">Dummy view</div>
            )}
        </div>
    }
}

export class ComponentWithProperties extends Component<EmptyAttrs> {
    render () {
        const data = {
            bool: true,
            num: 42,
            str: 'Velotype',
            arr: ['V', 'e', 'l', 'o', 't', 'y', 'p', 'e'],
            obj: { org: 'velotype', repo: 'velotype' },
            camelCaseObj: { label: "passed" }
        }
        return <div>
            <ce-with-properties
                id="wc"
                bool={data.bool}
                num={data.num}
                str={data.str}
                arr={data.arr}
                obj={data.obj}
                camelCaseObj={data.camelCaseObj}
            ></ce-with-properties>
        </div>
    }
}

export class ComponentWithUnregistered extends Component<EmptyAttrs> {
    render () {
        const data = {
            bool: true,
            num: 42,
            str: 'Velotype',
            arr: ['V', 'e', 'l', 'o', 't', 'y', 'p', 'e'],
            obj: { org: 'velotype', repo: 'velotype' }
        }
        // The ce-unregistered element doesn't actually exist. It's used to test unupgraded behavior.
        return <div>
            <ce-unregistered id="wc"
                bool={data.bool}
                num={data.num}
                str={data.str}
                arr={data.arr}
                obj={data.obj}
            ></ce-unregistered>
        </div>
    }
}

export class ComponentWithImperativeEvent extends Component<EmptyAttrs> {
    eventHandled = new RenderBasic<boolean>(false)
    handleTestEvent = () => {
        this.eventHandled.value = true
    }
    render() {
        const ceWithEvent = <ce-with-event id="wc">ce-with-event</ce-with-event> 
        ceWithEvent.addEventListener('camelEvent', this.handleTestEvent)
        return <div>
            <div id="handled">{this.eventHandled}</div>
            {ceWithEvent}
        </div>
    }
}

export class ComponentWithDeclarativeEvent extends Component<EmptyAttrs> {
    lowercaseHandled = new RenderBasic<boolean>(false)
    kebabHandled = new RenderBasic<boolean>(false)
    camelHandled = new RenderBasic<boolean>(false)
    capsHandled = new RenderBasic<boolean>(false)
    pascalHandled = new RenderBasic<boolean>(false)
    handleLowercaseEvent = () => {
        this.lowercaseHandled.value = true
    }
    handleKebabEvent = () => {
        this.kebabHandled.value = true
    }
    handleCamelEvent = () => {
        this.camelHandled.value = true
    }
    handleCapsEvent = () => {
        this.capsHandled.value = true
    }
    handlePascalEvent = () => {
        this.pascalHandled.value = true
    }
    render() {
        return <div>
            <div id="lowercase">{this.lowercaseHandled}</div>
            <div id="kebab">{this.kebabHandled}</div>
            <div id="camel">{this.camelHandled}</div>
            <div id="caps">{this.capsHandled}</div>
            <div id="pascal">{this.pascalHandled}</div>
            <ce-with-event id="wc"
                onlowercaseevent={this.handleLowercaseEvent}
                on-kebab-event={this.handleKebabEvent}
                on-camelEvent={this.handleCamelEvent}
                on-CAPSevent={this.handleCapsEvent}
                on-PascalEvent={this.handlePascalEvent}
                >ce-with-event</ce-with-event>
        </div>
    }
}
