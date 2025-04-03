// Trang quản lý nhà của Host
import { useState } from "react";
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

function HostHouses() {
    const [currentPage, setCurrentPage] = useState(1);
    const housesPerPage = 3; // Số lượng nhà trên mỗi trang

    // Xác định nhà trên trang hiện tại
    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = sampleHouses.slice(indexOfFirstHouse, indexOfLastHouse);
    const totalPages = Math.ceil(sampleHouses.length / housesPerPage);

    return (
        <div className="p-6">
            <h1 className="text-4xl font-extrabold text-red-500 uppercase text-center tracking-wide border-b-4 border-red-500 inline-block pb-2">
                Quản lý nhà của Host
            </h1>

            <div className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Danh sách nhà của tôi</h3>
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
                            {currentHouses.map((house) => (
                                <tr key={house.id} className="text-center">
                                    <td className="border border-black p-2"><img src={house.img} alt={house.name} className="w-20 h-20 object-cover mx-auto" /></td>
                                    <td className="border border-black p-2">{house.name}</td>
                                    <td className="border border-black p-2">{house.location}</td>
                                    <td className="border border-black p-2">{house.type}</td>
                                    <td className="border border-black p-2">{house.price}</td>
                                    <td className="border border-black p-2">{house.area}</td>
                                    <td className="border border-black p-2">{house.status === "available" ? "Còn trống" : "Đã thuê"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-4 gap-2">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Trước</button>
                    <span>{currentPage} / {totalPages}</span>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Sau</button>
                </div>
            </div>
        </div>
    );
}

export default HostHouses;
