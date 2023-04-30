import React, { useState } from "react";
import { Check, Search } from "react-feather";
import Icon from "react-crypto-icons";

import Modal from "Components/Modal/Modal";

import styles from "./SelectSymbolModal.module.scss";

function SelectSymbolModal({
  onClose,
  allSymbols = [],
  selected = "",
  onSelect,
}) {
  const [symbols, setSymbols] = useState([...allSymbols]);

  const handleSearch = (event) => {
    const val = event.target.value.trim();

    const filter = allSymbols.filter((item) =>
      item.name.toLowerCase().includes(val.toLowerCase())
    );
    filter.sort((a, b) =>
      a.name.toLowerCase().indexOf(val.toLowerCase()) >
      b.name.toLowerCase().indexOf(val.toLowerCase())
        ? 1
        : -1
    );

    setSymbols(filter);
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.search}>
          <div className={styles.icon}>
            <Search />
          </div>
          <input
            className="basic-input"
            onChange={handleSearch}
            placeholder="Type here..."
          />
        </div>

        <div className={styles.items}>
          {symbols.length ? (
            symbols.map((item) => (
              <div
                className={styles.item}
                key={item.symbol}
                onClick={() => (onSelect ? onSelect(item) : "")}
              >
                <div className={styles.left}>
                  <Icon size={25} name={item.baseAsset.toLowerCase()} />
                  <p className={styles.name}>{item.name}</p>
                </div>

                {selected == item.symbol ? (
                  <div className={styles.check}>
                    <Check />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          ) : (
            <p>No Found!</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default SelectSymbolModal;
