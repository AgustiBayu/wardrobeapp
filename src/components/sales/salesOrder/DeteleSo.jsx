import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { soDelete } from "../../../slices/sliceSo";

export default function DeleteSo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { soId } = useParams();
    const { deleteStatus } = useSelector((state) => state.so);

    const handleDelete = async () => {
        dispatch(soDelete(soId));
        navigate("/so")
    }
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-[400px] h-[250px] bg-gray-200 rounded-lg shadow-md">
                <div className="flex p-4 w-[100%] h-[100%]">
                    <div className="flex flex-col items-center justify-center h-[100%] w-[100%]">
                        <div className="flex w-[100%] h-[50px] justify-center item-center">
                            <h1 className="text-xl font-bold">Yakin Ingin Hapus?</h1>
                        </div>
                        <div className="flex w-[100%] h-[50px]">
                            <button onClick={handleDelete} className="w-[100%] focus:outline-none text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                {deleteStatus === "pending" ? "Submitting" : "Hapus"}
                            </button>
                        </div>
                        <div className="flex w-[100%] h-[50px] mt-[15px]">
                            <button onClick={() => navigate("/po")} className="w-[100%] text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}