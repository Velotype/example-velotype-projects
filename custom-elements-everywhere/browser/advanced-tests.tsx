/// <reference lib="dom" />

import {replaceElementWithRoot, Component, EmptyAttrs} from "jsr:@velotype/velotype"
import { ComponentWithProperties, ComponentWithDeclarativeEvent } from "./components.tsx"

export class AdvancedTests extends Component<EmptyAttrs> {
    override render() {
        return <div>
            <h1>ComponentWithProperties</h1>
            <ComponentWithProperties />
            <h1>ComponentWithDeclarativeEvent</h1>
            <ComponentWithDeclarativeEvent />
        </div>
    }
}

// Place on the page
replaceElementWithRoot(<AdvancedTests/>, document.getElementById("main-page"))
