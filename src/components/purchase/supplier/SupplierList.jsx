import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supplierFetch } from "../../../slices/sliceSupplier";

export default function SupplierList() {
    const dispatch = useDispatch();
    const { stateSupplier, stateRefreshSup } = useSelector((state) => state.supplier); //deklarasi state yang diambil dari sliceMaterials.js
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(supplierFetch());
    }, [stateRefreshSup]);

    // mengeluarkan isi data dari dalam state material
    const rows =
        stateSupplier &&
        stateSupplier.map((item) => {
            return {
                id: item.supplier_id,
                supName: item.supplier_name,
                supContactName: item.contact_name,
                supEmail: item.email,
                supPhone: item.phone_number,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "supName", headerName: "Supplier", width: 130 },
        { field: "supContactName", headerName: "Nama Kontak", width: 130 },
        { field: "supEmail", headerName: "Email Kontak", width: 170 },
        { field: "supPhone", headerName: "Nomor Telepon", width: 130 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const supId = params.row.id;
                return (
                    <div>
                        <button onClick={() => navigate(`edit-supplier/${supId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-supplier/${supId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Supplier</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("create-supplier")}>
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