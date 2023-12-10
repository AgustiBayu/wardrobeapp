import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { soEdit } from "../../../slices/sliceSo";

export default function EditInvoice() {
    const dispatch = useDispatch();
    const { stateSo, createStatus } = useSelector((state) => state.so);
    const navigate = useNavigate();
    const { soId } = useParams();
    const selectedSo = stateSo.find((item) => item.order_id === parseInt(soId, 10));

    const [nameCustomer, setNameCustomer] = useState(0);
    const [nameProduct, setNameProduct] = useState(0);
    const [priceUnit, setPriceUnit] = useState(0);
    const [qtyDemand, setQtyDemand] = useState(0);
    const [totalSo, setTotalSo] = useState(0);
    const [tglSo, setTglSo] = useState("");
    const [tglInvoiceSo, setTglInvoiceSo] = useState("");

    useEffect(() => {
        if (selectedSo) {
            setNameCustomer(selectedSo.customer_id);
            setNameProduct(selectedSo.product_id);
            setPriceUnit(selectedSo.price);
            setQtyDemand(selectedSo.quantity_demand);
            setTotalSo(selectedSo.total);
            setTglSo(new Date(new Date(selectedSo.order_date).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]);
        }
    }, [soId, stateSo]);

    const handleEditInvoice = async (e) => {
        e.preventDefault();

        dispatch(soEdit({
            so: {
                soId: parseInt(soId, 10),
                customerId: nameCustomer ? nameCustomer : selectedSo.customer_id,
                productId: nameProduct ? nameProduct : selectedSo.product_id,
                quantityDemand: qtyDemand,
                quantityReceive: selectedSo.quantity_receive,
                total: totalSo,
                tanggalOrder: tglSo,
                tanggalInvoice: tglInvoiceSo,
                orderStatus: "SO",
                paymentStatus: "Fully Invoiced",
            }
        }));
        navigate("/so/invoice");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Membuat Invoice</h1>
                <form onSubmit={handleEditInvoice}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Customer :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameCustomer(e.target.value)}
                            required
                            defaultValue={selectedSo.customer_id}
                            disabled
                        >
                            <option value={selectedSo.customer_id}>
                                {selectedSo.customer_name}
                            </option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Produk :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameProduct(e.target.value)}
                            required
                            defaultValue={selectedSo.product_id}
                            disabled
                        >
                            <option value={selectedSo.product_id}>
                                {selectedSo.product_name}
                            </option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Harga Per Unit :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder={priceUnit}
                            onChange={(e) => setPriceUnit(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Kuantitas :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder={qtyDemand}
                            onChange={(e) => setQtyDemand(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Total :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder={totalSo}
                            onChange={(e) => setTotalSo(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tanggal Order :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            placeholder="Isi Tanggal Order"
                            value={tglSo}
                            onChange={(e) => setTglSo(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tanggal Invoice :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            placeholder="Isi Tanggal Invoice"
                            onChange={(e) => setTglInvoiceSo(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {createStatus === "pending" ? "Submitting" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
