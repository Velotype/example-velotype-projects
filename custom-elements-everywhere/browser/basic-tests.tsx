/// <reference lib="dom" />

import {replaceElementWithRoot, Component, EmptyAttrs} from "jsr:@velotype/velotype"
import { ComponentWithChildren, ComponentWithChildrenRerender, ComponentWithDifferentViews, ComponentWithImperativeEvent, ComponentWithoutChildren, ComponentWithUnregistered } from "./components.tsx"

export class BasicTests extends Component<EmptyAttrs> {
    override render() {
        return <div>
            <h1>ComponentWithoutChildren</h1>
            <ComponentWithoutChildren />
            <h1>ComponentWithChildren</h1>
            <ComponentWithChildren />
            <h1>ComponentWithChildrenRerender</h1>
            <ComponentWithChildrenRerender />
            <h1>ComponentWithDifferentViews</h1>
            <ComponentWithDifferentViews />
            <h1>ComponentWithUnregistered</h1>
            <ComponentWithUnregistered />
            <h1>ComponentWithImperativeEvent</h1>
            <ComponentWithImperativeEvent />
        </div>
    }
}

// Place on the page
replaceElementWithRoot(<BasicTests/>, document.getElementById("main-page"))
