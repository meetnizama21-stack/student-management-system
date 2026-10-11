
import { useState } from "react";
import "./App.css";

function App() {
  const [student, setStudent] = useState({
    name: "",
    enrollment: "",
    email: "",
    mobile: "",
    gender: "",
    course: "",
    semester: "",
    hobbies: "",
    address: "",
  });

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (
      !student.name.trim() ||
      !student.enrollment.trim() ||
      !student.email.trim() ||
      !student.mobile.trim() ||
      !student.gender ||
      !student.course ||
      !student.semester ||
      !student.address.trim()
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(student.mobile)) {
      setMessage("Mobile number must contain exactly 10 digits.");
      return;
    }

    const duplicate = students.some(
      (s) =>
        s.enrollment.toLowerCase() ===
        student.enrollment.trim().toLowerCase()
    );

    if (duplicate) {
      setMessage("This enrollment number is already registered.");
      return;
    }

    setStudents([
      ...students,
      {
        ...student,
        name: student.name.trim(),
        enrollment: student.enrollment.trim(),
        email: student.email.trim(),
        address: student.address.trim(),
      },
    ]);

    setStudent({
      name: "",
      enrollment: "",
      email: "",
      mobile: "",
      gender: "",
      course: "",
      semester: "",
      hobbies: "",
      address: "",
    });

    setMessage("Student registered successfully!");
  }

  function removeStudent(index) {
    setStudents(students.filter((_, i) => i !== index));
  }

  function clearForm() {
    setStudent({
      name: "",
      enrollment: "",
      email: "",
      mobile: "",
      gender: "",
      course: "",
      semester: "",
      hobbies: "",
      address: "",
    });
    setMessage("");
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="logo">SR</div>
        <p className="eyebrow">STUDENT MANAGEMENT SYSTEM</p>
        <h1>Student Registration</h1>
        <p>Register your details and manage your student profile.</p>
      </header>

      <main className="container">
        <section className="card">
          <div className="section-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Enter the student details below.</p>
            </div>
            <span className="required-note">* Required fields</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Student Name *</label>
                <input
                  id="name"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  minLength={2}
                />
              </div>

              <div className="field">
                <label htmlFor="enrollment">Enrollment Number *</label>
                <input
                  id="enrollment"
                  name="enrollment"
                  value={student.enrollment}
                  onChange={handleChange}
                  placeholder="Enter enrollment number"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={student.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="mobile">Mobile Number *</label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={student.mobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={student.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="course">Course *</label>
                <select
                  id="course"
                  name="course"
                  value={student.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="BBA">BBA</option>
                  <option value="M.Tech">M.Tech</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="semester">Semester *</label>
                <select
                  id="semester"
                  name="semester"
                  value={student.semester}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      Semester {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="hobbies">Hobbies</label>
                <input
                  id="hobbies"
                  name="hobbies"
                  value={student.hobbies}
                  onChange={handleChange}
                  placeholder="Reading, music, sports"
                />
              </div>

              <div className="field full-width">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={student.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Register Student →
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={clearForm}
              >
                Clear Form
              </button>
            </div>

            {message && (
              <p
                className={
                  message === "Student registered successfully!"
                    ? "success"
                    : "error"
                }
                role="status"
              >
                {message}
              </p>
            )}
          </form>
        </section>

        <section className="card">
          <div className="section-heading">
            <div>
              <h2>Registered Students</h2>
              <p>All students registered in this session.</p>
            </div>
            <span className="count">{students.length} Students</span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Enrollment</th>
                  <th>Name / Email</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, index) => (
                  <tr key={s.enrollment}>
                    <td>{s.enrollment}</td>
                    <td>
                      <strong>{s.name}</strong>
                      <div className="subtext">{s.email}</div>
                    </td>
                    <td>{s.course}</td>
                    <td>{s.semester}</td>
                    <td>{s.gender}</td>
                    <td>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => removeStudent(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}

                {students.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty">
                      No students registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="footer-note">
            Total registered students: <strong>{students.length}</strong>
          </p>
        </section>
      </main>

      <footer>Student Registration Portal · Built with React</footer>
    </div>
  );
}

export default App;
