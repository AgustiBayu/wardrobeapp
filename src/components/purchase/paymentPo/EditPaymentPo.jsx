import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { payPoEdit } from "../../../slices/slicePaymentPo";
import { poEdit } from "../../../slices/slicePo";

export default function EditPaymentPo() {
    const dispatch = useDispatch();
    const { createStatus, statePayPo } = useSelector((state) => state.payPo);
    const { stateSupplier } = useSelector((state) => state.supplier);
    const { statePo } = useSelector((state) => state.po);
    const { payPoId } = useParams();
    const navigate = useNavigate();
    const selectedPayPo = statePayPo.find((item) => item.paymentPO_id === parseInt(payPoId, 10));
    const selectedPo = statePo.find((item) => item.orderPO_id === selectedPayPo.orderPO_id);
    console.log(selectedPo);

    const [nameSupplier, setNameSupplier] = useState("");
    const [payPoTotal, setPayPoTotal] = useState(0);
    const [payPoBank, setPayPoBank] = useState(0);
    const [payPoTanggal, setPayPoTanggal] = useState("");

    useEffect(() => {
        if (selectedPayPo) {
            setNameSupplier(selectedPayPo.supplier_id);
            setPayPoTotal(selectedPayPo.total);
            setPayPoTanggal(new Date(new Date(selectedPayPo.tanggal).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]);
        }
    }, [payPoId, statePayPo]);

    const handleCreatePayPo = async (e) => {
        e.preventDefault();

        dispatch(payPoEdit({
            payPo: {
                payPoId: parseInt(payPoId, 10),
                orderPoId: selectedPayPo.orderPO_id,
                supplierId: nameSupplier,
                total: payPoTotal,
                bank: payPoBank,
                tanggal: payPoTanggal,
                paymentStatus: "Fully Billed",
            }
        }));

        dispatch(poEdit({
            po: {
                poId: selectedPo.orderPO_id,
                supplierId: selectedPo.supplier_id,
                materialId: selectedPo.material_id,
                quantityDemand: selectedPo.quantity_demand,
                quantityReceive: selectedPo.quantity_receive,
                total: selectedPo.total,
                tanggal: selectedPo.tanggal,
                orderStatus: selectedPo.order_status,
                paymentStatus: "Fully Billed",
            }
        }));
        navigate("/po/payment-po");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Register Payment</h1>
                <form onSubmit={handleCreatePayPo}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Supplier :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameSupplier(e.target.value)}
                            required
                            defaultValue={selectedPayPo.supplier_id}
                            disabled
                        >
                            <option value="cat" disabled hidden>
                                Pilih Supplier
                            </option>
                            {/* memanggil isi dari kategori menggunakan state */}
                            {stateSupplier && stateSupplier.map((item) => (
                                <option key={item.supplier_id} value={item.supplier_id}>
                                    {item.supplier_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Total PO :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder={payPoTotal}
                            onChange={(e) => setPayPoTotal(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Bank :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setPayPoBank(e.target.value)}
                            required
                            defaultValue="cat"
                        >
                            <option value="cat" disabled hidden>
                                Pilih Bank Anda
                            </option>
                            <option value="BNI">
                                BNI
                            </option>
                            <option value="BRI">
                                BRI
                            </option>
                            <option value="Mandiri">
                                Mandiri
                            </option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tanggal Payment :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            placeholder="Isi Tanggal Payment"
                            value={payPoTanggal}
                            onChange={(e) => setPayPoTanggal(e.target.value)}
                            required
                            readOnly
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
