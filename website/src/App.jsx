import './App.css';
import Grid from "./components/Grid";
import Nav from "./components/Nav";


export default function App() {

    return (
        <div className={"relative h-screen w-screen bg-[#d7e4c2] overflow-hidden"}>
            <Nav/>
            <Grid/>
        </div>
    );
}