import React, { useState } from 'react';
import { Eye, Edit, MoreVertical, Plus, Sofa, FunnelPlus, Info } from 'lucide-react';
import CustomInput from '../../../components/ui/custom-input';
import CustomPagination from '../../../components/ui/custom-pagination';
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

type ProductStatus = 'موجود' | 'کم موجود' | 'ناموجود';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  status: ProductStatus;
  statusColor: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'مبل مدرن الوبس', category: 'مبلمان', price: '۲۴,۸۵۰,۰۰۰', status: 'موجود', statusColor: 'bg-green-100 text-green-700', image: '/Images/product-20.jpg' },
  { id: 2, name: 'میز ناهارخوری چوبی', category: 'میز و صندلی', price: '۱۸,۹۰۰,۰۰۰', status: 'موجود', statusColor: 'bg-green-100 text-green-700', image: '/Images/product-20.jpg' },
  { id: 3, name: 'صندلی راحتی موناکو', category: 'صندلی', price: '۹,۵۰۰,۰۰۰', status: 'کم موجود', statusColor: 'bg-orange-100 text-orange-600', image: '/Images/product-20.jpg' },
  { id: 4, name: 'میز جلو مبلی وودلند', category: 'میز جلو مبلی', price: '۶,۳۸۰,۰۰۰', status: 'موجود', statusColor: 'bg-green-100 text-green-700', image: '/Images/product-20.jpg' },
  { id: 5, name: 'تخت خواب دو نفره روما', category: 'تخت خواب', price: '۳۲,۵۰۰,۰۰۰', status: 'ناموجود', statusColor: 'bg-rose-100 text-rose-700', image: '/Images/product-20.jpg' },
  { id: 6, name: 'آباژور ایستاده فوردیک', category: 'نورپردازی', price: '۴,۲۸۰,۰۰۰', status: 'موجود', statusColor: 'bg-green-100 text-green-700', image: '/Images/product-20.jpg' },
];

const detailFields = (p: Product) => [
  { label: 'نام محصول', value: p.name },
  { label: 'دسته بندی', value: p.category },
  { label: 'قیمت', value: `${p.price} تومان` },
  { label: 'رنگ', value: 'قهوه‌ای' },
  { label: 'سایز', value: 'سه نفره' },
  { label: 'وزن', value: '۴۵ کیلوگرم' },
];

const ProductManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const totalProducts = 75;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <section className="w-full bg-white rounded-md shadow-lg my-4 p-4 md:my-10 md:p-6 border transition-all hover:drop-shadow-custom">

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-9 rounded-md bg-neutral-01 shrink-0">
            <Sofa className="text-secondary-color-blue" />
          </div>
          <h2 className="text-xl md:text-2xl font-VazirBold text-neutral-07">محصولات</h2>
        </div>
        <p className="font-VazirRegular text-sm text-gray-500 mt-2">
          لیست تمامی محصولات فروشگاه را مشاهده، مدیریت و ویرایش کنید.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <CustomInput
            type="text"
            placeholder="جستجو در محصولات..."
            inputClassName="h-10 w-full rounded-md border bg-white px-4 font-VazirRegular text-sm outline-none transition-all placeholder:text-neutral-04 focus:border-neutral-04 sm:w-72 md:w-80 pl-10"
          />
          <button className="flex items-center justify-center gap-2 border px-3 h-10 font-VazirRegular rounded-md cursor-pointer transition-all hover:bg-main hover:text-white shrink-0">
            <FunnelPlus size={16} />
            <span className="hidden sm:inline">فیلتر</span>
          </button>
        </div>
        <button
          onClick={() => navigate("/p-admin/admin-product/add")}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-main text-white transition-colors hover:bg-main/90 cursor-pointer shrink-0 w-full sm:w-auto"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">افزودن محصول جدید</span>
          <span className="sm:hidden">افزودن</span>
        </button>
      </div>

      {/* Mobile Cards (زیر md) */}
      <div className="md:hidden space-y-2">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-3 bg-white flex gap-3 items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-md object-cover bg-gray-100 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-VazirMedium text-sm text-neutral-07 truncate">{product.name}</p>
                <span className={`text-xs font-VazirMedium px-2 py-0.5 rounded-md shrink-0 ${product.statusColor}`}>
                  {product.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-VazirRegular mt-0.5">{product.category}</p>
              <p className="text-xs font-VazirMedium text-gray-700 mt-1">{product.price} تومان</p>
            </div>
            <div className="flex flex-col items-center gap-2 shrink-0">
              <Info
                size={16}
                onClick={() => { setSelectedProduct(product); setOpenDetails(true); }}
                className="cursor-pointer text-secondary-color-blue"
              />
              <Eye size={16} className="cursor-pointer text-secondary-color-blue" />
              <Edit
                size={16}
                onClick={() => navigate("/p-admin/admin-product/edit")}
                className="cursor-pointer text-secondary-color-blue"
              />
              <MoreVertical size={16} className="cursor-pointer text-main" />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table (بالای md) */}
      <div className="hidden md:block rounded-md border overflow-hidden">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-50 text-neutral-07 font-VazirMedium text-xs border-b border-gray-100">
              <th className="p-4 text-right">محصول</th>
              <th className="p-4">دسته بندی</th>
              <th className="p-4">وضعیت موجودی</th>
              <th className="p-4">قیمت (تومان)</th>
              <th className="p-4">جزئیات</th>
              <th className="p-4">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-right">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-24 h-16 rounded-md object-cover bg-gray-200 shrink-0" />
                    <span className="font-VazirMedium text-sm">{product.name}</span>
                  </div>
                </td>
                <td className="p-4 font-VazirMedium text-sm text-gray-600">{product.category}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-VazirMedium ${product.statusColor}`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-4 font-VazirMedium text-sm">{product.price}</td>
                <td className="p-4">
                  <Info
                    size={18}
                    onClick={() => { setSelectedProduct(product); setOpenDetails(true); }}
                    className="cursor-pointer text-secondary-color-blue hover:text-gray-600 mx-auto"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-3">
                    <Eye size={18} className="cursor-pointer text-secondary-color-blue hover:text-gray-600" />
                    <Edit
                      size={18}
                      onClick={() => navigate("/p-admin/admin-product/edit")}
                      className="cursor-pointer text-secondary-color-blue hover:text-gray-600"
                    />
                    <MoreVertical size={18} className="cursor-pointer text-main hover:text-gray-600" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalProducts}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        label="محصول"
      />

      {/* Details Modal */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent className="max-w-sm mx-4 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-VazirBold text-center">جزئیات محصول</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-3 font-VazirRegular text-sm">
              {detailFields(selectedProduct).map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4">
                  <span className="text-gray-500 shrink-0">{label}</span>
                  <span className="text-right truncate">{value}</span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductManagement;



