import "./styles.css";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import sampleNames from "./SampleData/sampleNames";
import sampleAges from "./SampleData/sampleAges";

export default function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  function nameSubmit(e) {
    e.preventDefault();
    sampleNames.push(name);
    setName("");
  }

  function ageSubmit(e) {
    e.preventDefault();
    sampleAges.push(age);
    setAge("");
  }

  return (
    <div className="App">
      <h1>Hive Frontend Engineer Challenge</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ margin: 15 }}>
          <h4>Multiselect Dropdown</h4>
          <Dropdown
            width={225}
            multiselect={true}
            title={"Tag"}
            data={sampleNames}
          />
        </div>
        <div style={{ margin: 15 }}>
          <h4>Single Select Dropdown</h4>
          <Dropdown multiselect={false} title={"Age"} data={sampleAges} />
        </div>
      </div>

      <span>
        Here is some sample text to demonstrate the dropdown's modality.
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </span>

      <h2>Want to add some data?</h2>
      <div>
        <form style={{ paddingBottom: 10 }} onSubmit={(e) => nameSubmit(e)}>
          <label style={{ margin: 15 }}>
            Add name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginLeft: 5 }}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={(e) => ageSubmit(e)}>
          <label style={{ margin: 15 }}>
            Add age:
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ marginLeft: 5 }}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
