import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/home.css";

const Home = () => {
  const [houses, setHouses] = useState([]);
  const [filters, setFilters] = useState({
    id: "", name: "", location: "", type: "", price: "", area: "", status: ""
  });
  const [user, setUser] = useState({ name: "Guest", loggedIn: false });
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 3;

  useEffect(() => {
    axios.get("http://localhost:3001/houses").then((res) => setHouses(res.data));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = () => {
    // Được gọi khi người dùng nhấn nút "Lọc"
    console.log("Apply filters:", filters);
  };

  const filteredHouses = houses.filter((house) => {
    return Object.keys(filters).every((key) =>
      filters[key] === "" || house[key].toString().toLowerCase().includes(filters[key].toLowerCase())
    );
  });

  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse);

  const totalPages = Math.ceil(filteredHouses.length / housesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleLogout = () => {
    setUser({ name: "Guest", loggedIn: false });
  };

  const locations = ["Phan Thiết", "Lâm Đồng", "Hải Phòng", "Vũng Tàu", "Đà Lạt", "Nha Trang", "TP. Hồ Chí Minh", "Đà Nẵng", "Hà Nội", "Huế"];
  const types = ["Căn hộ", "Biệt thự", "Nhà riêng"];
  const statuses = ["available", "rented"];

  return (
    <div>
      <header>
        <h1>Home List</h1>
        <div>
          <span>User: {user.name}</span>
          {user.loggedIn && <button onClick={handleLogout}>Logout</button>}
        </div>
      </header>

      <div className="filters">
        <h3>Bộ lọc</h3>
        <div className="filter-row">
          <div className="filter-item">
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={filters.id}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-item">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={filters.name}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-item">
            <select name="location" value={filters.location} onChange={handleFilterChange}>
              <option value="">Location</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">Type</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <button onClick={handleFilterSubmit}>Lọc</button>
          </div>
        </div>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Type</th>
            <th>Price (VND)</th>
            <th>Area</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentHouses.map((house) => (
            <tr key={house.id}>
              <td>{house.id}</td>
              <td>
                <img 
                  src={`http://localhost:3001${house.img}`} 
                  alt={house.name} 
                  width="100" 
                />
              </td>
              <td><Link to={`/admin/housedetail/${house.id}`}>{house.name}</Link></td>
              <td>{house.location}</td>
              <td>{house.type}</td>
              <td>{house.price}</td>
              <td>{house.area}</td>
              <td>{house.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Home;
