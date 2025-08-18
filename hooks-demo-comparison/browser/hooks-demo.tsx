// deno-lint-ignore-file no-explicit-any
/// <reference lib="dom" />

import {replaceElementWithRoot, Component, EmptyAttrs, RenderBasic, TargetedInputEvent} from "jsr:@velotype/velotype"

type DemoInputAttrsType = {
    field: RenderBasic<any>
}
class DemoInput extends Component<DemoInputAttrsType> {
    override render(attrs: DemoInputAttrsType) {
        return <input
            value={attrs.field.getString()}
            onInput={(event: TargetedInputEvent<HTMLInputElement>) => {
                attrs.field.setString(event.currentTarget.value)
            }}
        />
    }
}

export class HooksDemoComparison extends Component<EmptyAttrs> {
    setDocTitle = () => {
        document.title = `${this.name.value} ${this.surname.value}`
    }
    name = (new RenderBasic<string>("Mary")).registerOnChangeListener(this,this.setDocTitle)
    surname = (new RenderBasic<string>("Poppins")).registerOnChangeListener(this,this.setDocTitle, true)

    windowResize = () => {this.width.value = globalThis.innerWidth}
    width = (new RenderBasic<number>(globalThis.innerWidth)).registerOnMount(()=>{
        globalThis.addEventListener("resize", this.windowResize)
    },()=>{
        globalThis.removeEventListener("resize", this.windowResize)
    })

    override render() {
        return <div>
            <div>Name: <DemoInput field={this.name} /></div>
            <div>Surname: <DemoInput field={this.surname} /></div>
            <div>{this.name}</div>
            <div>{this.surname}</div>
            <div>{this.width}</div>
        </div>
    }
}

// Place on the page
replaceElementWithRoot(<HooksDemoComparison/>, document.getElementById("main-page"))

/*

// Code from the React hooks talk for comparison:

export default function Greeting(props) {
    const name = useFormInput('Mary');
    const surname = useFormInput('Poppins');
    const theme = useContext(ThemeContext);
    const locale = useContext(LocaleContext);
    const width = useWindowWidth();
    useDocumentTitle(name.value + ' ' + surname.value);

    return (
        <section className={theme}>
            <Row label="Name">
                <input {...name} />
            </Row>
            <Row label="Surname">
                <input {...surname} />
            </Row>
            <Row label="Language">
                {locale}
            </Row>
            <Row label="Width">
                <input {...width} />
            </Row>
        </section>
    );
}

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value)
    }
    return {
        value,
        onChange: handleChange
    };
}

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title;
    });
}

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerwidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    return width;
}

*/
