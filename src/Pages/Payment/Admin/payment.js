import React, { useState, useEffect } from "react";
import "./Payment.css";
import NavbarAdmin from "../../../Components/NavbarAdmin/NavbarAdmin";
import NavbarResponsable from "../../../Components/NavbarResponsable/NavbarResponsable";

const Payment = () => {
  const [enfants, setEnfants] = useState([]);

  useEffect(() => {
    const fetchEnfantsList = async () => {
      let url = "http://localhost:3001/api/user/enfants";
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setEnfants(data);
      } catch (error) {
        console.error("Error fetching enfants:", error);
      }
    };
    fetchEnfantsList();
  }, [enfants]);

  const handleEdit = async (id, subscription) => {
    if (window.confirm("Are you sure you want to change subscription for this child?")) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/user/enfants/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ subscription: !subscription }),
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        setEnfants([]);
      } catch (error) {
        console.error("Error updating enfant:", error);
      }
    }
  };

  return (
    <>
      {localStorage.getItem("admin") ? <NavbarAdmin /> : <NavbarResponsable />}
      <div className="payment">
        <h1>Paiement</h1>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Enfant</th>
              <th scope="col">Parent</th>
              <th scope="col">Payer</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {enfants &&
              enfants.length > 0 &&
              enfants.map((enfant) => (
                <tr key={enfant._id}>
                  <th scope="row">{enfant.username}</th>
                  <td>{enfant.parent.username}</td>
                  <td>{enfant.subscription ? "Oui" : "Non"}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleEdit(enfant._id, enfant.subscription)
                      }
                    >
                      Paiement
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
    </>
  );
};

export default Payment;