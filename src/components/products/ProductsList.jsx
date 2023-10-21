import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productsFetch } from "../../slices/sliceProducts";

export default function ProductsList() {
    const dispatch = useDispatch();

    // dispatch(productsFetch());

    const { stateProducts, stateRefreshProd } = useSelector((state) => state.products); //deklarasi state yang diambil dari sliceProducts.js
    // const { stateRefreshProd } = useSelector((state) => state.products); //deklarasi state yang diambil dari sliceProducts.js
    const navigate = useNavigate();
    // const route = useIs

    useEffect(()=>{
        dispatch(productsFetch());
    }, [stateRefreshProd]);
    
    // mengeluarkan isi data dari dalam state produk
    const rows =
        stateProducts &&
        stateProducts.map((item) => {
            return {
                id: item.product_id,
                pName: item.product_name,
                pCat: item.category_name,
                pPrice: item.price,
                pDesc: item.description,
                pCreated: item.created_at,
                pPic: item.image ? require(`../../../../API_Wardrobe/uploads/${item.image}`) : null,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]
    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "pPic", headerName: "Gambar", width: 150, renderCell: (img) => <img className="w-[70px]" src={img.value} /> },
        { field: "pName", headerName: "Nama", width: 130 },
        { field: "pCat", headerName: "Kategori", width: 130 },
        { field: "pPrice", headerName: "Harga", width: 130 },
        { field: "pDesc", headerName: "Deskripsi", width: 150 },
        { field: "pCreated", headerName: "Tanggal Dibuat", width: 130 },
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