import React, { useEffect, useState } from "react";
import Section from "../Utils/Section";
import Form from "../UI/Form";
import Input from "../UI/Input";
import Button from "../Utils/Button";
import useFirebaseError from "../../hooks/useFirebaseError";
import { auth } from "../../firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAsync from "../../hooks/useAsync";
import Message from "../UI/Message";
const ChangeUserPassword = () => {
  const [user, setUser] = useLocalStorage("user");
  const { dispatch, message, isLoading } = useAsync();
  const { handleFirebaseErr, error } = useFirebaseError();
  const [isDisabled, setIsDisabled] = useState(true);

  const [userData, setUserData] = useState({
    curPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    token: "",
  });
  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const changePassword = async (e) => {
    try {
      e.preventDefault();
      dispatch({
        type: "SEND",
      });
      const curUser = auth.currentUser;
      const cred = EmailAuthProvider.credential(
        curUser.email,
        userData.curPassword
      );
      const { user } = await reauthenticateWithCredential(curUser, cred);
      setUser({
        name: user.displayName,
        email: user.email,
        token: user.accessToken,
        expiresIn: auth.currentUser.stsTokenManager.expirationTime,
      });
      await updatePassword(curUser, userData.newPassword);
      dispatch({
        type: "RESPONSE",
        message: "Password updated successfully!",
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
      });
      handleFirebaseErr(err);
    }
  };
  const validatePasswords = (curPassword, newPassword, confirmNewPassword) => {
    const validations = {
      curPassword: curPassword.length >= 6,
      newPassword: newPassword.length >= 6,
      confirmNewPassword: confirmNewPassword.length >= 6,
      passwordMatch: newPassword === confirmNewPassword,
    };
    const isFormValid = Object.values(validations).every((valid) => valid);
    setIsDisabled(!isFormValid);
  };
  useEffect(() => {
    validatePasswords(
      userData.curPassword,
      userData.newPassword,
      userData.confirmNewPassword
    );
  }, [userData.curPassword, userData.newPassword, userData.confirmNewPassword]);
  return (
    <Section isBorder>
      {error ? <Message message={error} status="fail" key={error} /> : null}
      {message ? <Message message={message} key={message} /> : null}
      <Form
        isCol
        isFlex={false}
        onSubmit={changePassword}
        valMsg={
          userData.confirmNewPassword !== userData.newPassword
            ? "Passwords does not match!"
            : ""
        }
      >
        <Input
          type="password"
          label="Old password"
          name="curPassword"
          placeholder="********"
          onChange={handleUserData}
        />
        <Input
          type="password"
          label="New Password"
          placeholder="********"
          onChange={handleUserData}
          name="newPassword"
        />
        <Input
          type="password"
          label="Confirm New Password"
          placeholder="********"
          onChange={handleUserData}
          name="confirmNewPassword"
        />
        <Button text="Update" isLoading={isLoading} disabled={isDisabled} />
      </Form>
    </Section>
  );
};

export default ChangeUserPassword;
