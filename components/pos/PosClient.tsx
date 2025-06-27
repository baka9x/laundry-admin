'use client';
import { useState } from 'react';
import OrderForm from '@/components/pos/OrderForm';
import OrderSummary from '@/components/pos/OrderSummary';
import PaymentDialog from '@/components/pos/PaymentDialog';
import CustomerDialog from '@/components/pos/CustomerDialog';
import BottomNav from '@/components/layout/BottomNav';

export default function PosClient() {
  const [items, setItems] = useState<any[]>([]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);

  const handleAddItem = (item: any) => {
    setItems((prev) => [...prev, item]);
  };

  return (
    <>
      <main className="flex flex-col md:flex-row gap-4 px-4 py-6">
        <div className="w-full md:w-2/3">
          <OrderForm onAddItem={handleAddItem} />
        </div>
        <div className="w-full md:w-1/3">
          <OrderSummary items={items} onOpenPayment={() => setShowPaymentDialog(true)} />
        </div>
      </main>

      <BottomNav />

      {showPaymentDialog && (
        <PaymentDialog items={items} onClose={() => setShowPaymentDialog(false)} />
      )}
      {showCustomerDialog && (
        <CustomerDialog onClose={() => setShowCustomerDialog(false)} />
      )}
    </>
  );
}
