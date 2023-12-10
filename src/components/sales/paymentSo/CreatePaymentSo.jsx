import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { paySoCreate } from "../../../slices/slicePaymentSo";

export default function CreatePaymentSo() {
    const dispatch = useDispatch();
    const { createStatus } = useSelector((state) => state.paySo);
    const { stateCustomer } = useSelector((state) => state.customer);
    const { stateSo } = useSelector((state) => state.so);
    const { soId } = useParams();
    const navigate = useNavigate();
    const selectedSo = stateSo.find((item) => item.order_id === parseInt(soId, 10));

    const [nameCustomer, setNameCustomer] = useState("");
    const [paySoTotal, setPaySoTotal] = useState(0);
    const [paySoTanggal, setPaySoTanggal] = useState("");

    useEffect(() => {
        if (selectedSo) {
            setNameCustomer(selectedSo.customer_id);
            setPaySoTotal(selectedSo.total);
        }
    }, [soId, stateSo]);

    const handleCreatePaySo = async (e) => {
        e.preventDefault();

        dispatch(paySoCreate({
            orderSoId: soId,
            customerId: nameCustomer,
            total: paySoTotal,
            tanggal: paySoTanggal,
            paymentStatus: "Waiting Bills",
        }));
        navigate("/so/invoice");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Membuat Bill SO</h1>
                <form onSubmit={handleCreatePaySo}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Customer :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameCustomer(e.target.value)}
                            required
                            defaultValue={selectedSo.customer_id}
                            disabled
                        >
                            <option value="cat" disabled hidden>
                                Pilih Customer
                            </option>
                            {/* memanggil isi dari kategori menggunakan state */}
                            {stateCustomer && stateCustomer.map((item) => (
                                <option key={item.customer_id} value={item.customer_id}>
                                    {item.customer_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Total SO :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder={paySoTotal}
                            onChange={(e) => setPaySoTotal(e.target.value)}
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
                            value={paySoTanggal}
                            onChange={(e) => setPaySoTanggal(e.target.value)}
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
