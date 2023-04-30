import React, { useEffect, useState } from "react";
import Icon from "react-crypto-icons";
import { cryptoSymbol } from "crypto-symbol";

import InputControl from "Components/InputControl/InputControl";
import SelectSymbolModal from "./SelectSymbolModal/SelectSymbolModal";

import cutout from "assets/cutout.svg";
import { downIcon } from "utils/svgs";

import styles from "./Auth.module.scss";
import { getFormattedPrice } from "utils/util";

const { nameLookup } = cryptoSymbol({});
let socket;
function Auth() {
  const [allSymbols, setAllSymbols] = useState([]);
  const [prices, setPrices] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [investedAmount, setInvestedAmount] = useState("");

  const fetchAllSymbols = async () => {
    const res = await fetch(`https://api.binance.com/api/v3/exchangeInfo`);
    if (!res) return;
    const data = await res.json();

    const symbols = data.symbols
      .filter((item) => item.status == "TRADING")
      .slice(0, 250)
      .map((item) => ({ ...item, name: nameLookup(item.baseAsset) }))
      .filter((item) => item.name && item.baseAsset)
      .filter(
        (item, index, self) =>
          index == self.findIndex((e) => e.name == item.name)
      )
      .slice(0, 50);

    setAllSymbols(symbols);
    setSelectedSymbol(symbols[0]);
  };

  const makeSocketConnection = () => {
    const symbols = [...allSymbols.map((item) => item.symbol)];
    socket = new WebSocket("wss://stream.binance.com:443/ws");
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`),
          id: 1,
        })
      );
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      const symbol = data.s;
      const price = (parseFloat(data.c) * 80).toFixed(4);
      setPrices((prevPrices) => ({ ...prevPrices, [symbol]: price }));
    };
  };

  useEffect(() => {
    fetchAllSymbols();
  }, []);

  useEffect(() => {
    if (!allSymbols.length) return;

    makeSocketConnection();

    return () => {
      if (socket?.close) socket.close();
    };
  }, [allSymbols]);

  return (
    <div className={styles.container}>
      {showModal && (
        <SelectSymbolModal
          onClose={() => setShowModal(false)}
          allSymbols={allSymbols}
          selected={selectedSymbol.symbol}
          onSelect={(obj) => {
            setSelectedSymbol(obj);
            setShowModal(false);
          }}
        />
      )}

      <div className={styles.authOuter}>
        <div className={styles.symbolImg}>
          <Icon
            name={
              selectedSymbol.baseAsset
                ? selectedSymbol.baseAsset.toLowerCase()
                : ""
            }
            size={24}
          />
        </div>
        <div className={styles.cutout}>
          <img src={cutout} alt="_" />
        </div>
        <div className={styles.auth}>
          <div className={styles.top}>
            <p className={styles.label}>Current value</p>
            <p className={styles.value}>
              {prices[selectedSymbol.symbol]
                ? `${getFormattedPrice(prices[selectedSymbol.symbol], 3)}`
                : ""}
            </p>
          </div>

          <div className={styles.select} onClick={() => setShowModal(true)}>
            <div className={styles.left}>
              <Icon
                name={
                  selectedSymbol.baseAsset
                    ? selectedSymbol.baseAsset.toLowerCase()
                    : ""
                }
                size={24}
              />
              <p className={styles.name}>{selectedSymbol.name}</p>
            </div>

            <div className={styles.icon}>{downIcon}</div>
          </div>

          <InputControl
            label="Amount you want to invest"
            numericInput
            placeholder="0.00"
            className={styles.input}
            value={investedAmount}
            maxLength={11}
            onChange={(event) =>
              setInvestedAmount(parseInt(event.target.value) || "")
            }
            icon={<p className={styles.inr}>INR</p>}
          />
          <InputControl
            label={`Estimate Number of ${selectedSymbol.name} You will Get`}
            numericInput
            placeholder="0.00"
            disabled
            value={
              prices[selectedSymbol.symbol] > 0
                ? (
                    (investedAmount || 0) / prices[selectedSymbol.symbol]
                  ).toFixed(2)
                : ""
            }
          />

          <button className="button">Buy</button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
