import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { soEdit } from "../../../slices/sliceSo";
import { productsEdit } from "../../../slices/sliceProducts";

export default function EditSoReceiveDemand() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { createStatus, stateSo } = useSelector((state) => state.so);
    const { stateProducts } = useSelector((state) => state.products);
    const { soId } = useParams();
    const selectedSo = stateSo.find((item) => item.order_id === parseInt(soId, 10));
    const selectedProd = stateProducts.find((item) => item.product_id === selectedSo.product_id);

    const [nameCustomer, setNameCustomer] = useState(0);
    const [nameProduct, setNameProduct] = useState(0);
    const [qtyDemand, setQtyDemand] = useState(0);
    const [qtyReceive, setQtyReceive] = useState(0);
    const [totalSo, setTotalSo] = useState(0);
    const [tglOrderSo, setTglOrderSo] = useState("");
    const [tglSo, setTglSo] = useState("");

    console.log(selectedSo);
    console.log(selectedProd);

    useEffect(() => {
        if (selectedSo) {
            setNameCustomer(selectedSo.customer_id);
            setNameProduct(selectedSo.product_id);
            setQtyDemand(selectedSo.quantity_demand);
            setQtyReceive(selectedSo.quantity_receive);
            setTotalSo(selectedSo.total);
            setTglOrderSo(selectedSo.order_date);
            setTglSo(selectedSo.invoice_date);
        }
    }, [soId, stateSo]);

    const handleReceiveDemand = async () => {
        dispatch(soEdit({
            so: {
                soId: parseInt(soId, 10),
                customerId: nameCustomer,
                productId: nameProduct,
                quantityDemand: qtyDemand,
                quantityReceive: qtyReceive,
                total: totalSo,
                tanggalOrder: tglOrderSo,
                tanggalInvoice: tglSo,
                orderStatus: "SO",
                paymentStatus: "Fully Invoiced",
            }
        }));
        dispatch(productsEdit({
            product: {
                productId: selectedProd.product_id,
                productName: selectedProd.product_name,
                categoryId: selectedProd.category_id,
                price: selectedProd.price,
                description: selectedProd.description,
                createdAt: selectedProd.created_at,
                prodStock: qtyReceive < qtyDemand ? selectedProd.product_stock : selectedProd.product_stock - parseInt(qtyReceive, 10),
                imgProd: selectedProd.image,
            }
        }));
        navigate("/so/receive-demand");
    };
    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Receive Demand</h1>
                <form onSubmit={handleReceiveDemand}>
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
                            min={0}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Diterima :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            value={qtyReceive}
                            onChange={(e) => setQtyReceive(e.target.value)}
                            required
                            min={0}
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