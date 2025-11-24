import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { megaMenuData } from "../data/megaMenuData";
import "primereact/resources/themes/lara-light-cyan/theme.css"; // global theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Regex: Only letters/numbers/spaces allowed (prevents all special characters)
const ALPHANUMERIC_ONLY_REGEX = /^[A-Za-z0-9 ]*$/;

const flattenMenuValues = () => {
  const values = [];
  for (const category in megaMenuData) {
    megaMenuData[category].forEach((section) => {
      values.push(...section.items);
    });
  }
  return values;
};

const suggestionsList = flattenMenuValues();

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Filter suggestions live as you type (with regex validation)
  const search = (event) => {
    const val = event.query;
    if (val && ALPHANUMERIC_ONLY_REGEX.test(val)) {
      setFiltered(
        suggestionsList.filter((item) =>
          item.toLowerCase().startsWith(val.toLowerCase())
        )
      );
    } else {
      setFiltered([]);
    }
  };

  // No special chars allowed at all (extra guard)
  const handleKeyPress = (e) => {
    if (!ALPHANUMERIC_ONLY_REGEX.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <form
      className="search-bar"
      onSubmit={(e) => e.preventDefault()}
      style={{
        displau: "flex",
        gap: "0.5rem",
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <span>
        <AutoComplete
          value={query}
          suggestions={filtered}
          completeMethod={search}
          onChange={(e) => setQuery(e.value)}
          placeholder="Search"
          inputClassName="w-100 px-2 rounded"
          style={{ flexGrow: 1 }}
          itemTemplate={(item) => <span>{item}</span>}
          onKeyPress={handleKeyPress}
        />
        <Button
          type="submit"
          icon="pi pi-search"
          className="search-btn"
          severity="primary"
          style={{ marginLeft: 8 }}
        />
      </span>
    </form>
  );
}
