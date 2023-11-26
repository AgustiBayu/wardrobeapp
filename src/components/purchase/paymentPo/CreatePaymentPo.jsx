import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { payPoCreate } from "../../../slices/slicePaymentPo";

export default function CreatePaymentPo() {
    const dispatch = useDispatch();
    const { createStatus } = useSelector((state) => state.payPo);
    const { stateSupplier } = useSelector((state) => state.supplier);
    const { statePo } = useSelector((state) => state.po);
    const { poId } = useParams();
    const navigate = useNavigate();
    const selectedPo = statePo.find((item) => item.orderPO_id === parseInt(poId, 10));

    const [nameSupplier, setNameSupplier] = useState("");
    const [payPoTotal, setPayPoTotal] = useState(0);
    const [payPoTanggal, setPayPoTanggal] = useState("");

    useEffect(() => {
        if (selectedPo) {
            setNameSupplier(selectedPo.supplier_id);
            setPayPoTotal(selectedPo.total);
        }
    }, [poId, statePo]);

    const handleCreatePayPo = async (e) => {
        e.preventDefault();

        dispatch(payPoCreate({
            orderPoId: poId,
            supplierId: nameSupplier,
            total: payPoTotal,
            tanggal: payPoTanggal,
            paymentStatus: "Waiting Bills",
        }));
        navigate("/po/receive-demand");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Membuat Bill PO</h1>
                <form onSubmit={handleCreatePayPo}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Supplier :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameSupplier(e.target.value)}
                            required
                            defaultValue={selectedPo.supplier_id}
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
                    {/* <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Pilih Bank :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setPayPoBank(e.target.value)}
                            required
                            defaultValue="cat"
                        >
                            <option value="cat" disabled hidden>
                                Pilih Kategori
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
                    </div> */}
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
