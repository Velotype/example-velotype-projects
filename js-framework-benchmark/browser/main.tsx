// deno-lint-ignore-file no-explicit-any
/// <reference lib="dom" />

import {getComponent, RenderObject, UpdateHandlerLink, RenderObjectArray, EmptyAttrs, Component, replaceElementWithRoot} from "jsr:@velotype/velotype"

let benchmarkPage: any = null

function getRandomNum(max: number) {
    return Math.round(Math.random() * 1000) % max
}

type rowdata = {
    id: number
    label: string
    selected: boolean
}

let selectedRow: RenderObject<rowdata> | undefined = undefined
const renderRow = function(data: rowdata, obj: RenderObject<rowdata>): UpdateHandlerLink {
    const dataElm = <td class="col-md-1">{data.id}</td>
    const labelElm = <a onClick={()=>{
        if (selectedRow) {
            selectedRow.value = {id: selectedRow.value.id, label: selectedRow.value.label, selected: false}
        }
        selectedRow = obj
        obj.value = {id: obj.value.id, label: obj.value.label, selected: true}
    }}>{data.label}</a>
    const row = <tr>
        {dataElm}
        <td class="col-md-4">{labelElm}</td>
        <td class="col-md-1"><a onClick={()=>{
            benchmarkPage.delete(obj)
        }}><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
        <td class="col-md-6"></td>
    </tr>
    if (data.selected) {
        row.className = "danger"
    }
    return new UpdateHandlerLink(row, {
        dataElm: dataElm,
        labelElm: labelElm
    })
}
const handleRowUpdate = function(element: HTMLElement, updateRefs: any, oldData: rowdata, newData: rowdata) {
    if (oldData.selected != newData.selected) {
        element.className = newData.selected ? "danger" : ""
    }
    if (oldData.id != newData.id) {
        const dataElm = updateRefs.dataElm as HTMLElement
        dataElm.textContent = String(newData.id)
    }
    if (oldData.label != newData.label) {
        const labelElm = updateRefs.labelElm as HTMLElement
        labelElm.textContent = newData.label
    }
}

const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"]
const colors = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"]
const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"]

const adjLength = adjectives.length
const colLength = colors.length
const nounLength = nouns.length

export class BenchmarkPage extends Component<EmptyAttrs> {
    data: RenderObjectArray<rowdata> = new RenderObjectArray<rowdata>({
        wrapperElementTag: "tbody",
        renderFunction: renderRow,
        handleUpdate: handleRowUpdate
    })
    id = 1
    buildData(count = 1000) {
        const newData: rowdata[] = []
        for (let i = 0; i < count; i++) {
            newData.push({
                id: this.id++,
                label: adjectives[getRandomNum(adjLength)] + " " + colors[getRandomNum(colLength)] + " " + nouns[getRandomNum(nounLength)],
                selected: false
            })
        }
        return newData
    }

    run = () => {
        this.data.clear()
        this.data.pushAll(this.buildData())
    }
    add = () => {
        this.data.pushAll(this.buildData(1000))
    }
    update = () => {
        for (let i=0;i<this.data.length;i+=10) {
            const objComp = this.data.value[i].value
            this.data.value[i].value = {id: objComp.id, label: objComp.label + ' !!!', selected: objComp.selected}
        }
    }
    delete = (row: RenderObject<rowdata>) => {
        const index = this.data.value.findIndex((r)=>r==row)
        if (index>=0) {
            this.data.deleteAt(index,1)
        }
    }
    runLots = () => {
        this.data.clear()
        this.data.pushAll(this.buildData(10000))
    }
    clear = () => {
        this.data.clear()
    }
    swapRows = () => {
        if(this.data.length > 998) {
            const a = this.data.getAt(1)
            this.data.setAt(1, this.data.getAt(998))
            this.data.setAt(998, a)
        }
    }
    override render() {
        return <div class="container">
            <div class="jumbotron">
                <div class="row">
                    <div class="col-md-6">
                        <h1>Velotype</h1>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary btn-block" id="run" onClick={this.run}>Create 1,000 rows</button>
                            </div>
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary btn-block" id="runlots" onClick={this.runLots}>Create 10,000 rows</button>
                            </div>
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary btn-block" id="add" onClick={this.add}>Append 1,000 rows</button>
                            </div>
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary btn-block" id="update" onClick={this.update}>Update every 10th row</button>
                            </div>
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary btn-block" id="clear" onClick={this.clear}>Clear</button>
                            </div>
                            <div class="col-sm-6 smallpad">
                                <button type="button" class="btn btn-primary btn-block" id="swaprows" onClick={this.swapRows}>Swap Rows</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
            <table class="table table-hover table-striped test-data">
                {this.data}
            </table>
            <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
        </div>
    }
}

benchmarkPage = getComponent(replaceElementWithRoot(<BenchmarkPage/>, document.getElementById("main")))
