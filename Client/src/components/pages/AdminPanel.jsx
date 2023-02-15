import Navbar from '../Navbar';
import Footer from '../Footer';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { api } from '../../globals';

import '../../css/admin.css';
import { useEffect, useState } from 'react';

function AdminPanel() {
    const [data, setData] = useState([]);

    useEffect(() => {
        let arr = [['UserID', 'Profit']];

        async function foo() {
            try {
                const dataResp = await axios.get(`${api}/order/usersSum`);
                // console.log(dataResp?.data?.length);

                if (dataResp?.data?.length > 0) {
                    const resp = dataResp?.data;
                    resp.forEach(data => {
                        //set data to array
                        arr.push([data?._id, data?.value]);
                    });
                    setData(arr);
                }
            } catch (error) {
                console.log(error?.response?.data);
            }
        }

        foo();
    }, [setData]);

    const options = {
        chart: {
            title: 'User spendings',
            subtitle: 'Happy customer, happy pocket!',
        },
    };

    return (
        <>
            <Navbar />
            <div className="container main">
                <div className="d-flex justify-content-center pt-5">
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="500px"
                        data={data}
                        options={options}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AdminPanel;
