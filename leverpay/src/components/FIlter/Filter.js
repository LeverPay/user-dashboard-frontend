import React, { useState } from "react";
const filterOptions = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "incomplete", label: "Incomplete" },
];
function Filter() {
  const [selectedFilter, setSelectedFilter] = useState("");

  return <div>Filter</div>;
}

export default Filter;
