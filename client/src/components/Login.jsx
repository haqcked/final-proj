import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Validation from '../validations/LoginValidation';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (validationErrors.email === '' && validationErrors.password === '') {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data === 'Success') {
          dispatch({ type: 'LOGIN', payload: values });

          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: 'Invalid email or password',
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-start mt-5 vh-100">
        <div className="col-md-4 border rounded-4 p-4 my-5 shadow p-3 mb-5 bg-body rounded">
          <h2 className="text-center p-4">Login</h2>
          <hr className="mb-4" />
          <Form className="d-grid gap-2" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-start">Email Address</Form.Label>
              <Form.Control
                className="rounded-4"
                onChange={handleInput}
                type="email"
                placeholder="email@gmail.com"
                name="email"
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-start">Password</Form.Label>
              <Form.Control
                className="rounded-4"
                onChange={handleInput}
                type="password"
                placeholder="password"
                name="password"
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </Form.Group>

            <Button className="rounded-4" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <h6 className="text-center mt-3">
            Don't have an account?
            <span>
              <a href="/sign-up" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }}>
                {' '}
                Register here.
              </a>
            </span>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Login;
