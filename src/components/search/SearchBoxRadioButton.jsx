import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { BsBookmark, BsList } from "react-icons/all";

function SearchBoxRadioButton({ onClickRadioButton, type }) {
  const [checked, setChecked] = useState(false);
  const [typeValue, setTypeValue] = useState("");

  useEffect(() => {
    setChecked(type === "result");
    setTypeValue(type);
  }, [type]);

  return (
    <Radio.Group
      size="large"
      value={typeValue}
      onChange={onClickRadioButton}
      style={{ display: "flex" }}
      id="radioGroup"
    >
      <Radio.Button
        value="result"
        style={{
          width: "100%",
          textAlign: "center",
          borderRadius: "0 0 0 5px",
        }}
        id="radioButtonResult"
        checked={checked}
      >
        <BsList
          style={{
            width: "1.2rem",
            height: "1.2rem",
            verticalAlign: "middle",
          }}
        />{" "}
        검색결과
      </Radio.Button>
      <Radio.Button
        value="bookmark"
        style={{
          width: "100%",
          textAlign: "center",
          borderRadius: "0 0 5px 0",
        }}
        id="radioButtonBookmark"
        checked={!checked}
      >
        <BsBookmark
          style={{
            width: "1.2rem",
            height: "1.2rem",
            verticalAlign: "middle",
          }}
        />{" "}
        북마크
      </Radio.Button>
    </Radio.Group>
  );
}

export default SearchBoxRadioButton;
