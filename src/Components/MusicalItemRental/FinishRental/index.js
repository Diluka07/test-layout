import React, { useState, useEffect } from "react";
import {
  getProductAsync,
  getProductDataReset,
} from "../../../Redux/slices/product";
import { setAlertData, alertDataReset } from "../../../Redux/slices/alert";
import { useDispatch, useSelector } from "react-redux";
import { QrReader } from "react-qr-reader";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { NumericFormat } from "react-number-format";

const NewItemRental = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("No result");

  useEffect(() => {
    if (productId) {
      dispatch(getProductAsync(productId));
    }
  }, [dispatch, productId]);
  const [productsToRent, setProductsToRent] = useState([]);

  const [pageSize, setPageSize] = useState(5);
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  const data = [
    {
      id: 1,
      invoiceNumber: "Bass Giutar ",
      customer: "1",
      date: "5000.00",
      amount: 5000.0,
    },
    {
      id: 2,
      invoiceNumber: "Drum DM009",
      customer: "1",
      date: "7500.00",
      amount: 7500.0,
    },
    {
      id: 3,
      invoiceNumber: "Sony Mic I89",
      customer: "4",
      date: "2000.00",
      amount: 8000.0,
    },
  ];

  const columns = [
    {
      field: "invoiceNumber",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Rental Cost Per Day (One Item)",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Total Cost for Item(s)",
      flex: 1,
    },
  ];

  return (
    <div>
      <div className="row mt-3">
        <div className="col-lg-4 mb-3 ">
          <label for="exampleDataList" class="form-label">
            Select Customer <span style={{ color: "red" }}>*</span>
          </label>

          <select
            className="form-select"
            aria-label="Default select example"
            //onChange={(e) => onChange(e)}
            //value={category}
            name="category"
          >
            <option value="">--Select--</option>
            {/* {!loadingCategories &&
                    categoryError === null &&
                    categories.length > 0
                      ? categories.map((c) => (
                          <option value={c.id}>{c.name} </option>
                        ))
                      : []} */}
          </select>
        </div>
        <div className="col-lg-4 mb-3 ">
          <label for="name" className="form-label">
            Return Date <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            className="form-control"
            name="itemName"
            //value={itemName}
            required
            //onChange={(e) => onChange(e)}
          />
        </div>
        <div className="col-lg-4 mb-3 ">
          <label for="name" className="form-label">
            Total Amount
          </label>
          <input
            type="text"
            className="form-control"
            name="itemName"
            //value={itemName}
            required
            disabled
            //onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="row">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-primary me-md-2" type="submit">
                Generate Invoice
              </button>
            </div>
          </div>
      <div className="row">
        <div
          className="col-lg-3"
          style={{ width: "200px", height: "200px", border: "solid black" }}
        >
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                console.log(result);
                setProductId(result?.text);
              }
              if (!!error) {
                console.info(error);
              }
            }}
          />
        </div>
        {/* <div className="col-lg-4 mb-3 ">
          <label for="name" className="form-label">
            <b>Total Amount:</b>
          </label>
          <NumericFormat
            value={120000}
            className="form-control"
            thousandSeparator=","
            prefix=" Rs. "
            displayType="text"
            // onValueChange={(values, sourceInfo) => {
            //   setFormData({
            //     ...formData,
            //     cost: values.value,
            //   });
            //   setDisplayCost(values.formattedValue);
            // }}
            fixedDecimalScale={true}
            decimalScale={2}
            renderText={(value) => <>{value}</>}
            required
            disabled
          />
        </div> */}
      </div>

      <div className="mt-3" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          loading={false}
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
    </div>
  );
};

export default NewItemRental;
