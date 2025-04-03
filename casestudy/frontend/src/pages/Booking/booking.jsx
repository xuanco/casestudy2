// Booking/Booking.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng tới các trang khác
import hinh1 from "../../assets/hinhanh/hinh1.png";
import hinh2 from "../../assets/hinhanh/hinh2.png";
import hinh3 from "../../assets/hinhanh/hinh3.png";
import hinh4 from "../../assets/hinhanh/hinh1.png";

const sampleHouses = [
    { id: 1, name: "Căn hộ cao cấp", location: "TP. Hồ Chí Minh", type: "Căn hộ", price: "10.000.000 VNĐ/tháng", area: "80m²", status: "available", img: hinh1 },
    { id: 2, name: "Biệt thự ven biển", location: "Đà Nẵng", type: "Biệt thự", price: "25.000.000 VNĐ/tháng", area: "150m²", status: "rented", img: hinh2 },
    { id: 3, name: "Nhà phố trung tâm", location: "Hà Nội", type: "Nhà riêng", price: "15.000.000 VNĐ/tháng", area: "90m²", status: "available", img: hinh3 },
    { id: 4, name: "Nhà phố trung tâm", location: "Hà Nội", type: "Nhà riêng", price: "15.000.000 VNĐ/tháng", area: "90m²", status: "available", img: hinh4 }
];

function Booking() {
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phone: "",
        rentalPeriod: "",
    });
    const navigate = useNavigate();

    const handleSelectHouse = (house) => {
        setSelectedHouse(house);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedHouse && userInfo.name && userInfo.email && userInfo.phone && userInfo.rentalPeriod) {
            // Gửi thông tin đặt thuê (Có thể gửi tới backend API)
            console.log("Thông tin đặt thuê: ", { selectedHouse, userInfo });
            // Điều hướng đến trang xác nhận hoặc trang thông báo đặt thành công
            navigate("/confirmation");
        } else {
            alert("Vui lòng điền đầy đủ thông tin!");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-extrabold text-red-500 uppercase text-center tracking-wide border-b-4 border-red-500 inline-block pb-2">
                Đặt Thuê
            </h1>

            <div className="bg-white p-4 shadow-md rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Chọn nhà thuê</h3>
                <div className="flex gap-4 flex-wrap">
                    {/* Giả sử là danh sách các nhà cho thuê */}
                    {sampleHouses.map((house) => (
                        <div
                            key={house.id}
                            onClick={() => handleSelectHouse(house)}
                            className={`cursor-pointer p-4 border ${selectedHouse?.id === house.id ? "bg-gray-200" : "bg-white"}`}
                        >
                            <img src={house.img} alt={house.name} className="w-32 h-32 object-cover mb-2" />
                            <h4 className="font-semibold">{house.name}</h4>
                            <p>{house.location}</p>
                            <p>{house.price}</p>
                        </div>
                    ))}
                </div>
            </div>

            {selectedHouse && (
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Thông tin người thuê</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Tên</label>
                            <input
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Thời gian thuê (Tháng)</label>
                            <input
                                type="number"
                                name="rentalPeriod"
                                value={userInfo.rentalPeriod}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>

                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                            Đặt thuê
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Booking;
