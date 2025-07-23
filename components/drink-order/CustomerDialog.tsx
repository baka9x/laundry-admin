'use client';

type Customer = {
  id: number;
  name: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (customer: Customer) => void;
};

export default function CustomerDialog({ open, onClose, onSelect }: Props) {
  if (!open) return null;

  const customers = [
    { id: 1, name: 'Nguyễn Văn A' },
    { id: 2, name: 'Trần Thị B' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl w-80 space-y-3">
        <h2 className="text-lg font-bold">Chọn khách hàng</h2>
        {customers.map((customer) => (
          <button
            key={customer.id}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
            onClick={() => onSelect(customer)}
          >
            {customer.name}
          </button>
        ))}
        <button onClick={onClose} className="text-red-500">Đóng</button>
      </div>
    </div>
  );
}
