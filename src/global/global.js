import { Alert } from "react-native";

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const showDefaultErrorAlert = (message) => {
    if (message) {
        Alert.alert(message);

    } else {
        Alert.alert("Something Went Wrong, Pls try again");
    }
};


export {
    validateEmail,
    showDefaultErrorAlert
};