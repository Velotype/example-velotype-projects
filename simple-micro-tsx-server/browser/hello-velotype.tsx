/// <reference lib="dom" />

import {h, FunctionComponent, EmptyAttrs} from "jsr:@velotype/velotype/tsx-micro"

type CounterAttrsType = {startingValue?: number}
const Counter: FunctionComponent<CounterAttrsType> = function(attrs: CounterAttrsType): HTMLDivElement {
    let count = (attrs.startingValue && attrs.startingValue > 0) ? attrs.startingValue : 0
    const counterLabel = <span>{count}</span>
    return <div>
        <div>Counter value: {counterLabel}</div>
        <button type="button" onClick={() => {
            count+=1
            counterLabel.innerText = count
        }}>Increment</button>
        <button type="button" onClick={() => {
            count-=1
            counterLabel.innerText = count
        }}>Decrement</button>
    </div>
}

const HelloVelotype: FunctionComponent<EmptyAttrs> = function(): HTMLDivElement {
    return <div>
        <div id="hello-tsx" disabled="">
            <div title="hello message">Hello Velotype</div>
            <span style="font-weight:bold;">TSX-Micro!</span>
            <Counter startingValue={4}/>
        </div>
    </div>
}

// Append to the page
const element = document.getElementById("main-page")
element?.appendChild(<HelloVelotype/>)
