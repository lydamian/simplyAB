const Dropdown = function Dropdown({ children}) {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef();
  // Change my dropdown state to close when clicked outside
  useOutsideClick(dropdownRef, () => setIsActive(false));

  return (
    <div
      className={`dropdown ${isActive ? 'is-active' : ''}`}
      role="menu"
      onClick={(event) => {
        setIsActive(!isActive);
      }}
      tabIndex={0}
      onKeyDown={(event) => {
        setIsActive(!isActive);
      }}
      ref={dropdownRef}
    >
    </div>
  );
};

export default Dropdown;
