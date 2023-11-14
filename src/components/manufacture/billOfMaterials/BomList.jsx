import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bomFetch } from "../../../slices/sliceBom";

export default function BomList() {
    const dispatch = useDispatch();
    const { stateBom, stateRefreshBom } = useSelector((state) => state.bom); //deklarasi state yang diambil dari sliceMaterials.js
    const navigate = useNavigate();
    console.log(stateBom);
    useEffect(() => {
        dispatch(bomFetch());
    }, [stateRefreshBom]);

    // mengeluarkan isi data dari dalam state BoM
    const rows =
        stateBom &&
        stateBom.map((item) => {

            return {
                id: item.material_products_id,
                bomNameProd: item.product_name,
                bomNameMat: item.material_name,
                bomSatuan: item.satuan,
                bomJumlah: item.jumlah,
                bomTotal: item.jumlah * item.price,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 130 },
        { field: "bomNameProd", headerName: "Nama Produk", width: 130 },
        { field: "bomNameMat", headerName: "Nama Bahan Baku", width: 170 },
        { field: "bomSatuan", headerName: "Satuan Bahan Baku", width: 170 },
        { field: "bomJumlah", headerName: "Jumlah", width: 100 },
        { field: "bomTotal", headerName: "Total", width: 100 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const bomId = params.row.id;
                return (
                    <div>
                        <button onClick={() => navigate(`edit-bom/${bomId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-bom/${bomId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Bill of Materials</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("create-bom")}>
                Create
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-dark font-bold py-2 px-4 rounded my-[10px] ml-[10px]" onClick={() => navigate("/bom/summaryBom")}>
                Summary
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