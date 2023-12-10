import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { soEdit } from "../../../slices/sliceSo";

export default function EditConfirmQ() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { createStatus, stateSo } = useSelector((state) => state.so);
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
            setTglSo(selectedSo.order_date);
            setTglInvoiceSo(selectedSo.invoice_date);
        }
    }, [soId, stateSo]);

    const handleUpdate = async () => {
        dispatch(soEdit({
            so: {
                soId: parseInt(soId ,10),
                customerId: nameCustomer ? nameCustomer : selectedSo.customer_id,
                productId: nameProduct ? nameProduct : selectedSo.product_id,
                quantityDemand: qtyDemand,
                quantityReceive: selectedSo.quantity_receive,
                total: totalSo,
                tanggalOrder: tglSo,
                tanggalInvoice: tglInvoiceSo,
                orderStatus: "SO",
                paymentStatus: "Nothing to Invoice",
            }
        }));
        navigate("/so/confirm-q");
    };
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-[400px] h-[250px] bg-gray-200 rounded-lg shadow-md">
                <div className="flex p-4 w-[100%] h-[100%]">
                    <div className="flex flex-col items-center justify-center h-[100%] w-[100%]">
                        <div className="flex w-[100%] h-[50px] justify-center item-center">
                            <h1 className="text-xl font-bold">Anda Yakin?</h1>
                        </div>
                        <div className="flex w-[100%] h-[50px]">
                            <button onClick={handleUpdate} className="w-[100%] focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                {createStatus === "pending" ? "Submitting" : "Ya"}
                            </button>
                        </div>
                        <div className="flex w-[100%] h-[50px] mt-[15px]">
                            <button onClick={() => navigate("/po/confirm-rfq")} className="w-[100%] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}