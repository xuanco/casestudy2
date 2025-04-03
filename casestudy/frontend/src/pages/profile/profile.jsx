 // Trang cá nhân  
import { useState, useEffect } from "react";  
import axios from 'axios';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    phone: '',
    profileImage: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/users') 
      .then((response) => {
        setUserProfile(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải thông tin người dùng');
        setLoading(false);
      });
  }, []);

  const handleUpdateProfile = () => {
    axios
      .put('http://localhost:3001/api/user/profile', userProfile) 
      .then(() => {
        setMessage('Cập nhật thông tin thành công!');
        setTimeout(() => setMessage(''), 3000); 
      })
      .catch(() => {
        setError('Lỗi khi cập nhật thông tin');
        setTimeout(() => setError(''), 3000); 
      });
  };

  if (loading) {
    return <div>Đang tải thông tin...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-red-500 uppercase text-center tracking-wide border-b-4 border-red-500 inline-block pb-2 mb-6">
        Hồ Sơ Người Dùng
      </h1>

      {message && (
        <div className="bg-green-500 text-white p-3 rounded-lg mb-4">
          {message}
        </div>
      )}

      <div className="bg-white p-6 shadow-lg rounded-lg flex gap-6">
        <img
          src={userProfile.profileImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800">{userProfile.username}</h2>
          <p className="text-lg text-gray-600">{userProfile.email}</p>
          <p className="text-lg text-gray-600">{userProfile.phone}</p>
        </div>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Thông tin chi tiết</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Thông tin</th>
              <th className="border p-2 text-left">Giá trị</th>
              <th className="border p-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Tên người dùng</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={userProfile.username}
                  onChange={(e) => setUserProfile({ ...userProfile, username: e.target.value })}
                  className="p-2 border rounded"
                />
              </td>
              <td className="border p-2 text-center">
                <button onClick={handleUpdateProfile} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                  Cập nhật
                </button>
              </td>
            </tr>
            <tr>
              <td className="border p-2">Email</td>
              <td className="border p-2">
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="p-2 border rounded"
                />
              </td>
              <td className="border p-2 text-center">
                <button onClick={handleUpdateProfile} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                  Cập nhật
                </button>
              </td>
            </tr>
            <tr>
              <td className="border p-2">Số điện thoại</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  className="p-2 border rounded"
                />
              </td>
              <td className="border p-2 text-center">
                <button onClick={handleUpdateProfile} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                  Cập nhật
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
