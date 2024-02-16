function App() {
    return (
        <div>
            <CardWrapper component={<TextComponent />} />
            <CardWrapper2 Component={TextComponent} />
            <Wrapper>
                <TextComponent />
            </Wrapper>
        </div>
    );
}

export default App;

const css = {
    border: "2px dashed black",
    padding: "5px",
    display: "inline-block",
    margin: "2px",
};

function TextComponent() {
    return <div>Hello World</div>;
}

function CardWrapper({ component }) {
    return <div style={css}>{component}</div>;
}
function CardWrapper2({ Component }) {
    return (
        <div style={css}>
            <Component />
        </div>
    );
}

function Wrapper({ children }) {
    return <div style={css}>{children}</div>;
}
