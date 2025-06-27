'use client';
import React, { useState } from 'react';

interface ServiceItem {
  id: number;
  name: string;
  price: number;
}

interface OrderFormProps {
  onAddItem: (item: ServiceItem & { quantity: number }) => void;
}

const services: ServiceItem[] = [
  { id: 1, name: 'Giặt đồ dưới 3kg', price: 25000 },
  { id: 2, name: 'Giặt sấy nhanh', price: 40000 },
  { id: 3, name: 'Ủi quần áo', price: 10000 },
];

const OrderForm: React.FC<OrderFormProps> = ({ onAddItem }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (selectedService && quantity > 0) {
      onAddItem({ ...selectedService, quantity });
    }
  };

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Đặt đơn mới</h2>

      <div className="mb-4">
        <label className="block mb-1">Dịch vụ:</label>
        <select
          className="bg-[#1f1f1f] text-white px-4 py-2 w-full rounded"
          value={selectedService.id}
          onChange={(e) => {
            const id = parseInt(e.target.value);
            const svc = services.find((s) => s.id === id);
            if (svc) setSelectedService(svc);
          }}
        >
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - {service.price.toLocaleString()}đ
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Số lượng:</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="bg-[#1f1f1f] text-white px-4 py-2 w-full rounded"
        />
      </div>

      <button onClick={handleAdd} className="bg-[#f6b100] text-black px-4 py-2 rounded font-semibold w-full">
        + Thêm vào đơn
      </button>
    </div>
  );
};

export default OrderForm;