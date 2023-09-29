import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loader from "../components/Loader"
import Error from "../components/Error"
import Success from '../components/Success';
import { URL } from '../App';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function AddPayment() {

    const [payid, setpayid] = useState('')
    const [type, settype] = useState('')
    const [department, setdepartment] = useState('')
    const [date, setdate] = useState('')
    const [amount, setamount] = useState('')
    const [status, setstatus] = useState('')

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function addpayment() {
        const detail = {
            payid: payid,
            type: type,
            department: department,
            date: date,
            amount: amount,
            status: status
        }
        try {
            setloading(true);
            const result = await axios.post(`${URL}/api/addPayment`, detail).data
            setloading(false);
            setsuccess(true)

            setpayid('')
            settype('')
            setdepartment('')
            setdate('')
            setamount('')
            setstatus('')

        } catch (error) {

            console.log(error);
            setloading(false);
            seterror(true);
        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}

            <div className="row justify-content-center">
                <div className="col-md-5 mt-5">
                    {success && (<Success message='Payment Added Successfully' />)}
                    <div className='bs'>

                        <h2>Add Payment</h2>

                        Payment-Type:<input type="text" className='form-control'
                            value={type} onChange={(e) => { settype(e.target.value) }} />

                        Department:<select className="form-control"
                            onChange={(e) => setdepartment(e.target.value)}
                            value={department}
                        >
                            <option value="" style={{ width: "250px" }}>Department</option>
                            <option value="Finance">Finance</option>
                            <option value="Inventory">Inventory</option>
                            <option value="Employee">Employee</option>
                            <option value="Transport">Transport</option>
                        </select>

                        Date:{/*<br /><DatePicker id="datepick" selected={date} onChange={(date) => setdate(date)} />*/}<input type="date" className='form-control'
                            value={date} onChange={(e) => { setdate(e.target.value) }} />

                        <br />
                        Amount:<input type="text" className='form-control'
                            value={amount} onChange={(e) => { setamount(e.target.value) }} />

                        Status:<select className="form-control"
                            onChange={(e) => setstatus(e.target.value)}
                            value={status}
                        >
                            <option value="" style={{ width: "250px" }}>Status</option>
                            <option value="Successful">Successful</option>
                            <option value="Failed">Failed</option>
                        </select>

                        <button className='btn mt-3 btnColour text-center paybtn' onClick={addpayment}>Add Payment</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddPayment