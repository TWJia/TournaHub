import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarTO from "./NavbarTO";

function ViewApplicants() {

  return (
    <>
      <NavbarTO />
      <div className="d-flex justify-content-center align-items-center">

Applicants :


      </div>
    </>
  );
}

export default ViewApplicants;