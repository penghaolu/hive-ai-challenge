import "./dropdown.css";
import React, { useState } from "react";

const UpTriangle = () => (
  <svg
    width="12"
    viewBox="0 0 88 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M44 0L87.3013 45H0.69873L44 0Z" fill="#747474" />
  </svg>
);

const DownTriangle = () => (
  <svg
    width="12"
    viewBox="0 0 87 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M43.3013 45L0 0L86.6025 7.57103e-06L43.3013 45Z" fill="#747474" />
  </svg>
);

const Checkmark = () => (
  <svg
    clip-rule="evenodd"
    fill-rule="evenodd"
    stroke-linejoin="round"
    stroke-miterlimit="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke="white"
      d="m2.25 12.321 7.27 6.491c.143.127.321.19.499.19.206 0 .41-.084.559-.249l11.23-12.501c.129-.143.192-.321.192-.5 0-.419-.338-.75-.749-.75-.206 0-.411.084-.559.249l-10.731 11.945-6.711-5.994c-.144-.127-.322-.19-.5-.19-.417 0-.75.336-.75.749 0 .206.084.412.25.56"
      fill="white"
    />
  </svg>
);

export default function Dropdown(props) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(props.multiselect ? new Set() : -1);

  /**
   * Toggles the expansion of the dropdown list
   */
  function toggleDropdown() {
    setExpanded(!expanded);
  }

  /**
   * Checks if an item is selected
   * @param {int} i index of the item in the list
   */
  function checkSelected(i) {
    if (props.multiselect) {
      return selected.has(i);
    } else {
      return selected === i;
    }
  }

  /**
   * Toggles the selection of an item in the dropdown list
   * @param {int} i index of the item in the list
   */
  function toggleCheck(e, i) {
    // <label> triggers onClick so we need to prevent default
    // to stop it from being called twice
    e.preventDefault();
    if (props.multiselect) {
      // multiselect
      const checked = selected.has(i) ? true : false;
      let newSelected = new Set(selected);
      if (checked) {
        newSelected.delete(i);
        setSelected(newSelected);
      } else {
        newSelected.add(i);
        setSelected(newSelected);
      }
    } else {
      // single select
      if (selected === i) {
        setSelected(-1);
      } else {
        setSelected(i);
      }
    }
  }

  /**
   * Clears list of selected items
   */
  function clear() {
    if (props.multiselect) {
      setSelected(new Set());
    } else {
      setSelected(-1);
    }
  }

  /**
   * Adds all items in data to list of selected items
   */
  function selectAll() {
    let tempA = [];
    for (let i = 0; i < props.data.length; i++) {
      tempA.push(i);
    }
    setSelected(new Set(tempA));
  }

  /**
   * Generates a string of selected items in the dropdown list
   * separated by commas
   */
  function genSelectedString() {
    if (props.multiselect) {
      let out = [];
      const selectedA = Array.from(selected);
      for (let i = 0; i < selectedA.length; i++) {
        out.push(props.data[selectedA[i]]);
      }
      return out.join(", ");
    } else {
      if (selected === -1) {
        return "";
      } else {
        return props.data[selected];
      }
    }
  }

  return (
    <div className="wrapper">
      <div
        className="inputWrapper"
        style={{ width: `${props.width}px` }}
        onClick={toggleDropdown}
      >
        <span className="title">{props.title}</span>
        <div className="input">
          <span className="inputText">{genSelectedString()}</span>
          <div className="triangle">
            {expanded ? <UpTriangle /> : <DownTriangle />}
          </div>
        </div>
      </div>
      {expanded && (
        <DropDownList
          multiselect={props.multiselect}
          data={props.data}
          checkSelected={checkSelected}
          onClear={clear}
          onSelectAll={selectAll}
          toggleCheck={toggleCheck}
        />
      )}
    </div>
  );
}

function DropDownList(props) {
  return (
    <div className="listWrapper">
      <DropDownListItem type="clear" key={-2} onClick={props.onClear} />
      {props.multiselect && (
        <DropDownListItem
          type="selectAll"
          key={-1}
          onClick={props.onSelectAll}
        />
      )}
      {props.data.map((datum, i) => (
        <DropDownListItem
          multiselect={props.multiselect}
          datum={datum}
          key={i}
          checkSelected={props.checkSelected(i)}
          onClick={(e) => props.toggleCheck(e, i)}
        />
      ))}
    </div>
  );
}

function DropDownListItem(props) {
  return (
    <label
      className="itemWrapper"
      style={{
        backgroundColor: props.checkSelected && "#edf3f9"
      }}
      onClick={props.onClick}
    >
      {props.multiselect && !props.type && (
        // <input className="itemCheckbox" type="checkbox" />
        <DropDownListItemCheckbox checkSelected={props.checkSelected} />
      )}
      {props.type === "clear" && <i className="itemText">Clear Selection</i>}
      {props.type === "selectAll" && <b className="itemText">Select All</b>}
      <span className="itemText">{props.datum}</span>
    </label>
  );
}

function DropDownListItemCheckbox(props) {
  return (
    <div
      className="itemCheckbox"
      style={{
        backgroundColor: props.checkSelected && "#336dbf",
        borderColor: props.checkSelected && "#336dbf"
      }}
    >
      {props.checkSelected && <Checkmark />}
    </div>
  );
}
