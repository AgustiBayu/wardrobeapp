import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { productsFetch } from "../../slices/sliceProducts";

export default function ProductsList() {
    const dispatch = useDispatch();
    const { stateProducts } = useSelector((state) => state.products); //deklarasi state yang diambil dari sliceProducts.js
    const navigate = useNavigate();

    // mengeluarkan isi data dari dalam state produk
    const rows =
        stateProducts &&
        stateProducts.map((item) => {
            const id = item.product_id;
            const pName = item.product_name;
            const pCat = item.category_id;
            const pPrice = item.price;
            const pDesc = item.description;
            const pCreated = item.created_at;
            
            // const currentTimeZone = new Date(item.created_at);
            // const indoTimeZone = new Date(item.created_at).toISOString().split('T')[0];
            return {
                id,
                pName,
                pCat,
                pPrice,
                pDesc,
                pCreated,
            };
        });

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 130 },
        { field: "pName", headerName: "Name", width: 130 },
        { field: "pCat", headerName: "Category", width: 130 },
        { field: "pPrice", headerName: "Price", width: 130 },
        { field: "pDesc", headerName: "Description", width: 200 },
        { field: "pCreated", headerName: "Created At", width: 130 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const pId = params.row.id;
                return (
                    <div>
                        <button onClick={() => navigate(`edit-product/${pId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-product/${pId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Products</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("create-product")}>
                Create
            </button>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}