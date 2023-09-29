import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { URL } from "../App";
import Swal from "sweetalert2";
import Filter from "../components/Filter";
import * as XLSX from 'xlsx'; // Import the xlsx library

function PayScreen() {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]); // Store filtered payments separately
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.get(`${URL}/api/addPayment`);
                if (response.data.length > 0) {
                    setPayments(response.data);
                    setFilteredPayments(response.data); // Initialize filtered payments with all payments
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const deletePayment = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete(
                        `${URL}/api/addPayment/${id}`
                    );
                    Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                    );
                    // Update both payments and filteredPayments
                    setPayments(payments.filter((payment) => payment._id !== id));
                    setFilteredPayments(
                        filteredPayments.filter((payment) => payment._id !== id)
                    );
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilter = () => {
        // Apply filtering based on filterType and filterStatus
        const filtered = payments.filter((payment) => {
            if (
                (filterType === "" || payment.department === filterType) &&
                (filterStatus === "" || payment.status === filterStatus)
            ) {
                return true;
            }
            return false;
        });
        setFilteredPayments(filtered); // Update the filtered payments
    };

    const clearFilter = () => {
        setFilterType("");
        setFilterStatus("");
        setFilteredPayments(payments); // Clear the filter by restoring the original payments
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter); // Toggle the state variable
    };

    // Add a function to handle real-time search
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Apply filtering if there's a search query, or reset to display all payments
        if (query !== "") {
            const filtered = payments.filter((payment) => {
                const amountString = payment.amount ? payment.amount.toString() : "";
                return (
                    (filterType === "" || payment.department === filterType) &&
                    (filterStatus === "" || payment.status === filterStatus) &&
                    (
                        (payment.payid && payment.payid.toLowerCase().includes(query)) ||
                        (payment.type && payment.type.toLowerCase().includes(query)) ||
                        (payment.department && payment.department.toLowerCase().includes(query)) ||
                        (payment.date && payment.date.toLowerCase().includes(query)) ||
                        (amountString && amountString.toLowerCase().includes(query)) ||
                        (payment.status && payment.status.toLowerCase().includes(query))
                    )
                );
            });
            setFilteredPayments(filtered);
        } else {
            // Reset to display all payments
            setFilteredPayments(payments);
        }
    };


    // Function to generate and download an Excel report
    const generateExcelReport = () => {
        // Create a worksheet from filteredPayments
        Swal.fire({
            icon: 'Success',
            title: 'Download Started...',
            text: 'Your file is being downloaded',
        })
        const ws = XLSX.utils.json_to_sheet(filteredPayments);

        // Calculate the total amount
        const totalAmount = filteredPayments.reduce((total, payment) => {
            return total + parseFloat(payment.amount);
        }, 0);

        // Add a row for the total amount
        XLSX.utils.sheet_add_json(
            ws,
            [{ "Payment-ID": "Total Amount", Amount: totalAmount }],
            {
                skipHeader: true,
                origin: -1, // Insert at the end of the worksheet
            }
        )
            ;


        // Create a workbook and add the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Payments");

        // Generate the Excel file and download it
        XLSX.writeFile(wb, "payment_report.xlsx");
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="title">
                        <h1 id="utl">Utility Payment</h1>
                        <Link className="btnColour btn btn-primary mr-1" to="/addpay">
                            ➕Add Payment
                        </Link>
                        <button
                            className="btn btn-primary ml-2"
                            onClick={generateExcelReport}
                        >
                            📝Generate Report
                        </button>
                        <input
                            id="search"
                            className="ml-2"
                            type="text"
                            placeholder="🔍 Search..."
                            value={searchQuery}
                            onChange={handleSearch}
                            style={{ width: "150px" }}
                        />
                        <button
                            className="btn btnColour btn-primary ml-2 mr-5 float-right"
                            onClick={toggleFilter}
                        >
                            📃 Filter
                        </button>
                    </div>
                    <div className=" float-right mr-5 mt-3">
                        {showFilter && (
                            <Filter
                                filterType={filterType}
                                filterStatus={filterStatus}
                                setFilterType={setFilterType}
                                setFilterStatus={setFilterStatus}
                                handleFilter={handleFilter}
                                clearFilter={clearFilter}
                            />
                        )}
                    </div>
                    <hr />
                    <br />
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <table border={0} className="table mt-5">
                                <thead style={{ backgroundColor: "#FCF9EF" }}>
                                    <tr>
                                        <th scope="col">Payment-ID</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Department</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Status</th>
                                        <th colSpan={3}>Options</th>
                                    </tr>
                                </thead>
                                <tbody className="tbg">
                                    {filteredPayments.map((payment, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{payment.type}</td>
                                            <td>{payment.department}</td>
                                            <td>
                                                {new Date(payment.date).toLocaleDateString()}
                                            </td>
                                            <td>{payment.amount}</td>
                                            <td>
                                                <b>{payment.status}</b>
                                            </td>
                                            <td>
                                                <Link
                                                    className="btnColour btn btn-primary"
                                                    to={`/view/${payment._id}`}
                                                >
                                                    Details📝
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn"
                                                    onClick={() => deletePayment(payment._id)}
                                                >
                                                    Delete🗑️
                                                </button>
                                            </td>
                                            <td>
                                                <Link
                                                    className="btnColour btn btn-primary"
                                                    to={`/update/${payment._id}`}
                                                >
                                                    Edit🖋️
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default PayScreen;
