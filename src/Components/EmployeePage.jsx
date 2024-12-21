import React, {useState, useEffect} from "react";
import axios from "axios";
export default function EmployeePage(props) {
  const [empData, setEmpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchemployee = async () => {
      try {
        const response = await axios.get(
          "https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001"
        );
        if (response.data.length === 0) {
          setError(true);
          setLoading(false);
          return;
        }
        setEmpData(response.data);
        console.log(empData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchemployee();
  }, []);
  if (loading) {
    return <h1 className="pl-4 text-2xl">Loading</h1>;
  }
  if (error) {
    return (
      <h1 className="pl-4 text-2xl text-red-500">
        Check your API or try again later.
      </h1>
    );
  }
  return (
    <div className="container mx-auto p-5">
      <h2 className="text-center text-2xl font-bold mb-6">
        Welcome to the Employee List Page
      </h2>
      <p className="text-center text-lg text-gray-600 mb-6">
        Here you can view the details of all employees working with us.
      </p>

      <ul className="flex flex-wrap gap-6 justify-center">
        {empData.map((employee) => (
          <li
            key={employee.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
            style={{width: "250px", textAlign: "center"}}
          >
            <img
              src={employee.imageUrl}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{`${employee.firstName} ${employee.lastName}`}</h3>
            <p className="text-sm text-gray-600">{employee.email}</p>
            <p className="text-sm text-gray-600">{employee.contactNumber}</p>
            <p className="text-sm text-gray-600">Age: {employee.age}</p>
            <p className="text-sm text-gray-600">DOB: {employee.dob}</p>
            <p className="text-sm text-gray-600">Salary: ${employee.salary}</p>
            <p className="text-sm text-gray-600">Address: {employee.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
