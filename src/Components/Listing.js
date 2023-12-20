import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./../App.css";

import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBBtnGroup, MDBPaginationItem, MDBPagination, MDBPaginationLink } from 'mdb-react-ui-kit';

import { DownloadTableExcel } from 'react-export-table-to-excel';
import jsPDF from "jspdf";

import autoTable from 'jspdf-autotable'

import "jspdf-autotable";
import './../style/listing.scss';


const Listing = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLimit, setPageLimit] = useState(4);
    const [sortFilterValue, setSortFilterValue] = useState("");
    const [operation, setOperation] = useState("");
    const sortOptions = [
        { value: 'name', name: 'Name' },
        { value: 'address', name: 'Address' },
        { value: 'email', name: 'Email' },
        { value: 'phone', name: 'Phone' },
        { value: 'status', name: 'Status' }
    ];
    const doc = new jsPDF()

    const rows = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

    const tableRef = useRef(null);

    useEffect(() => {
        loadUsersData(currentPage, pageLimit, 0, operation, sortFilterValue);
    }, [pageLimit, sortFilterValue, operation, value, sortValue, currentPage]);

    const loadUsersData = async (start, end, increase, operationType, filterOrSortValue) => {
        console.log('loadUsersData');
        switch (operationType) {
            case 'search':
                // setOperation(operationType);
                setSortValue('');
                return await axios
                    .get(`http://localhost:5000/users?q=${value}&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data);
                        setCurrentPage(currentPage + increase);
                    })
                    .catch((error) => console.log(error))
            case 'sort':
                // setOperation(operationType);
                // setSortFilterValue(filterOrSortValue)
                return await axios
                    .get(`http://localhost:5000/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data);
                        setCurrentPage(currentPage + increase);
                    })
                    .catch((error) => console.log(error))
            case 'filter':
                // setOperation(operationType);
                // setSortFilterValue(filterOrSortValue)
                return await axios
                    .get(`http://localhost:5000/users?status=${filterOrSortValue}&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data);
                    })
                    .catch((error) => console.log(error))
            default:
                return await axios
                    .get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
                    .then((response) => {
                        setData(response.data);
                        setCurrentPage(currentPage + increase)
                    })
                    .catch((error) => console.log("Error", error))
        }
    }

    const handleReset = () => {
        setOperation('');
        setValue('');
        setSortFilterValue('');
        setSortValue('');
        setCurrentPage(0);
        setPageLimit(4);
        // loadUsersData(currentPage, pageLimit, 0, operation, sortFilterValue);
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        setOperation('search');
        // loadUsersData(currentPage, pageLimit, 0, operation, sortFilterValue);
    }

    const handleSort = async (event) => {
        let val = event.target.value;
        setSortValue(val);
        setOperation('sort');
        setSortFilterValue(val)
        // loadUsersData(currentPage, pageLimit, 0, operation, sortFilterValue);
    }

    const changeRows = async (event) => {
        setOperation('');
        setValue('');
        setSortFilterValue('');
        setSortValue('');
        setCurrentPage(0);
        let val = event.target.value;
        val == 0 ? setPageLimit(4) : setPageLimit(+val);
    }

    const handleFilter = async (value) => {
        setOperation('filter');
        setSortFilterValue(value)
        // loadUsersData(currentPage, pageLimit, 0, operation, sortFilterValue);
    }

    const renderPagination = () => {
        if (data.length < 4 && currentPage === 0) return null;
        if (currentPage === 0) {
            return (
                <MDBPagination className='mb-0'>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUsersData(pageLimit, pageLimit * 2, 1, operation, sortFilterValue)}>
                            Next
                        </MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
            return (
                <MDBPagination className='mb-0'>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUsersData((currentPage - 1) * pageLimit, currentPage * pageLimit, -1, operation, sortFilterValue)}>
                            Previous
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUsersData((currentPage + 1) * pageLimit, (currentPage + 2) * pageLimit, 1, operation, sortFilterValue)}>
                            Next
                        </MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        } else {
            return (
                <MDBPagination className='mb-0'>
                    <MDBPaginationItem>
                        <MDBBtn onClick={() => loadUsersData((currentPage - 1) * pageLimit, currentPage * pageLimit, -1, operation, sortFilterValue)}>
                            Previous
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }
    }

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "User Report";
        const headers = [["No.", "Name", "Email", "Phone", "Address", "Status"]];

        const data1 = data.map((elt, index) => [index + 1, elt.name, elt.email, elt.phone, elt.address, elt.status]);

        let content = {
            startY: 50,
            head: headers,
            body: data1
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("users.pdf")
    }

    const docPdf = () => {
        autoTable(doc, { html: '#my-table' })
        doc.save('table.pdf')
    }

    return (
        <MDBContainer style={{ width: "79%", maheight: "587px", position: "fixed", right: "0" }}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: 'center'
            }} className='d-flex input-group w-auto' onSubmit={handleSearch}>
                <input type="text" name="search" id="search" className='form-control' placeholder='search..'
                    value={value} onChange={(event) => setValue(event.target.value)} />
                <MDBBtn type='submit' color='dark'>Search</MDBBtn>
                <MDBBtn className='mx-2' color='info' onClick={() => handleReset()}>Reset</MDBBtn>

            </form>
            <DownloadTableExcel
                filename="userListing"
                sheet="users"
                currentTableRef={tableRef.current}
            >
                <button> Export in Excel </button>

            </DownloadTableExcel>

            <button onClick={exportPDF} className='ml-4'> Export in PDF </button>
            <button onClick={docPdf} className='ml-4'> Export in PDF 2 </button>

            <select style={{ width: "12%", borderRadius: "2px", height: "35px" }} onChange={changeRows} value={pageLimit}>
                <option key="-1" value={0}> Please select number of rows for table</option>
                {rows.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>

            <div style={{ marginTop: "10px" }}>
                <div className='main-table-container'>
                    <table ref={tableRef} style={{ borderCollapse: 'collapse', width: '100%' }} id='my-table' dark="true">
                        <tbody dark="true">
                            <tr>
                                <th scope='col' style={thStyle}>No.</th>
                                <th scope='col' style={thStyle}>Name</th>
                                <th scope='col' style={thStyle}>Email</th>
                                <th scope='col' style={thStyle}>Phone</th>
                                <th scope='col' style={thStyle}>Address</th>
                                <th scope='col' style={thStyle}>Status</th>
                            </tr>

                            {data.length === 0 ? (
                                <tr className='align-center mb-0'>
                                    <td colSpan={8} className='text-center mb-0'>There is no data to display.</td>
                                </tr>
                            ) : (
                                data.map((item, index) => (
                                    <tr key={index} style={trStyle}>
                                        <th scope='row'>{(index + 1 + currentPage * pageLimit)}</th>
                                        <td style={tdStyle}>{item.name}</td>
                                        <td style={tdStyle}>{item.email}</td>
                                        <td style={tdStyle}>{item.phone}</td>
                                        <td style={tdStyle}>{item.address}</td>
                                        <td style={tdStyle}>{item.status}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: 'center'
                }}>
                    {renderPagination()}
                </div>
            </div>
            {data.length > 0 && (
                <MDBRow>
                    <MDBCol size="8">
                        <h5>Sort by</h5>
                        <select style={{ width: "50%", borderRadius: "2px", height: "35px" }} onChange={handleSort} value={sortValue}>
                            <option> Please select the value</option>
                            {sortOptions.map((item, index) => (
                                <option key={index} value={item.value}>{item.name}</option>
                            ))}
                        </select>
                    </MDBCol>
                    <MDBCol size="4">
                        <h5>Filter by status: </h5>
                        <MDBBtnGroup>
                            <MDBBtn color='success' style={{ marginLeft: '2px' }} onClick={() => handleFilter('Active')}>Active</MDBBtn>
                            <MDBBtn color='danger' onClick={() => handleFilter('In Active')}>In Active</MDBBtn>
                        </MDBBtnGroup>
                    </MDBCol>
                </MDBRow>
            )}
        </MDBContainer>
    )
}

const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
};

const trStyle = {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
};

const tdStyle = {
    padding: '12px',
};
export default Listing