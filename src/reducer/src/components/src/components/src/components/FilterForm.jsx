const FilterForm = ({ filterText, onFilterChange }) => {
  return (
    <div className="filter-form">
      <label htmlFor="search">Filter by Title: </label>
      <input
        id="search"
        type="text"
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Type to filter..."
      />
    </div>
  );
};

export default FilterForm;