import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const provinces = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
    "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai",
    "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang",
    "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ",
    "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình",
    "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

function Dashboard() {
    const [filters, setFilters] = useState({ location: "", status: "", type: "", price: "", area: "" });
    const [houses, setHouses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const housesPerPage = 3;
    const [user, setUser] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:3001/houses")
            .then(response => {
                const formattedHouses = response.data.map(house => ({
                    ...house,
                    price: parseInt(house.price.replace(/\D/g, "")),
                    area: parseInt(house.area.replace(/\D/g, ""))
                }));
                console.log("Dữ liệu nhà từ API:", formattedHouses);
                setHouses(formattedHouses);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Lỗi khi tải dữ liệu nhà:", error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`http://localhost:3001/users/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error("Lỗi khi tải dữ liệu user:", error));
        }
    }, []);

    const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    const filteredHouses = houses.filter(house => {
        const priceFilter = filters.price ? parseInt(filters.price) : null;
        const areaFilter = filters.area ? parseInt(filters.area) : null;

        return (
            (filters.location ? house.location === filters.location : true) &&
            (filters.status ? house.status === filters.status : true) &&
            (filters.type ? house.type === filters.type : true) &&
            (priceFilter !== null && !isNaN(priceFilter) ? house.price <= priceFilter : true) &&
            (areaFilter !== null && !isNaN(areaFilter) ? house.area >= areaFilter : true)
        );
    });

    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse);
    const totalPages = Math.ceil(filteredHouses.length / housesPerPage);

    if (isLoading) return <div className="text-center">Đang tải...</div>;

    return (
        <div className="p-6 relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <FaUserCircle className="text-3xl" />
                <span className="font-semibold">{user ? user.username : "Khách"}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-red-500 uppercase text-center tracking-wide border-b-4 border-red-500 inline-block pb-2">
                NHÀ TỐT
            </h1>
            <div className="bg-white p-4 shadow-md rounded-lg mb-6 flex flex-col md:flex-row gap-4 flex-wrap">
                <select name="location" value={filters.location} onChange={handleChange} className="border p-2 rounded w-full md:w-1/5">
                    <option value="">Chọn tỉnh/thành</option>
                    {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                    ))}
                </select>
                <select name="status" value={filters.status} onChange={handleChange} className="border p-2 rounded w-full md:w-1/5">
                    <option value="">Tình trạng</option>
                    <option value="available">Còn trống</option>
                    <option value="rented">Đã thuê</option>
                </select>
                <select name="type" value={filters.type} onChange={handleChange} className="border p-2 rounded w-full md:w-1/5">
                    <option value="">Loại nhà</option>
                    <option value="Căn hộ">Căn hộ</option>
                    <option value="Nhà riêng">Nhà riêng</option>
                    <option value="Biệt thự">Biệt thự</option>
                </select>
                <input type="number" name="price" placeholder="Giá thuê tối đa" value={filters.price} onChange={handleChange} className="border p-2 rounded w-full md:w-1/5" />
                <input type="number" name="area" placeholder="Diện tích tối thiểu (m²)" value={filters.area} onChange={handleChange} className="border p-2 rounded w-full md:w-1/5" />
            </div>

            <div className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Danh sách nhà</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-black">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black p-2">Hình ảnh</th>
                                <th className="border border-black p-2">Tên nhà</th>
                                <th className="border border-black p-2">Địa điểm</th>
                                <th className="border border-black p-2">Loại</th>
                                <th className="border border-black p-2">Giá thuê</th>
                                <th className="border border-black p-2">Diện tích</th>
                                <th className="border border-black p-2">Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentHouses.length > 0 ? (
                                currentHouses.map(house => (
                                    <tr key={house.id} className="text-center">
                                        <td className="border border-black p-2">
                                            <img src={house.img} alt={house.name} className="w-20 h-20 object-cover mx-auto" />
                                        </td>
                                        <td className="border border-black p-2">
                                        <Link to={`/admin/housedetail/${house.id}`} className="text-blue-500">{house.name}</Link>
                                        </td>
                                        <td className="border border-black p-2">{house.location}</td>
                                        <td className="border border-black p-2">{house.type}</td>
                                        <td className="border border-black p-2">{house.price.toLocaleString()} VNĐ/tháng</td>
                                        <td className="border border-black p-2">{house.area}m²</td>
                                        <td className="border border-black p-2">{house.status === "available" ? "Còn trống" : "Đã thuê"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="border border-black p-2 text-center">
                                        Không tìm thấy nhà phù hợp
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between mt-4 items-center">
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                    Trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                    Sau
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
