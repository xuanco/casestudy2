import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHouse = () => {
  const [newHouse, setNewHouse] = useState({
    name: "",
    location: "",
    type: "",
    price: "",
    area: "",
    status: "",
    img: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewHouse({ ...newHouse, [e.target.name]: e.target.value });
  };

  const handleAddHouse = () => {
    axios
      .post("http://localhost:3001/houses", newHouse)
      .then(() => {
        alert("Thêm nhà thành công!");
        navigate("/managerhouses"); // Quay về trang quản lý nhà sau khi thêm
      })
      .catch(() => {
        alert("Thêm nhà thất bại!");
      });
  };
  return (
    <div>
      <h3>Thêm nhà mới</h3>
      <input
        type="text"
        name="name"
        placeholder="Tên nhà"
        value={newHouse.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Vị trí"
        value={newHouse.location}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="type"
        placeholder="Loại"
        value={newHouse.type}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Giá"
        value={newHouse.price}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="area"
        placeholder="Diện tích"
        value={newHouse.area}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="status"
        placeholder="Trạng thái"
        value={newHouse.status}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="img"
        placeholder="Ảnh (URL)"
        value={newHouse.img}
        onChange={handleInputChange}
      />
      <button onClick={handleAddHouse}>Thêm</button>
    </div>
  );
};

export default AddHouse;

