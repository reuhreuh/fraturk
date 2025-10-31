function Menu({ active, setActive }) {
  const isActive = (key) => (active === key ? 'active' : '');

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark w-100">

      <div className="container-fluid">
        <a className="navbar-brand" href="#">Quiz Français-Turc</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${isActive('verbes')}`}
                onClick={() => setActive('verbes')}
              >
                Verbes
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${isActive('adverbes')}`}
                onClick={() => setActive('adverbes')}
              >
                Adverbes
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${isActive('adjectifs')}`}
                onClick={() => setActive('adjectifs')}
              >
                Adjectifs
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${isActive('noms')}`}
                onClick={() => setActive('noms')}
              >
                Noms
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
