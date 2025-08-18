/// <reference lib="dom" />

import {replaceElementWithRoot, Component, EmptyAttrs, RenderObject} from "jsr:@velotype/velotype"

class RenderMedia extends RenderObject<boolean> {
    constructor(query: string) {
        super(false)
        const media = globalThis.matchMedia(query)
        this.value = media.matches
        const mediaListener = (mediaEvent: MediaQueryListEvent) => {
            this.value = mediaEvent.matches
        }
        this.registerOnMount(() => {
            media.addEventListener("change", mediaListener)
        }, () => {
            media.removeEventListener("change", mediaListener)
        })
    }
}

export class MediaDemoComparison extends Component<EmptyAttrs> {
    small = new RenderMedia("(max-width: 600px)")
    large = new RenderMedia("(min-width: 800px)")
    override render() {
        return <div class="media">
            <h1>Media</h1>
            <p>Small? {this.small.render((sm)=>(sm ? "Yep" : "Nope"))}.</p>
            <p>Large? {this.large.render((sm)=>(sm ? "Yep" : "Nope"))}.</p>
        </div>
    }
}

// Place on the page
replaceElementWithRoot(<MediaDemoComparison/>, document.getElementById("main-page"))

/*

// Code from the React hooks talk for comparison:

import React, { useState, useEffect } from "react";

function useMedia(query) {
    let [matches, setMatches] = useState(
        window.matchMedia(query).matches
    );

    useEffect(
        () => {
            let media = window.matchMedia(query);
            if (media.matches !== matches) {
                setMatches(media.matches);
            }
            let listener = () => setMatches(media.matches);
            media.addEventListener("change",listener)
            return () => media.removeEventListener(listener);
        },
        [query]
    );

    return matches;
}

function App() {
    let small = useMedia("(max-width: 600px)");
    let large = useMedia("(max-width: 800px)");
    return (
        <div className="media">
            <h1>Media</h1>
            <p>Small? {small ? "Yep" : "Nope"}.</p>
            <p>Large? {large ? "Yep" : "Nope"}.</p>
        </div>
    );
}

*/
