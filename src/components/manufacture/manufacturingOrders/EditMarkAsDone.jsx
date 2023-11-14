import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { moEdit } from "../../../slices/sliceMo";
import { useEffect, useState } from "react";
import { productsEdit } from "../../../slices/sliceProducts";

export default function EditMarkAsDone() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { createStatus, stateMo } = useSelector((state) => state.mo);
    const { stateProducts } = useSelector((state) => state.products);
    const { moId } = useParams();
    const selectedMo = stateMo.find((item) => item.orderMO_id === parseInt(moId, 10));

    const [prodId, setProdId] = useState(0);
    const [moQty, setMoQty] = useState(0);
    const [moTotal, setMoTotal] = useState(0);
    const [moDate, setMoDate] = useState("");

    const updatedProdStock = stateProducts.map((item) => {
        const selectedProd = stateMo.find((updateItem) => updateItem.product_id === item.product_id);
        if (selectedProd) {
            return {
                ...item,
                product_stock: item.product_stock + selectedProd.quantity,
            };
        }
        return item;
    });

    console.log(updatedProdStock);
    console.log(moQty);
    console.log(moTotal);
    console.log(moDate);
    useEffect(() => {
        if (selectedMo) {
            setProdId(selectedMo.product_id);
            setMoQty(selectedMo.quantity);
            setMoTotal(selectedMo.total);
            setMoDate(selectedMo.tanggal);
        }
    }, [moId, stateMo]);

    const handleUpdate = async () => {
        stateMo.filter((item) => item)
        dispatch(moEdit({
            mo: {
                moId: parseInt(moId, 10),
                productId: prodId,
                quantity: moQty,
                total: moTotal,
                statusMo: "Finished",
                tanggal: moDate,
            }
        }));

        updatedProdStock.map((item) => {
            dispatch(productsEdit({
                product: {
                    productId: item.product_id,
                    productName: item.product_name,
                    categoryId: item.category_id,
                    price: item.price,
                    description: item.description,
                    createdAt: item.created_at,
                    prodStock: item.product_stock,
                    imgProd: item.image,
                }
            }));
        })
        navigate("/mo/mark-as-todo")
    }
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
                            <button onClick={() => navigate("/materials")} className="w-[100%] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}