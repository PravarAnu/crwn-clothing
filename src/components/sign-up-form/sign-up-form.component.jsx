import { useState } from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

function SignUpForm() {
    const [formFields, setFormFields] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { displayName, email, password, confirmPassword } = formFields;

    function updateField(e) {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value,
        });
    }

    function resetForm() {
        setFormFields({
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password and Confirm Password Doesn't matched");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );


            await createUserDocumentFromAuth(user, { displayName });

            resetForm();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account ? </h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    inputOptions={{
                        name: "displayName",
                        value: displayName,
                        type: "text",
                        onChange: updateField,
                        required: true,
                    }}
                />

                <FormInput
                    label="Email"
                    inputOptions={{
                        name: "email",
                        value: email,
                        type: "email",
                        onChange: updateField,
                        required: true,
                    }}
                />

                <FormInput
                    label="Password"
                    inputOptions={{
                        name: "password",
                        value: password,
                        type: "password",
                        onChange: updateField,
                        required: true,
                    }}
                />

                <FormInput
                    label="Confirm Password"
                    inputOptions={{
                        name: "confirmPassword",
                        value: confirmPassword,
                        type: "password",
                        onChange: updateField,
                        required: true,
                    }}
                />

                <Button type="submit">SIGN UP</Button>
            </form>
        </div>
    );
}

export default SignUpForm;
