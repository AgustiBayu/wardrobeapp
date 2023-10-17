import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { materialsFetch } from "../../slices/sliceMaterials";

export default function MaterialsList() {

    const dispatch = useDispatch();
    const { stateMaterials } = useSelector((state) => state.materials); //deklarasi state yang diambil dari sliceMaterials.js
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(materialsFetch());
    }, [dispatch]);

    // mengeluarkan isi data dari dalam state material
    const rows =
        stateMaterials &&
        stateMaterials.map((item) => {
            return {
                id: item.materials_id,
                mName: item.material_name,
                mSupName: item.supplier_name,
                mPrice: item.price,
                mQty: item.quantity_in_stock,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]
    const validRows = rows.filter((row) => row.id !== undefined && row.id !== null);

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 130 },
        { field: "mName", headerName: "Bahan Baku", width: 130 },
        { field: "mSupName", headerName: "Supplier", width: 130 },
        { field: "mPrice", headerName: "Harga", width: 130 },
        { field: "mQty", headerName: "Stok", width: 130 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const mId = params.row.id;
                return (
                    <div>
                        <button onClick={() => navigate(`edit-material/${mId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-material/${mId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Materials</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("create-material")}>
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