import React, { useState } from 'react';
import './DropDown.css'; // Import your CSS file

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleItemClick = (option) =>
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(option.value)
        ? prevSelectedItems.filter((item) => item !== option.value)
        : [...prevSelectedItems, option.value]
    );
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const sortedOptions = [...options].sort((a, b) =>
    sortAscending ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)
  );

  const groupedOptions = groupOptions(sortedOptions);
  const filteredOptions = flattenGroupedOptions(groupedOptions)
    .filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        Select an option {isOpen ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" />}
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-controls">
            <label>
              Search:
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>
            <label>
              Sort:
              <input
                type="checkbox"
                checked={sortAscending}
                onChange={() => setSortAscending(!sortAscending)}
              />
            </label>
          </div>
          <div className="options-container">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`dropdown-option ${selectedItems.includes(option.value) ? 'selected' : ''} ${
                  option.isGroup ? 'is-group' : ''
                } ${option.isSubOption ? 'sub-option' : ''}`}
                onClick={() => handleItemClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const groupOptions = (options) =>
  options.reduce((grouped, option) => {
    const [group, subGroup] = option.label.split(' - ');
    grouped[group] = [...(grouped[group] || []), { value: option.value, label: subGroup || group }];
    return grouped;
  }, {});

const flattenGroupedOptions = (groupedOptions) =>
  Object.entries(groupedOptions).flatMap(([group, subOptions]) => [
    { value: group, label: group, isGroup: true },
    ...subOptions.map((subOption) => ({ ...subOption, isSubOption: true })),
  ]);

export default Dropdown;
