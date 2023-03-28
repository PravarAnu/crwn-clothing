import { useState } from "react";
import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASS} from "../button/button.component";

import "./sign-in-form.styles.scss";

function SignInForm() {
    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formFields;

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

    const signInWithGoogle = async () => {
        // Authenticating using google by firebase
        await signInWithGooglePopup();

        // For getting/setting the authenticated user in the firestore database
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetForm();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect Password");
                    break;

                case "auth/user-not-found":
                    alert("User not registered");
                    break;

                default:
                    console.log(error);
            }
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account ? </h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button type="submit">SIGN IN</Button>
                    <Button
                        buttonType={BUTTON_TYPE_CLASS.google}
                        onClick={signInWithGoogle}
                    >
                        GOOGLE SIGN IN
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
