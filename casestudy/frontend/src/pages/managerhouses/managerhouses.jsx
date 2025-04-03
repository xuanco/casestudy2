// Trang quản lý bài đăng (Admin - Manager)
import { useState, useEffect } from "react";
import axios from "axios";

function ManagerHouses() {
    const [houses, setHouses] = useState([]);
    const [editId, setEditId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [newHouse, setNewHouse] = useState({
        name: "Căn hộ",
        location: "Hà Nội",
        price: "",
        area: "",
        status: "available",
        img: ""
    });
    const housesPerPage = 2;

    // Danh sách options
    const houseTypes = ["Căn hộ", "Biệt thự", "Nhà riêng"];
    const provinces = [
        "Hà Nội", "TP Hồ Chí Minh", "Hải Phòng", "Đà Nẵng", "Cần Thơ", 
        "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
        // Thêm các tỉnh thành khác để đủ 64 tỉnh...
    ];

    useEffect(() => {
        fetchHouses();
    }, []);

    const fetchHouses = () => {
        axios.get("http://localhost:3001/houses")
            .then(response => setHouses(response.data))
            .catch(error => console.error("Lỗi khi tải danh sách nhà:", error));
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này không?")) {
            axios.delete(`http://localhost:3001/houses/${id}`)
                .then(() => {
                    alert("Xóa thành công!");
                    fetchHouses();
                })
                .catch(error => console.error("Lỗi khi xóa nhà:", error));
        }
    };

    const handleEdit = (id) => {
        setEditId(id);
    };

    const handleSave = (id) => {
        const houseToUpdate = houses.find(house => house.id === id);
        axios.put(`http://localhost:3001/houses/${id}`, houseToUpdate)
            .then(() => {
                alert("Cập nhật thành công!");
                setEditId(null);
                fetchHouses();
            })
            .catch(error => console.error("Lỗi khi cập nhật nhà:", error));
    };

    const handleChange = (id, field, value) => {
        setHouses(prevHouses =>
            prevHouses.map(house =>
                house.id === id ? { ...house, [field]: value } : house
            )
        );
    };

    // Xử lý thêm nhà mới
    const handleNewHouseChange = (field, value) => {
        setNewHouse(prev => ({ ...prev, [field]: value }));
    };

    const handleAddHouse = () => {
        if (!newHouse.price || !newHouse.area || !newHouse.img) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        axios.post("http://localhost:3001/houses", newHouse)
            .then(() => {
                alert("Thêm nhà thành công!");
                fetchHouses();
                setNewHouse({
                    name: "Căn hộ",
                    location: "Hà Nội",
                    price: "",
                    area: "",
                    status: "available",
                    img: ""
                });
            })
            .catch(error => console.error("Lỗi khi thêm nhà:", error));
    };

    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = houses.slice(indexOfFirstHouse, indexOfLastHouse);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý bài đăng</h1>

            {/* Form thêm nhà mới */}
            <div className="mb-6 p-4 border rounded">
                <h2 className="text-xl font-semibold mb-2">Thêm bài đăng mới</h2>
                <div className="grid grid-cols-2 gap-4">
                    <select
                        value={newHouse.name}
                        onChange={(e) => handleNewHouseChange("name", e.target.value)}
                        className="border p-2 rounded"
                    >
                        {houseTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <select
                        value={newHouse.location}
                        onChange={(e) => handleNewHouseChange("location", e.target.value)}
                        className="border p-2 rounded"
                    >
                        {provinces.map(province => (
                            <option key={province} value={province}>{province}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Giá thuê (VNĐ)"
                        value={newHouse.price}
                        onChange={(e) => handleNewHouseChange("price", e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Diện tích (m²)"
                        value={newHouse.area}
                        onChange={(e) => handleNewHouseChange("area", e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="URL hình ảnh"
                        value={newHouse.img}
                        onChange={(e) => handleNewHouseChange("img", e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={handleAddHouse}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Thêm nhà
                    </button>
                </div>
            </div>

            {/* Bảng danh sách nhà */}
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 p-2">Hình ảnh</th>
                        <th className="border border-gray-400 p-2">Tên nhà</th>
                        <th className="border border-gray-400 p-2">Địa điểm</th>
                        <th className="border border-gray-400 p-2">Giá thuê (VNĐ)</th>
                        <th className="border border-gray-400 p-2">Diện tích</th>
                        <th className="border border-gray-400 p-2">Tình trạng</th>
                        <th className="border border-gray-400 p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentHouses.map(house => (
                        <tr key={house.id} className="text-center">
                            <td className="border border-gray-400 p-2">
                                <img src={house.img} alt={house.name} className="w-20 h-20 object-cover mx-auto" />
                            </td>
                            <td className="border border-gray-400 p-2">
                                {editId === house.id ? (
                                    <select
                                        value={house.name}
                                        onChange={(e) => handleChange(house.id, "name", e.target.value)}
                                        className="border p-1 w-full"
                                    >
                                        {houseTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                ) : (
                                    house.name
                                )}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {editId === house.id ? (
                                    <select
                                        value={house.location}
                                        onChange={(e) => handleChange(house.id, "location", e.target.value)}
                                        className="border p-1 w-full"
                                    >
                                        {provinces.map(province => (
                                            <option key={province} value={province}>{province}</option>
                                        ))}
                                    </select>
                                ) : (
                                    house.location
                                )}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {editId === house.id ? (
                                    <input
                                        type="number"
                                        value={house.price}
                                        onChange={(e) => handleChange(house.id, "price", e.target.value)}
                                        className="border p-1 w-full"
                                    />
                                ) : (
                                    `${house.price.toLocaleString()} VNĐ`
                                )}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {editId === house.id ? (
                                    <input
                                        type="number"
                                        value={house.area}
                                        onChange={(e) => handleChange(house.id, "area", e.target.value)}
                                        className="border p-1 w-full"
                                    />
                                ) : (
                                    `${house.area} m²`
                                )}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {editId === house.id ? (
                                    <select
                                        value={house.status}
                                        onChange={(e) => handleChange(house.id, "status", e.target.value)}
                                        className="border p-1 w-full"
                                    >
                                        <option value="available">Còn trống</option>
                                        <option value="rented">Đã thuê</option>
                                    </select>
                                ) : (
                                    house.status === "available" ? "Còn trống" : "Đã thuê"
                                )}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {editId === house.id ? (
                                    <>
                                        <button
                                            onClick={() => handleSave(house.id)}
                                            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Lưu
                                        </button>
                                        <button
                                            onClick={() => setEditId(null)}
                                            className="bg-gray-500 text-white px-3 py-1 rounded"
                                        >
                                            Hủy
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(house.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(house.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Xóa
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mx-2 disabled:opacity-50"
                >
                    Trang trước
                </button>
                <button
                    disabled={indexOfLastHouse >= houses.length}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mx-2 disabled:opacity-50"
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
}

export default ManagerHouses;