import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { summaryBomFetch } from "../../../slices/sliceBom";

export default function SummaryBom() {
    const dispatch = useDispatch();
    const { stateSummaryBom, stateRefreshBom } = useSelector((state) => state.bom); //deklarasi state yang diambil dari sliceMaterials.js
    const navigate = useNavigate();
    console.log(stateSummaryBom);

    // useEffect(() => {
    //     dispatch(summaryBomFetch());
    // }, [stateRefreshBom]);

    // mengeluarkan isi data dari dalam state material
    const rows = stateSummaryBom && stateSummaryBom.map((item) => ({
        id: item.material_products_id,
        bomNameProd: item.product_name,
        bomNameMat: item.material_name,
        bomPriceProd: item.cost_product,
        bomQty: item.quantity_in_stock,
        bomPriceMat: item.cost_material,
        bomTotal: item.total_const_bom,
      }));
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "bomNameProd", headerName: "Nama Produk", width: 130 },
        { field: "bomNameMat", headerName: "Nama Bahan Baku", width: 130 },
        { field: "bomPriceProd", headerName: "Harga Product", width: 130 },
        { field: "bomQty", headerName: "stock", width: 130 },
        { field: "bomPriceMat", headerName: "Harga Bahan Baku", width: 150 },
        { field: "bomTotal", headerName: "Total", width: 80 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => {
                const bomId = params.row.id;
                return (
                    <div>
                        <button onClick="" className="bg-yellow-500 hover:bg-yellow-600 text-dark font-bold py-2 px-4 rounded mr-[15px]">
                            Order Produk
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Bill of Materials</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("/bom")}>
                Back
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