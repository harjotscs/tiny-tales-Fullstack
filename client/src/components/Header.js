import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Link to="/">
        <span className="link">Get Results</span>
      </Link>
    </header>
  );
};
export default Header;
