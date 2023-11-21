import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { supplierEdit } from "../../../slices/sliceSupplier";

export default function EditSupplier() {
    const dispatch = useDispatch();
    const { stateSupplier, createStatus } = useSelector((state) => state.supplier);
    const { supId } = useParams();

    const navigate = useNavigate();

    const [nameSupplier, setNameSupplier] = useState("");
    const [contactSupplier, setContactSupplier] = useState("");
    const [emailSupplier, setEmailSupplier] = useState("");
    const [phoneSupplier, setPhoneSupplier] = useState("");
    const selectedSup = stateSupplier.find((item) => item.supplier_id === parseInt(supId, 10));

    useEffect(() => {
        if (selectedSup) {
            setNameSupplier(selectedSup.supplier_name)
            setContactSupplier(selectedSup.contact_name);
            setEmailSupplier(selectedSup.email);
            setPhoneSupplier(selectedSup.phone_number);
        }
    }, [supId, stateSupplier]);

    const handleEditSupplier = async (e) => {
        e.preventDefault();

        dispatch(supplierEdit({
            supplier: {
                supplierId: parseInt(supId, 10),
                supplierName: nameSupplier,
                supplierContact: contactSupplier,
                email: emailSupplier,
                phoneNumber: phoneSupplier,
            }
        }));
        navigate("/supplier");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Edit Supplier</h1>
                <form onSubmit={handleEditSupplier}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Supplier :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Nama Supplier"
                            value={nameSupplier}
                            onChange={(e) => setNameSupplier(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Kontak :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Nama Kontak Supplier"
                            value={contactSupplier}
                            onChange={(e) => setContactSupplier(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Email Supplier"
                            value={emailSupplier}
                            onChange={(e) => setEmailSupplier(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nomor Telepon :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Nohp Supplier"
                            value={phoneSupplier}
                            onChange={(e) => setPhoneSupplier(e.target.value)}
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
