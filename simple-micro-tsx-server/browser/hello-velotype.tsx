import {h, FunctionComponent, EmptyAttrs} from "jsr:@velotype/velomicro/tsx-micro"

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

const HelloVelomicro: FunctionComponent<EmptyAttrs> = function(): HTMLDivElement {
    return <div>
        <div id="hello-tsx" disabled="">
            <div title="hello message">Hello</div>
            <span style="font-weight:bold;">Velomicro!</span>
            <Counter startingValue={4}/>
        </div>
    </div>
}

// Place on the page
const element = document.getElementById("main-page")
element?.replaceWith(<HelloVelomicro/>)
