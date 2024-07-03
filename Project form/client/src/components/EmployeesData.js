import React, { useEffect, useState,useRef } from 'react'

function EmployeesData() {
        useEffect(() => {
        getCountriesList();
        getDepartmentsList();
        getGendersList();
      },[]);

    let[countriesList,setCountriesList]=useState([]) ;
    let[departmentsList,setDepartmentsList]=useState([]);
    let[gendersList,setGendersList]=useState([]);
    let[employees,setEmployees]=useState([]);

    let countrySelectRef=useRef();
    let departmentSelectRef=useRef();
    let genderSelectRef=useRef();

    let getCountriesList=async()=>{

        let reqOptions={
            method:"GET"
        };
        let JSONData=await fetch("http://localhost:1405/countriesList",reqOptions);
        let JSOData=await JSONData.json();
        setCountriesList(JSOData);
        console.log(JSOData);
    }

    let getDepartmentsList=async()=>{

        let reqOptions={
            method:"GET"
        };
        let JSONData=await fetch("http://localhost:1405/departmentsList",reqOptions);
        let JSOData=await JSONData.json();
        setDepartmentsList(JSOData);
        console.log(JSOData);
    }

    let getGendersList=async()=>{

        let reqOptions={
            method:"GET"
        };
        let JSONData=await fetch("http://localhost:1405/gendersList",reqOptions);
        let JSOData=await JSONData.json();
        setGendersList(JSOData);
        console.log(JSOData);
    }

    let getEmployeesFromServer=async()=>{
        
        let reqOptions={
            method:"GET"
        };

        let url=`http://localhost:1405/employees?country=${countrySelectRef.current.value}&department=${departmentSelectRef.current.value}&gender=${genderSelectRef.current.value}`;

        console.log(url);

        let JSONData=await fetch(url,reqOptions);
        let JSOData=await JSONData.json();
        setEmployees(JSOData);
        console.log(JSOData);
    }
  return (
    <div>
        <form >
            <div>
                <label>Country</label>
                <select ref={countrySelectRef}>
                    {countriesList.map((ele,i)=>{
                       return <option>{ele}</option>
                    })}
                </select>
            </div>
            <div>
                <label>Department</label>
                <select ref={departmentSelectRef}>
                  {departmentsList.map((ele,i)=>{
                        return <option>{ele}</option>
                    })}
                </select>
            </div>
            <div>
                <label>Gender</label>
                <select ref={genderSelectRef}>
                   {gendersList.map((ele,i)=>{
                        return <option>{ele}</option>
                    })}
                </select>
            </div>
        <button type="button" onClick={()=>{
            getEmployeesFromServer();
        }}>Get Employees</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>Sno.</th>
                    <th>Id</th>
                    <th>Profile Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>country</th>
                    <th>Department</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((ele,i)=>{
                  return(
                    <tr key={i}>
                    <td>{i+1}</td>
                    <td>{ele.id} </td>
                    <td>
                        <img src={ele.profilePic}></img>
                    </td>
                    <td>{ele.firstName} </td>
                    <td>{ele.lastName} </td>
                    <td>{ele.gender} </td>
                    <td>{ele.email} </td>
                    <td>{ele.country} </td>
                    <td>{ele.department} </td>
                    <td>{ele.age} </td>
                  </tr>
                  )
})}
            </tbody>
            <tfoot></tfoot>
        </table>
    </div>
  )
}

export default EmployeesData