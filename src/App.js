import './styles/reset.css';
import './App.scss';

import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";


function App() {

    return (
        <div className="layout">
           <Header></Header>
            <main>
                <Banner></Banner>
                <div className="wrapper">
                    <Categories></Categories>
                    <Brands></Brands>
                </div>
            </main>
        </div>
    );
}

export default App;
