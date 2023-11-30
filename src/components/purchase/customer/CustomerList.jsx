import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customerFetch } from "../../../slices/sliceCustomer";

export default function CustomerList() {
    const dispatch = useDispatch();
    const { stateCustomer, stateRefreshCus } = useSelector((state) => state.customer); //deklarasi state yang diambil dari sliceMaterials.js
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(customerFetch());
    }, [stateRefreshCus]);

    // mengeluarkan isi data dari dalam state material
    const rows =
        stateCustomer &&
        stateCustomer.map((item) => {
            return {
                id: item.customer_id,
                cusName: item.customer_name,
                cusEmail: item.email,
                cusPhone: item.phone_number,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "cusName", headerName: "Nama Customer", width: 130 },
        { field: "cusEmail", headerName: "Email Kontak", width: 170 },
        { field: "cusPhone", headerName: "Nomor Telepon", width: 130 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const cusId = params.row.id;
                return (
                    <div>
                        <button onClick={() => navigate(`edit-customer/${cusId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-customer/${cusId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Customer</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("create-customer")}>
                Create
            </button>
            <DataGrid
                rows={validRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}