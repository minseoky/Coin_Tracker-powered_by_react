import {useState, useEffect} from "react";
import "./style.css";
function Coin() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [dollars, setDollars] = useState(0);
    const [choosenCoin, setChoosenCoin] = useState("");
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {setCoins(json); setLoading(false); });
    }, []);
    const selectChange = (event) => {
        setChoosenCoin(event.target.value);
    }
    const onChange = (e) => {
        setDollars(() => e.target.value);
    }
    return (
        <div>
            <div className="set">
                <div className="title-container">
                    <h1>The Coins! {loading ? null : '(' + coins.length + ')'}</h1>
                    {loading ? <strong>Loading</strong> : null}
                </div>
                <div className="main-container">
                    <div>
                        <label className="label1">Dollars you have : </label>
                        <input onChange={onChange} value = {dollars} type="number" placeholder={"$"} style={{textAlign:"right"}}></input>
                        <span style={{margin:"20px"}}>dollars</span>
                    </div>
                    <br/>
                    <div>
                        <label className="label1">Choose coin : </label>
                        <select onChange={selectChange}>
                            <option>choose options</option>
                            {coins.map((coin) => <option key={coin.id} value={[coin.name, coin.quotes.USD.price]}>
                                {coin.name}({coin.symbol}) : ${coin.quotes.USD.price}USD
                            </option>)}
                        </select>
                    </div>
                    <div className="result">
                        {choosenCoin != "" ? <strong>You can get {Math.floor(dollars / choosenCoin.split(',')[1])} {choosenCoin.split(',')[0]}(s).</strong> : <strong>Choose coin</strong>}
                    </div>
                </div>

            </div>
            <div className="by">
                by <a href={"https://github.com/minseoky"} target="_blank">minseoky<img className="github" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img></a>
            </div>
        </div>

    );
}

export default Coin;