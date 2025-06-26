import { BsFillFileEarmarkPlusFill } from 'react-icons/bs';
import { CiCircleMore } from 'react-icons/ci';
import { FaHome } from 'react-icons/fa';
import { LuWashingMachine } from 'react-icons/lu';
import { RiDrinks2Fill } from 'react-icons/ri';

export default function BottomNav() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 flex justify-around h-16">
      <button className="flex justify-center items-center text-[#ababab] bg-[#343434] w-[200px] rounded-[20px]">
        <FaHome className="inline mr-4" size={20} />Trang chủ
      </button>
      <button className="flex justify-center items-center text-[#ababab] w-[200px]">
        <LuWashingMachine className="inline mr-4" size={20} />Đơn giặt
      </button>
      <button className="flex justify-center items-center text-[#ababab] w-[200px]">
        <RiDrinks2Fill className="inline mr-4" size={20} /> Đồ uống
      </button>
      <button className="flex justify-center items-center text-[#ababab] w-[200px]">
        <CiCircleMore className="inline mr-4" size={20} /> Thêm
      </button>
      <button className="absolute items-center bottom-10 bg-[#f6b100] text-[#f5f5f5] rounded-full p-3">
        <BsFillFileEarmarkPlusFill size={30} />
      </button>
    </footer>
  );
}