import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditHouse.css"; // Import từ cùng thư mục

const EditHouse = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [newHouse, setNewHouse] = useState({
    name: "", location: "", type: "", price: "", area: "", status: "", img: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/houses/${id}`).then((response) => {
      setHouse(response.data);
      setNewHouse(response.data);
    });
  }, [id]);

  const handleInputChange = (e) => {
    setNewHouse({ ...newHouse, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:3001/houses/${id}`, newHouse).then(() => {
      setMessage("Cập nhật thành công!");
      setTimeout(() => navigate("/managerhouses"), 1500);
    });
  };

  return (
    <div className="edit-house-container">
      <header>
        <h1>Chỉnh sửa bài đăng</h1>
      </header>

      {house ? (
        <div className="edit-house-form">
           <img 
                  src={`http://localhost:3001${house.img}`} 
                  alt={house.name} 
                  width="300" 
                />
          <div className="form-fields">
            <input type="text" name="name" placeholder="Tên nhà" value={newHouse.name} onChange={handleInputChange} />
            <input type="text" name="location" placeholder="Vị trí" value={newHouse.location} onChange={handleInputChange} />
            <input type="text" name="type" placeholder="Loại" value={newHouse.type} onChange={handleInputChange} />
            <input type="number" name="price" placeholder="Giá" value={newHouse.price} onChange={handleInputChange} />
            <input type="number" name="area" placeholder="Diện tích" value={newHouse.area} onChange={handleInputChange} />
            <input type="text" name="status" placeholder="Trạng thái" value={newHouse.status} onChange={handleInputChange} />
            <input type="text" name="img" placeholder="Ảnh (URL)" value={newHouse.img} onChange={handleInputChange} />
          </div>
          <div className="form-buttons">
            <button className="save-btn" onClick={handleSaveEdit}>Sửa</button>
            <button className="back-btn" onClick={() => navigate("/managerhouses")}>Trở lại</button>
          </div>
          {message && <p className="success-message">{message}</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditHouse;
