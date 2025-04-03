import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditHouse = () => {
  const { id } = useParams();  // Lấy ID từ URL
  const [house, setHouse] = useState(null);
  const [newHouse, setNewHouse] = useState({
    name: "", location: "", type: "", price: "", area: "", status: "", img: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin căn nhà từ API dựa trên ID
    axios.get(`http://localhost:3001/houses/${id}`).then((response) => {
      setHouse(response.data);
      setNewHouse(response.data);  // Điền dữ liệu vào form
    });
  }, [id]);

  const handleInputChange = (e) => {
    setNewHouse({ ...newHouse, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:3001/houses/${id}`, newHouse).then(() => {
      navigate("/admin");  // Quay lại trang quản lý sau khi lưu chỉnh sửa
    });
  };

  return (
    <div>
      <header>
        <h1>Chỉnh sửa bài đăng</h1>
      </header>

      {house ? (
        <div>
          <input type="text" name="name" placeholder="Tên nhà" value={newHouse.name} onChange={handleInputChange} />
          <input type="text" name="location" placeholder="Vị trí" value={newHouse.location} onChange={handleInputChange} />
          <input type="text" name="type" placeholder="Loại" value={newHouse.type} onChange={handleInputChange} />
          <input type="number" name="price" placeholder="Giá" value={newHouse.price} onChange={handleInputChange} />
          <input type="number" name="area" placeholder="Diện tích" value={newHouse.area} onChange={handleInputChange} />
          <input type="text" name="status" placeholder="Trạng thái" value={newHouse.status} onChange={handleInputChange} />
          <input type="text" name="img" placeholder="Ảnh (URL)" value={newHouse.img} onChange={handleInputChange} />
          
          <button onClick={handleSaveEdit}>Lưu chỉnh sửa</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditHouse;
