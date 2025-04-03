 // Trang chỉnh sửa nhà  
 import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HouseEdit = () => {
  const { id } = useParams();  // Lấy ID từ URL
  const navigate = useNavigate();
  const [house, setHouse] = useState({
    name: '',
    location: '',
    price: '',
    area: '',
    status: 'available',
    img: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/houses/${id}`)
      .then(response => setHouse(response.data))
      .catch(error => console.error('Lỗi khi tải nhà:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHouse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/houses/${id}`, house)
      .then(response => {
        alert('Cập nhật nhà thành công!');
        navigate('/');  // Quay về trang Home sau khi cập nhật
      })
      .catch(error => console.error('Lỗi khi cập nhật nhà:', error));
  };

  return (
    <div>
      <h1>Chỉnh sửa nhà</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={house.name}
          onChange={handleInputChange}
          placeholder="Tên nhà"
        />
        <input
          type="text"
          name="location"
          value={house.location}
          onChange={handleInputChange}
          placeholder="Địa điểm"
        />
        <input
          type="text"
          name="price"
          value={house.price}
          onChange={handleInputChange}
          placeholder="Giá thuê"
        />
        <input
          type="text"
          name="area"
          value={house.area}
          onChange={handleInputChange}
          placeholder="Diện tích"
        />
        <select
          name="status"
          value={house.status}
          onChange={handleInputChange}
        >
          <option value="available">Còn trống</option>
          <option value="rented">Đã thuê</option>
        </select>
        <input
          type="text"
          name="img"
          value={house.img}
          onChange={handleInputChange}
          placeholder="Đường dẫn ảnh"
        />
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default HouseEdit;

