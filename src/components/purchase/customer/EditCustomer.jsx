import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { customerEdit } from "../../../slices/sliceCustomer";

export default function EditCustomer() {
    const dispatch = useDispatch();
    const { stateCustomer, createStatus } = useSelector((state) => state.customer);
    const navigate = useNavigate();
    const { cusId } = useParams();

    const [nameCustomer, setNameCustomer] = useState("");
    const [emailCustomer, setEmailCustomer] = useState("");
    const [phoneCustomer, setPhoneCustomer] = useState("");
    const selectedCus = stateCustomer.find((item) => item.customer_id === parseInt(cusId, 10));

    useEffect(() => {
        if (selectedCus) {
            setNameCustomer(selectedCus.customer_name)
            setEmailCustomer(selectedCus.email);
            setPhoneCustomer(selectedCus.phone_number);
        }
    }, [cusId, stateCustomer]);

    const handleCreateCustomer = async (e) => {
        e.preventDefault();

        dispatch(customerEdit({
            customer: {
                customerId: parseInt(cusId ,10),
                customerName: nameCustomer,
                email: emailCustomer,
                phoneNumber: phoneCustomer,
            }
        }));
        setNameCustomer("");
        setEmailCustomer("");
        setPhoneCustomer("");
        navigate("/customer");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Edit Customer</h1>
                <form onSubmit={handleCreateCustomer}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Customer :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Nama Customer"
                            value={nameCustomer}
                            onChange={(e) => setNameCustomer(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="email"
                            placeholder="Isi Email Customer"
                            value={emailCustomer}
                            onChange={(e) => setEmailCustomer(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nomor Telepon :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="tel"
                            pattern="[0-9]{12}"
                            placeholder="Isi 12 Digit Nohp Customer"
                            value={phoneCustomer}
                            onChange={(e) => setPhoneCustomer(e.target.value)}
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
