import { ChangeEvent, useState, VFC } from "react";
import "./App.sass";

const Header: VFC = () => {
  return (
    <header>
      <div id="title">🔑 NFTkey</div>
      <div id="right-menu">
        <div>Icon</div>
        <div>Address</div>
      </div>
    </header>
  );
};

const KeySelector: VFC<{
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="keyid___" key="key1">
        自宅 (0x NFT address...)
      </option>
      <option value="keyid2___" key="key2">
        倉庫 (0x NFT address2...)
      </option>
    </select>
  );
};

const KeyStatus: VFC<{
  onChange: () => void;
  isOpen: boolean;
  address: string;
}> = ({ onChange, isOpen, address }) => {
  const styleOpen = {
    border: "4px solid rgb(155, 245, 224)",
    backgroundColor: "rgba(155, 245, 224, 0.15)",
  };
  const styleLocked = {
    border: "4px solid rgb(245, 155, 155)",
    backgroundColor: "rgba(245, 155, 155, 0.15)",
  };
  return (
    <div className="key-status">
      <div
        className="key-circle"
        onClick={onChange}
        style={isOpen ? styleOpen : styleLocked}
      >
        <div>{address} is now</div>
        <div className="status">{isOpen ? "Open" : "Locked"}</div>
        <div>click to {isOpen ? "lock" : "open"}</div>
      </div>
    </div>
  );
};

const KeyController: VFC = () => {
  const [key, setKey] = useState({ address: "0x NFT address", isOpen: false });
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setKey((prev) => ({ ...prev, address: e.target.value }));
  };
  const handleToggle = () => {
    setKey((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };
  return (
    <>
      <KeySelector onChange={handleSelectChange} />
      <KeyStatus
        // Components化してsuspense対応させる
        isOpen={key.isOpen}
        onChange={handleToggle}
        address={key.address}
      />
    </>
  );
};

const App: VFC = () => {
  return (
    <>
      <Header />
      <main>
        <KeyController />
      </main>
    </>
  );
};

export default App;
