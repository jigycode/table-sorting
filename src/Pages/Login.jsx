import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function LoginForm() {
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      console.log("Retrieved User Data:", JSON.parse(storedUserData));
    }
    // localStorage.setItem("userData", JSON.stringify(values));
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const email = values.email;
            const password = values.password;
            const MyEmail = "jigyasha@gmail.com";
            const MyPassword = "password123";
            if (email === MyEmail && password === MyPassword) {
              localStorage.setItem("userData", JSON.stringify(values));
              toast.success("Login Successful!");
              console.log("Form Data Stored:", values);
            } else {
              toast.error("Invalid email or password");
            }
            setSubmitting(false);
            // console.log("Form Data:", values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
