// Trang quản lý bài đăng (Admin - Manager)
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/home.css";
import { Link } from 'react-router-dom';

const ManagerHouses = () => {
  const [houses, setHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const housesPerPage = 3; // Số căn nhà mỗi trang

  useEffect(() => {
    axios.get("http://localhost:3001/houses").then((res) => setHouses(res.data));
  }, []);

  // Tính toán các căn nhà của trang hiện tại
  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = houses.slice(indexOfFirstHouse, indexOfLastHouse);

  // Tổng số trang
  const totalPages = Math.ceil(houses.length / housesPerPage);

  // Chuyển sang trang trước
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Chuyển sang trang tiếp theo
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Hàm xử lý xóa nhà
  const handleDeleteHouse = (id) => {
    axios
      .delete(`http://localhost:3001/houses/${id}`)
      .then(() => {
        // Cập nhật lại danh sách các căn nhà sau khi xóa
        setHouses(houses.filter((house) => house.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the house!", error);
      });
  };

  return (
    <div>
      <header>
        <h1>Quản lý bài đăng</h1>
        <Link to="/admin/addhouse">
          <button>Thêm Bài Đăng</button>
        </Link>
      </header>

      <h3>Lọc bài đăng</h3>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentHouses.map((house) => (
            <tr key={house.id}>
              <td>{house.id}</td>
              <td><img src={`http://localhost:3001${house.img}`} alt={house.name} width="100" /></td>
              <td>{house.name}</td>
              <td>{house.location}</td>
              <td>{house.type}</td>
              <td>{house.price}</td>
              <td>{house.area}</td>
              <td>{house.status}</td>
              <td>
                <Link to={`/admin/edithouse/${house.id}`}>
                  <button>Chỉnh sửa</button>
                </Link>
                <button onClick={() => handleDeleteHouse(house.id)}>Xóa</button>
              </td>
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

export default ManagerHouses;
