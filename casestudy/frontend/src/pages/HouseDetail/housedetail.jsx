// Trang chi tiết nhà thuê  
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./HouseDetail.css"; // Import file CSS riêng

function HouseDetail() {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    
    const [review, setReview] = useState({ rating: 0, comment: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/houses/${id}`)
            .then((response) => {
                setHouse(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi tải chi tiết nhà:", error);
                setIsLoading(false);
            });

        // Lấy danh sách đánh giá
        axios.get(`http://localhost:3001/reviews?houseId=${id}`)
            .then(response => setReviews(response.data))
            .catch(error => console.error("Lỗi khi tải đánh giá:", error));
    }, [id]);

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/reviews`, { ...review, houseId: id })
            .then(() => {
                setMessage('Đánh giá đã được gửi!');
                setReview({ rating: 0, comment: '' });

                // Cập nhật danh sách đánh giá
                axios.get(`http://localhost:3001/reviews?houseId=${id}`)
                    .then(response => setReviews(response.data));
            })
            .catch(() => setMessage('Có lỗi xảy ra, vui lòng thử lại.'));
    };

    if (isLoading) return <div className="loading">Đang tải...</div>;
    if (!house) return <div className="error">Không tìm thấy nhà!</div>;

    return (
        <div className="house-detail-container">
            <h1 className="title">{house.name}</h1>
            <img src={house.img} alt={house.name} className="house-image" />
            <p><strong>Địa điểm:</strong> {house.location}</p>
            <p><strong>Loại nhà:</strong> {house.type}</p>
            <p><strong>Giá thuê:</strong> {house.price} VND</p>
            <p><strong>Diện tích:</strong> {house.area} m²</p>
            <p><strong>Tình trạng:</strong> 
                <span className={house.status === "available" ? "available" : "rented"}>
                    {house.status === "available" ? "Còn trống" : "Đã thuê"}
                </span>
            </p>

            {/* Đánh giá */}
            <h2 className="section-title">Đánh giá</h2>
            <form onSubmit={handleReviewSubmit} className="review-form">
                <select name="rating" value={review.rating} onChange={handleReviewChange} required>
                    <option value="0">Chọn đánh giá</option>
                    <option value="1">⭐ 1 sao</option>
                    <option value="2">⭐⭐ 2 sao</option>
                    <option value="3">⭐⭐⭐ 3 sao</option>
                    <option value="4">⭐⭐⭐⭐ 4 sao</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 sao</option>
                </select>
                <textarea
                    name="comment"
                    placeholder="Nhận xét của bạn"
                    value={review.comment}
                    onChange={handleReviewChange}
                    required
                />
                <button type="submit" className="submit-btn">Gửi đánh giá</button>
            </form>

            {/* Danh sách đánh giá */}
            <div className="reviews-list">
                {reviews.length > 0 ? (
                    reviews.map((rev, index) => (
                        <div key={index} className="review-item">
                            <span className="rating">{'⭐'.repeat(rev.rating)}</span>
                            <p>{rev.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-reviews">Chưa có đánh giá nào.</p>
                )}
            </div>

            {message && <div className="message">{message}</div>}
        </div>
    );
}

export default HouseDetail;
