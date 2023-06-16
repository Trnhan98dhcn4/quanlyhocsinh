import { PathRouter } from "../../../constant";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <div className="col-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to={PathRouter.home}
            className="nav-link active text-dark"
            aria-current="page"
          >
            <button className="btn btn-secondary w-100">Home</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={PathRouter.student.list} className="nav-link text-dark">
            <button className="btn btn-secondary w-100"> Student</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
